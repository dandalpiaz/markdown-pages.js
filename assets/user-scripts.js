
// set syntax highlighting theme based on light or dark mode
function setHighlightTheme(mode) {
	var link = document.getElementById('highlight-styles');
	if (mode == "light") {
		link.href = 'https://unpkg.com/@highlightjs/cdn-assets@11.4.0/styles/a11y-light.min.css'; 
	}
	if (mode == "dark") {
		link.href = 'https://unpkg.com/@highlightjs/cdn-assets@11.4.0/styles/vs2015.min.css'; 
	}
	setTimeout(function () {
		hljs.highlightAll();		
	}, 175);
}

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
	document.querySelector('main').className = "container";

	var lightToggle = document.createElement("a");
	lightToggle.href = "#";
	lightToggle.role = "button";
	lightToggle.onclick = function() {toggleLight();return false;};
	lightToggle.id = "light-toggle";
	lightToggle.className = "contrast";
	lightToggle.innerHTML = "🌗 Light"
	document.body.prepend(lightToggle);

	var hljs = document.createElement('script');
	hljs.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/highlight.min.js';
	document.head.appendChild(hljs);

	var h1css = document.createElement('link');
	h1css.rel = 'stylesheet';
	h1css.id = 'highlight-styles';
	document.head.appendChild(h1css);

	var mode = localStorage.getItem("mode");
	if (mode == "light" || (mode == null && window.matchMedia('(prefers-color-scheme: light)').matches)) {
		localStorage.setItem("mode", "dark");
		toggleLight();
	} else {
		localStorage.setItem("mode", "light");
		toggleLight();
	}
})();
