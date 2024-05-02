
var script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js';
document.head.appendChild(script);
script.onload = function() {
    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    var page = getParameterByName('page');
    if (page) {
        page = "pages/" + page + ".md"
    } else {
        page = "README.md"; // or index.md ???
    }

    var client = new XMLHttpRequest();
    client.open('GET', page);
    client.onreadystatechange = function() {
        if (client.readyState == 4 && client.status == 200) {
            if (client.responseText) {
                var conv = new showdown.Converter();
                conv.setOption('tables', 'true');
                conv.setOption('emoji', 'true');
                conv.setOption('ghCompatibleHeaderId', 'true');
                conv.setOption('simpleLineBreaks', 'true');
                conv.setOption('strikethrough', 'true');
                conv.setOption('tasklists', 'true');
                conv.setOption('parseImgDimensions', 'true');
                document.querySelector('main').innerHTML = conv.makeHtml(client.responseText);
                var h1 = document.querySelector('h1');
                if (h1) {
                    document.title = h1.innerText + " | " + document.title;
                }
                setTimeout(function () {
                    var hash = window.location.hash;
                    if (hash && document.getElementById(hash.substring(1))) {
                        document.getElementById(hash.substring(1)).scrollIntoView();
                    }			
                }, 50);
            }
        } else if (client.status == 404) {
            window.location.href = '404.html';
        }
    }
    client.send();

    var client1 = new XMLHttpRequest();
    client1.open('GET', "header.md");
    client1.onreadystatechange = function() {
        if (client1.readyState == 4 && client1.status == 200) {
            if (client1.responseText) {
                var conv = new showdown.Converter();
                conv.setOption('tables', 'true');
                conv.setOption('emoji', 'true');
                conv.setOption('ghCompatibleHeaderId', 'true');
                conv.setOption('simpleLineBreaks', 'true');
                conv.setOption('strikethrough', 'true');
                conv.setOption('tasklists', 'true');
                conv.setOption('parseImgDimensions', 'true');
                document.querySelector('header').innerHTML = conv.makeHtml(client1.responseText);                
            }
        } 
    }
    client1.send();

    var client2 = new XMLHttpRequest();
    client2.open('GET', "footer.md");
    client2.onreadystatechange = function() {
        if (client2.readyState == 4 && client2.status == 200) {
            if (client2.responseText) {
                var conv = new showdown.Converter();
                conv.setOption('tables', 'true');
                conv.setOption('emoji', 'true');
                conv.setOption('ghCompatibleHeaderId', 'true');
                conv.setOption('simpleLineBreaks', 'true');
                conv.setOption('strikethrough', 'true');
                conv.setOption('tasklists', 'true');
                conv.setOption('parseImgDimensions', 'true');
                document.querySelector('footer').innerHTML = conv.makeHtml(client2.responseText);                
            }
        } 
    }
    client2.send();
};