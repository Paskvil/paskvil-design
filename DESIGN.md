# paskvil design

the look of paskvil.com, its wiki and its apps - read this before building a page or app in the style. `index.html` shows every piece rendered

## character

- dark, flat and quiet: one deep blue surface, blue text, one gold accent
- no gradients, no shadows, no rounded cards. edges are crisp 1px rules in `--rule`
- monospace (Martian Mono) for structure: wordmark, headings, navigation, labels, code. grotesk (Schibsted Grotesk) for reading text
- headings are light (weight 500, never bold). hierarchy comes from the mono face, size and the rule above an `h2`
- one bold element per page at most, e.g. the dictionary entry on the paskvil.com home page. everything else stays quiet
- gold marks what you can act on or where you are: links, focus, the current page, the wordmark underline, toggles (`+` / `−`). don't use it for decoration or large areas

## tokens (`tokens.css`)

| token | value | use |
|---|---|---|
| `--prussian-deep` | `#000a12` | code blocks, inset areas |
| `--prussian` | `#00111c` | page background |
| `--prussian-raised` | `#062033` | inline code, hover rows, raised controls |
| `--rule` | `#16324a` | every border and divider, 1px (2px for a blockquote's rule) |
| `--text-dim` | `#6680bf` | meta: captions, dates, list markers, "up:" crumbs, labels |
| `--text` | `#88aaff` | body text |
| `--text-strong` | `#e0e7f5` | headings, `strong`, code, the current item |
| `--gold` | `#d6a84a` | the accent, see above. 3px underline under the wordmark |
| `--gold-soft` | gold at 45% | resting link underlines |
| `--mono`, `--sans` | font stacks | see above |
| `--measure` | `68ch` | max line length of running text |
| `--gap` | fluid 1.25-2.5rem | page gutter |
| `--icon-copy`, `--icon-check`, `--icon-console` | SVG data URLs | use as `mask`, painted with `background: var(--…)` |

use the tokens, not their values. text sizes are rem, 0.75-1.1875rem in body copy, mono UI text is usually `0.8125rem`

## layers

| file | what | needs |
|---|---|---|
| `fonts.css` + `fonts/` | `@font-face` for both families, latin + latin-ext | keep `fonts/` next to it |
| `tokens.css` | the variables above | - |
| `base.css` | plain elements: body, links, headings, lists, blockquote, code, `kbd`, tables, figures | tokens |
| `site.css` | layout and components of the content sites (frame, masthead, site map, colophon, `.prose`, code samples, copy button, heading links, ToC, `ul.index`) | tokens, base |
| `prism.css` | Prism syntax colours | tokens |

a content site takes all of them. a full screen app takes `fonts.css` + `tokens.css` and builds its own chrome in the same spirit - mono labels, 1px rules, gold for the active tool

## content site markup (`site.css`)

```html
<a class="skip" href="#content">skip to content</a>
<div class="frame">
	<header class="masthead">
		<a class="wordmark" href="/">paskvil<span>wiki</span></a>  <!-- span: optional sub-site name -->
		<nav class="external">…links…</nav>
	</header>
	<main id="content" class="content">
		<p class="up">up: <a href="..">section</a></p>
		<header class="page-head"><h1>title</h1><p class="subtitle">…</p></header>
		<nav class="toc"><p>contents</p><ul>…</ul></nav>
		<div class="prose">…markdown output…</div>
	</main>
	<aside class="sitemap"><details open><summary>site map</summary><ul>…</ul></details></aside>
	<footer class="colophon"><p>…</p></footer>
</div>
```

- below 52rem the site map folds into its `<details>` under the masthead. a small script should keep it closed there and open on wide screens
- in `.prose`, text keeps `--measure` while `pre`, `details`, `figure` and `.code-wrap` take the full column. to let another element go wide, override it: `.prose > my-demo { max-width: 50rem }`
- collapsible code: `<details><summary>label</summary><pre>…</pre></details>`
- copy button and `#` heading links are added by the page's script: wrap a `pre` in `.code-wrap` and append `button.copy` (add `.copied` for 1.5s after copying), append `a.heading-link` with `#` to headings that have an id
- `figure.pair` puts images in a row
- `ul.index` lists child pages, a `span` after the link holds the blurb

## copy voice

text in the UI and in content has the same quiet tone:

- lowercase sentence starts, also in headings, buttons and labels ("site map", "copy to clipboard"), and lowercase "i" too. proper names, book titles and code keep their case
- no full stop at the end of a heading, label, bullet or one-line sentence
- a reason goes after ` - ` (spaced hyphen, no em dash): "copying failed - select the text instead"
- terse and plain, contractions are fine
