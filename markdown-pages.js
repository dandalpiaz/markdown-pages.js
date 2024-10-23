
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
        page = "_pages/" + page + ".md"
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

                // get layout fom front matter
                var layout = client.responseText.match(/layout: (.*)/);
                if (layout) {
                    layout = layout[1];
                } else {
                    layout = "default";
                }
                
                // load layout
                var client1 = new XMLHttpRequest();
                client1.open('GET', "_layouts/" + layout + ".html");
                client1.onreadystatechange = function() {
                    if (client1.readyState == 4 && client1.status == 200) {
                        if (client1.responseText) {
                            var layout = client1.responseText.replace("{{ content }}", conv.makeHtml(client.responseText.replace(/---([\s\S]*?)---/, '')));
                            output = layout;

                            // find instances of {% include file.html %} in layout
                            var includes = layout.match(/{% include (.*) %}/g);
                            if (includes) {
                                includes.forEach(function (include) {
                                    var file = "_includes/" + include.match(/{% include (.*) %}/)[1];
                                    var client2 = new XMLHttpRequest();
                                    client2.open('GET', file);
                                    client2.onreadystatechange = function() {
                                        if (client2.readyState == 4 && client2.status == 200) {
                                            if (client2.responseText) {
                                                output = output.replace(include, client2.responseText);
                                                document.body.innerHTML = output;
                                            }
                                        }
                                    }
                                    client2.send();
                                });
                            }
                        }
                    }    
                }
                client1.send();

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

};