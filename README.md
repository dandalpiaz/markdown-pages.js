
![markdown logo](assets/user/markdown.svg)

# Markdown Pages - a simple template for Markdown-based sites on GitHub Pages (or other host)

_`Last Updated: 12/1/2023`_ [`edit`](https://github.com/dandalpiaz/markdown-pages/edit/main/README.md)

Create a simple website that utilizes Markdown files for page content. No site generator necessary. Edit directly on GitHub! The pages and files in the [GitHub ![GitHub Logo](assets/user/github.png) repository](https://github.com/dandalpiaz/markdown-pages) are rendered on [this website](https://dandalpiaz.github.io/markdown-pages) via GitHub Pages. 

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
- [File Structure](#file-structure)
- [Images](#images)
- [Styles](#styles)
- [Limitations](#limitations)
- [Todo](#todo)

## About

With a focus on simple, text-based content, this template aims to simplify the creation of a Markdown-based website. There are numerous static site generators (like Jekyll and Hugo) that can use Markdown files for content; however, they require additional backend setup and configuration. In this case, much of that work is done on the frontend instead. 

This template can be used anywhere that static files can be hosted - one convenient place to do so is GitHub Pages. Other than a platform/server that hosts files, the site will require no other backend components, and the frontend uses just three libraries:

- **[Showdown JS](http://showdownjs.com/)** - for the conversion of Markdown to HTML
- **[Pico CSS](https://picocss.com/)** - to add (classless) default styles for the site
- **[Highlight JS](https://highlightjs.org/)** - to add syntax highlighting for code blocks

## Getting Started 

To set up a site, simply fork or copy the files from the [markdown-pages repository](https://github.com/dandalpiaz/markdown-pages) into your own repo, and then enable GitHub pages for your repository. Steps 2 and 3 in this [Quickstart for GitHub Pages](https://docs.github.com/en/pages/quickstart) show how this is done in the interface. Other steps can be ignored.

## File Structure

```
markdown-pages/
|---assets/
|------user/
|	   |---favicon.png
|	   |---example.png
|---pages/
|	|---sample-page.md
|	|---sample-page-2.md
|---index.html
|---README.md
```

### README.md

The `README.md` file will provide the content for the homepage of your site. Simply author the file using [Markdown syntax](https://www.markdownguide.org/basic-syntax/).

### index.html

The `index.html` file does the magic of converting Markdown to HTML. It will also look for a heading level 1 (h1) on the current page and prepend it to the site title. You can add your site title by modifying this line in the header:

```
&lt;title&gt;Markdown Pages&lt;/title&gt;
```

There are other lines in the header that you may want to edit as well, such as the meta description and the favicon image name/location.


### Pages

Additional pages can be added to the `pages` directory, using Markdown files. To add a link to an additional page, for example, `sample-page.md`, the following link structure can be used: 

```
Check out the [sample page](?page=sample-page)
```

Check out the [sample page](?page=sample-page) (link will work on the rendered site, not github.com).

### Assets

Images and other files can be added to the `assets/user` directory and linked as needed. 

## Images

Images can be included with Markdown as they normally are:

```
![markdown logo](assets/user/markdown.svg)
```

And image sizing configuration is available through the [parseImgDimensions](https://showdownjs.com/docs/available-options/#parseimgdimensions) option in Showdown JS:

```
![bar](bar.jpg =100x*)    sets width to 100px and height to "auto"
![foo](foo.jpg =100x80)   sets width to 100px and height to 80px
![baz](baz.jpg =80%x5em)  sets width to 80% and height to 5em
```

## Styles

### Dark/Light Mode

The site will include a dark/light mode toggle button by default. When adding images to a page, consider adding images that will contrast well against both a light and dark background.

### Syntax Highlighting

Syntax highlighting will automatically be applied to code blocks, for example:

```
def my_function():
  fruits = ['orange', 'apple', 'pear', 'kiwi', 'banana']
  for fruit in fruits:
    if fruit == 'banana':
        print(fruit)

my_function()
```

## Limitations

- **Local Development** - since the site uses XMLHttpRequest to grab content, a local web server will be needed if you want to test things locally, e.g. `python -m http.server`. However, editing files directly on a server/GitHub is part of the convenience/fun.
- **Limited element options** - if the element you're trying to use exists in Markdown, the converter should be able to render it as HTML, but this will exclude a lot of more advanced HTML elements.  
- **No custom layouts** - Markdown used in this way is fairly linear, so you won't be able to do a columns and fancy layouts without extra work.

## Todo

- Find/create a classless a11y CSS framework?
- Add a header/menu and footer section in `index.html` that can be populated from Markdown files?
- Escape HTML in code blocks using JS, so that this doesn't have to be done in code blocks to render correctly
- Implement more [Showdown JS options](https://github.com/showdownjs/showdown/wiki/Showdown-Options)
- Move pages out of 'pages' directory so that GitHub and hosted site can find assets using the same relative paths?
