
![markdown logo](assets/images/markdown.svg)

# markdown-pages.js - _simple Markdown-based static sites, without the generator_

_`Last Updated: 5/1/2024`_ [`edit`](https://github.com/dandalpiaz/markdown-pages/edit/main/README.md)

Use **markdown-pages.js** to create simple websites using [Markdown](https://www.markdownguide.org/basic-syntax/) files for page content. No site generator necessary - no build process, installs, etc. Client side JavaScript handles the Markdown to HTML conversion. Content files can be edited directly where they are hosted! Check out the [GitHub ![GitHub Logo](assets/images/github.png) repository](https://github.com/dandalpiaz/markdown-pages)!

## Table of Contents

- [Quick Start](#quick-start)
- [Markdown Options](#markdown-options)
- [Deployment Options](#deployment-options)
- [User Styles & Scripts](#user-styles--scripts)
- [Limitations](#limitations)
- [Todo](#todo)

## Quick Start

To use the library, simply add the JavaScript file in the `<head>` section of your `index.html` file and create blank `<header>`, `<main>`, and `<footer>` elements.

```
<!doctype html>
<html lang="en">

<head>
  ...
  ...
  <script src="markdown-pages.js"></script>
</head>

<body>
	<header></header>
	<main></main>
	<footer></footer>
</body>
</html>
```

You can start from a fork of the [markdown-pages.js repository](https://github.com/dandalpiaz/markdown-pages), or, use the CDN link for the JavaScript file like above. The library will use the `README.md` file for the homepage content. Other pages should be stored in a `pages` directory. For example, a file at `pages/sample-page.md` can be linked to as follows:

```
Check out the [sample page](?page=sample-page)
```

Check out the [sample page](?page=sample-page) (link will work on the rendered site, not github.com).

## Markdown Options

tbd - link to showdown.js and other options

Images can be included with Markdown as they normally are and image sizing configuration is available through the [parseImgDimensions](https://showdownjs.com/docs/available-options/#parseimgdimensions) option in Showdown JS:

```
![bar](bar.jpg =100x*)    sets width to 100px and height to "auto"
![foo](foo.jpg =100x80)   sets width to 100px and height to 80px
![baz](baz.jpg =80%x5em)  sets width to 80% and height to 5em
```

## Deployment Options

- **AWS s3 Bucket** - tbd
- **Traditional server** - tbd
- **GitHub Pages** - Steps 2 and 3 in this [Quickstart for GitHub Pages](https://docs.github.com/en/pages/quickstart) show how this is done in the interface. Other steps can be ignored.

## User Styles & Scripts

The example site includes styles from the [Pico CSS](tbd) framework and some custom styles via a `user-styles.css` file. This and [other classless CSS frameworks](tbd) work well with Markdown content. The example site also includes a dark/light mode toggle and code syntax highlighting via a `user-scripts.js` file. Example code highlighting:

```
def my_function():
  fruits = ['orange', 'apple', 'pear', 'kiwi', 'banana']
  for fruit in fruits:
    if fruit == 'banana':
        print(fruit)

my_function()
```

## Limitations

- **URL Structure** - since all work is done on the client side, with the `index.html` file, a nested URL structure (e.g. /directory1/directory2/page) is not possible. Instead pages are referenced by a query parameter (/?page=file-name).
- **Local Development** - since the site uses XMLHttpRequest to grab content, a local web server will be needed if you want to test things locally, e.g. `python -m http.server`. However, editing hosted files directly is part of the convenience/fun. 
- **Custom layouts** - Markdown used in this way is fairly linear, so you won't be able to do a columns and fancy layouts without extra work.

## Todo

- Add initial landmark elements through `markdown-pages.js`
- JS file to CDN?
- Add ' + JS' to logo?
- Fix up docs - see tbd sections, HTML passthrough
    - It will also look for a heading level 1 (h1) on the current page and prepend it to the site title. 
- Add a header/menu and footer section in `index.html` that can be populated from Markdown files
