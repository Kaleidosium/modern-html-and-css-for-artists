---
title: "Chapter 7: Links, Buttons, and Interactive Elements"
description: "Links, buttons, details/summary, and the distinction between navigation and action"
layout: libdoc_page.liquid
permalink: html/links-buttons-interactive/index.html
eleventyNavigation:
    key: "Chapter 7: Links, Buttons, and Interactive Elements"
    parent: HTML
    order: 7
---

## Links: `<a>`

Links take you somewhere. They're the connections between pages.

```html
<a href="/work">View my work</a>
<a href="https://instagram.com/janedoe">Follow on Instagram</a>
<a href="mailto:hello@janedoe.com">Get in touch</a>
```

- `href` specifies the destination: a page on your site, an external URL, or a `mailto:` link for email.

Write link text that makes sense on its own. Screen readers often present links as a list, stripped from their surrounding text.

```html
<!-- Unhelpful -->
<p>To see my work, <a href="/work">click here</a>.</p>

<!-- Clear and self-descriptive -->
<p><a href="/work">View my selected works</a></p>
```

## Buttons: `<button>`

Buttons perform actions. They don't navigate anywhere.

```html
<button>Open gallery</button>
<button>Toggle dark mode</button>
```

See a link and a button rendered side by side with no custom CSS, so you can see how the browser treats them differently by default.

{% assign path = "/sandboxes/html/ch7-link-vs-button.html" %}
{% assign title = "Link vs. button demo" %}
{% include "sandbox" %}

The distinction matters:

- **Link**: "Take me somewhere" (navigates to a URL).
- **Button**: "Do something" (triggers an action on the current page).

If you're ever tempted to style a link to look like a button or use a `<div>` with a click handler, step back and ask: does this navigate or act? Then use the right element. Use CSS classes to make a link *look* like a button if needed (we'll cover this in the CSS guide), but keep the underlying HTML honest.

**Never nest links inside buttons or buttons inside links.** This is a common mistake, and it creates confusing, broken behavior for both browsers and screen readers:

```html
<!-- Don't do this -->
<button>
  <a href="/work">View more</a>
</button>
```

If something navigates, it's a link. If it triggers an action, it's a button. It can't be both.

One thing that *is* allowed in modern HTML: links can wrap around block-level content like headings, paragraphs, and images. This is useful for making entire card-like regions clickable:

```html
<a href="/work/harbor-study">
  <figure>
    <img src="harbor-thumb.jpg" alt="Harbor Study No. 3" width="400" height="300">
    <figcaption>Harbor Study No. 3</figcaption>
  </figure>
</a>
```

## Details and summary

This pair gives you an expandable/collapsible section with no JavaScript required:

```html
<details>
  <summary>Exhibition history</summary>
  <ul>
    <li>2025 - Galleri Nord, Stockholm</li>
    <li>2024 - Open Studio, Malmö</li>
    <li>2023 - Group show, Konstakademien</li>
  </ul>
</details>
```

Click to expand and collapse sections, all built with pure HTML. This is one of the few interactive elements that needs zero JavaScript.

{% assign path = "/sandboxes/html/ch7-details-summary.html" %}
{% assign title = "Details and summary interactive demo" %}
{% include "sandbox" %}

The `<summary>` is the always-visible label. Everything else inside `<details>` is hidden until the user clicks to expand it. This is great for:

- Artist CVs and exhibition histories
- FAQ sections
- Technical details about a piece (materials, process)
- Anything where you want to keep the page clean but offer depth on demand
