# paskvil-design

design system of [paskvil.com](https://www.paskvil.com) - tokens, self-hosted fonts and plain CSS, no build step. [DESIGN.md](DESIGN.md) says how to use it, [index.html](index.html) shows it

## use

with npm, pinned to a release tag:

```sh
npm i "github:Paskvil/paskvil-design#semver:^1.1.0"
```

then copy `node_modules/paskvil-design/{*.css,*.js,fonts}` into the built site and link the layers you need, in this order:

```html
<link rel="stylesheet" href="/design/fonts.css">
<link rel="stylesheet" href="/design/tokens.css">
<link rel="stylesheet" href="/design/base.css">
<link rel="stylesheet" href="/design/site.css">
<link rel="stylesheet" href="/design/prism.css">
```

and for the content sites' behaviour (site map folding, copy buttons, `#` heading links), at the end of `<body>`:

```html
<script src="/design/site.js" data-copy=".prose pre"></script>
```

in Eleventy:

```js
eleventyConfig.addPassthroughCopy({
	"node_modules/paskvil-design/*.{css,js}": "design",
	"node_modules/paskvil-design/fonts/*.woff2": "design/fonts",
});
```

without npm (a plain static app), add it as a git submodule and link the files from there

## changes

- bump `version` in `package.json` and tag it `vX.Y.Z` - a changed or removed token or class is a major version
- sites pick it up with `npm update paskvil-design`
- to try changes before a release: `npm link ../paskvil-design` in the site

## license

BSD 2-Clause, see `LICENSE`. the fonts are under the SIL Open Font License, see `fonts/OFL-*.txt`
