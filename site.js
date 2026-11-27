// paskvil-design - behaviour of the content sites (goes with site.css), load at the end of <body>:
//   <script src="/design/site.js" data-copy=".prose pre"></script>
// data-copy: which code blocks get a copy button (default every `.prose pre`, paskvil.com only does
// its collapsible ones with ".prose details > pre")
(() => {
	const copySelector = document.currentScript?.dataset.copy || ".prose pre";

	// keep the site map folded on narrow screens, open where there's room for it (same 52rem as site.css)
	const map = document.querySelector(".sitemap details");
	if (map) {
		const mq = matchMedia("(min-width: 52rem)");
		const sync = () => { map.open = mq.matches; };
		sync(); mq.addEventListener("change", sync);
	}

	// copy button, top right of a code block
	document.querySelectorAll(copySelector).forEach((pre) => {
		const wrap = document.createElement("div");
		wrap.className = "code-wrap";
		pre.replaceWith(wrap);
		const btn = document.createElement("button");
		btn.type = "button";
		btn.className = "copy";
		btn.title = "click to copy to clipboard";
		btn.setAttribute("aria-label", "copy to clipboard");
		btn.addEventListener("click", async () => {
			try {
				await navigator.clipboard.writeText(pre.textContent.replace(/\n$/, ""));
				btn.classList.add("copied");
				btn.title = "copied";
				setTimeout(() => { btn.classList.remove("copied"); btn.title = "click to copy to clipboard"; }, 1500);
			} catch {
				btn.title = "copying failed - select the text instead";
			}
		});
		wrap.append(pre, btn);
	});

	// "#" after the page title and each heading with an id - click copies the link to it; the title's
	// link is the page itself, without a fragment. added here, not in the HTML, so it stays out of
	// generated tables of contents and search indexes
	document.querySelectorAll(".content h1, .prose :is(h2, h3, h4)[id]").forEach((h) => {
		const what = h.id ? "this section" : "this page";
		const a = document.createElement("a");
		a.className = "heading-link";
		a.href = h.id ? `#${h.id}` : location.pathname;
		a.textContent = "#";
		a.title = `click to copy the link to ${what}`;
		a.setAttribute("aria-label", `copy link to ${what}`);
		a.addEventListener("click", async (e) => {
			e.preventDefault();
			history.replaceState(null, "", a.href);
			try {
				await navigator.clipboard.writeText(a.href);
				a.classList.add("copied");
				setTimeout(() => a.classList.remove("copied"), 1500);
			} catch {
				a.title = "copying failed - the link is in the address bar";
			}
		});
		h.append(a);
	});
})();
