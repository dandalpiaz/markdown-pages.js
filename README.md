
![markdown logo](assets/images/mdp.svg)

# markdown-pages.js - _simple Markdown-based static sites, without the generator_

Use **markdown-pages.js** to create simple websites using [Markdown](https://www.markdownguide.org/basic-syntax/) files for page content. No site generator necessary - no build process, installs, etc. Client-side JavaScript fetches the Markdown files and handles the conversion to HTML. Content files can be edited directly where they are hosted! Check out the **[GitHub ![GitHub Logo](assets/images/github.png) repository](https://github.com/dandalpiaz/markdown-pages)**!

## Table of Contents

- [Quick Start](#quick-start)
- [Markdown Options](#markdown-options)
- [Deployment](#deployment)
- [User Styles & Scripts](#user-styles--scripts)
- [Limitations](#limitations)

## Quick Start

To use the library, simply add the JavaScript file in the `<head>` section of your `index.html` file and create empty `<header>`, `<main>`, and `<footer>` elements.

```
<!doctype html>
<html lang="en">
<head>
  <!-- load main JS file -->
  <script src="https://cdn.jsdelivr.net/gh/dandalpiaz/markdown-pages.js@1.0.1/markdown-pages.min.js"></script>

  <!-- load optional user styles -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dandalpiaz/markdown-pages.js@1.0.1/assets/user-styles.min.css">
</head>
<body>
	<header></header>
	<main></main>
	<footer></footer>

	<!-- load optional user scripts -->
	<script src="https://cdn.jsdelivr.net/gh/dandalpiaz/markdown-pages.js@1.0.1/assets/user-scripts.min.js"></script>
</body>
</html>
```

Start from a fork of [markdown-pages.js](https://github.com/dandalpiaz/markdown-pages), or, use the CDN link like the snippet above. The library will use the `README.md` file for the homepage content. Optionally, a `header.md` and `footer.md` file can be created to populate those sections. All other pages should be stored in a `pages` directory. For example, a file at `pages/sample-page.md` can be linked to as follows:

```
Check out the [sample page](?page=sample-page)
```

**Check out the [sample page](?page=sample-page)** (link will work on the rendered site, not github.com).

_Note: if you need to use HTML elements that don't have a Markdown equivalent, you can simply add the HTML in the Markdown file. It will be ignored by the converter and kept as-is._

## Markdown Options

The library uses the [Showdown JS](https://showdownjs.com/) converter which provides some extra options for how the Markdown content will be converted. The following [Showdown options](https://showdownjs.com/docs/available-options/) are active for this library:

```
conv.setOption('tables', 'true');
conv.setOption('emoji', 'true');
conv.setOption('ghCompatibleHeaderId', 'true');
conv.setOption('simpleLineBreaks', 'true');
conv.setOption('strikethrough', 'true');
conv.setOption('tasklists', 'true');
conv.setOption('parseImgDimensions', 'true');
```

## Deployment

The library can be used anywhere that web files are hosted - a traditional server, an object storage bucket like AWS s3, etc. Part of the aim of this project was to avoid the dependency of a static site generator, but [GitHub Pages](https://docs.github.com/en/pages/quickstart) remains a convenient option to host static files. [Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/) also offers no-cost static file hosting.

## User Styles & Scripts

The example site includes styles from the [Pico CSS](https://picocss.com/) framework and some custom styles via a `user-styles.css` file. This and [other classless CSS frameworks](https://dohliam.github.io/dropin-minimal-css/) work well with Markdown content. The example site also includes a dark/light mode toggle and code syntax highlighting via a `user-scripts.js` file.

## Limitations

- **URL Structure** - since all work is done on the client side with the `index.html` file, a nested URL structure (e.g. /directory1/directory2/page) is not possible. Instead pages are referenced by a query parameter (/?page=file-name).
- **Local Development** - since the site uses XMLHttpRequest to grab content, a local web server will be needed if you want to test things locally, e.g. `python -m http.server`. However, editing hosted files directly is part of the convenience/fun. 
- **Custom layouts** - Markdown used in this way is fairly linear, so custom layouts won't be possible without adding additional HTML in the pages.
