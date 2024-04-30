
// set syntax highlighting theme based on light or dark mode
function setHighlightTheme(mode) {
	var link = document.getElementById('highlight-styles');
	if (mode == "light") {
		link.href = 'https://unpkg.com/@highlightjs/cdn-assets@11.4.0/styles/a11y-light.min.css'; 
	}
	if (mode == "dark") {
		link.href = 'https://unpkg.com/@highlightjs/cdn-assets@11.4.0/styles/monokai-sublime.min.css'; 
	}
}

// helper function to grab query string value
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// build URL for markdown file
var page = getParameterByName('page');
if (page) {
	page = "pages/" + page + ".md"
} else {
	page = "README.md";
}

// request markdown file
var client = new XMLHttpRequest();
client.open('GET', page);
client.onreadystatechange = function() {
	if (client.readyState == 4 && client.status == 200) {
		if (client.responseText) {
			var div = document.getElementById('insert');
			div.innerHTML += client.responseText;
			var conv = new showdown.Converter();
			conv.setOption('tables', 'true');
			conv.setOption('emoji', 'true');
			conv.setOption('ghCompatibleHeaderId', 'true');
			conv.setOption('simpleLineBreaks', 'true');
			conv.setOption('strikethrough', 'true');
			conv.setOption('tasklists', 'true');
			conv.setOption('parseImgDimensions', 'true');
			//conv.setOption('ghCodeBlocks', 'true');
			//conv.setOption('openLinksInNewWindow', 'true');
			
			// convert markdown to HTML
			document.getElementById('insert').innerHTML = conv.makeHtml(div.innerHTML);

			// set title as first h1 plus site title
			var h1s = document.getElementsByTagName("h1");
			for (var i = 0; i < h1s.length; i++) {
			    var h1 = h1s[i];
			    document.title = h1.innerText + " | " + document.title;
			}

			// apply syntax highlighting for code blocks
			hljs.highlightAll();

			// jump to anchor if present
			var hash = window.location.hash;
			if (hash && document.getElementById(hash.substring(1))) {
				document.getElementById(hash.substring(1)).scrollIntoView();
			}
		}
	}
}
client.send();

// toggle between light and dark mode
function toggleLight() {
	var mode = localStorage.getItem("mode");
	if (mode == "light") {
		document.documentElement.setAttribute("data-theme", "dark");
		document.getElementById('light-toggle').innerHTML = "🌗 Light";
		document.getElementById('light-toggle').style.color = "#333";
    	localStorage.setItem("mode", "dark");
		setHighlightTheme("dark");
	}
	if (mode == "dark") {
		document.documentElement.setAttribute("data-theme", "light");
		document.getElementById('light-toggle').innerHTML = "🌗 Dark";
		document.getElementById('light-toggle').style.color = "#ddd";
		localStorage.setItem("mode", "light");
		setHighlightTheme("light");
	}
}

// get current light/dark mode on page load
(function () {
	var mode = localStorage.getItem("mode");
	if (mode == "light" || (mode == null && window.matchMedia('(prefers-color-scheme: light)').matches)) {
		localStorage.setItem("mode", "dark");
		toggleLight();
	} else {
		localStorage.setItem("mode", "light");
		toggleLight();
	}
})();
