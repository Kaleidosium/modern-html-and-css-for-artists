---
title: "Chapter 4: Text and Content Elements"
description: "Headings, paragraphs, inline text, lists, blockquotes, and other content elements."
layout: libdoc_page.liquid
permalink: html/text-and-content/index.html
eleventyNavigation:
    key: "Chapter 4: Text and Content Elements"
    parent: HTML
    order: 4
---

These are the elements you'll use to mark up the actual content of your page.

## Headings: `<h1>` through `<h6>`

Headings create a hierarchy, like a table of contents. `<h1>` is the most important, `<h6>` the least.

```html
<h1>Jane Doe</h1>
<h2>Selected Works</h2>
<h3>Oil Paintings</h3>
<h3>Digital Works</h3>
<h2>About</h2>
<h2>Contact</h2>
```

See all six heading levels rendered with default browser styling. Try editing the text to see how the visual hierarchy works even without CSS.

{% assign path = "/sandboxes/html/ch4-headings.html" %}
{% assign title = "Headings hierarchy demo" %}
{% include "sandbox" %}

A few important rules:

- **Don't skip levels.** Go from `<h2>` to `<h3>`, not from `<h2>` to `<h4>`.
- **Use only one `<h1>` per page.** It represents the page's primary topic.
- **Choose heading level based on hierarchy, not size.** If you want a heading to look smaller, that's CSS's job. The heading level should reflect its place in the document's outline.

A good test: if you pulled out just the headings, would they read like a sensible table of contents? If so, your hierarchy is solid.

## Paragraphs: `<p>`

The workhorse of text content.

```html
<p>This series explores the tension between natural forms and digital artifacts.</p>
<p>Each piece began as a plein air sketch before being reinterpreted in Procreate.</p>
```

Each `<p>` creates a distinct block of text. Don't use `<br>` (line break) to create spacing between paragraphs. If it's a new thought, it's a new `<p>`.

## Inline text elements

Some elements are meant to be used *inside* other elements, to mark up specific words or phrases.

**`<strong>`: Strong importance**

```html
<p>The exhibition opens <strong>March 15th</strong> and runs through April.</p>
```

This tells the browser (and screen readers) that "March 15th" has strong importance. It happens to be bold by default, but the meaning is what matters.

**`<em>`: Emphasis**

```html
<p>The work is not <em>about</em> the medium, but about the process.</p>
```

Emphasis changes the meaning of a sentence, similar to how stressing a word when speaking changes its meaning. It happens to be italic by default.

**`<b>` and `<i>`: Stylistic offset without importance or emphasis**

HTML also has `<b>` (bold) and `<i>` (italic). These look the same as `<strong>` and `<em>` by default, but they carry different meaning. `<strong>` means "this is important." `<b>` means "draw attention to this text" without implying importance. `<em>` means "this word is stressed." `<i>` means "this text is set apart" from the surrounding prose, like a technical term, a phrase in another language, or a ship name:

```html
<p>The French call it <i lang="fr">plein air</i> painting.</p>
<p>The <i>HMS Endeavour</i> departed in 1768.</p>
<p>Key materials: <b>linseed oil</b>, <b>turpentine</b>, <b>damar varnish</b>.</p>
```

The distinction matters for semantics. Screen readers don't typically change their intonation for any of these elements by default, but `<em>` and `<strong>` carry semantic weight that assistive technologies *can* expose (some screen readers have optional settings to announce emphasis). More importantly, the semantic distinction helps your future self and other developers understand the *intent* of the markup. Choose based on meaning, not appearance.

**`<del>`: Deleted text**

`<del>` marks text that has been removed or is no longer accurate. Browsers render it with a strikethrough by default:

```html
<p>Price: <del>€500</del> €400</p>
```

Some screen readers (like NVDA) can be configured to announce deleted text, though support is inconsistent across assistive technologies. Still, using `<del>` is more accessible than styling a strikethrough with CSS alone, because it provides semantic information that assistive technologies *can* convey.

**`<s>`: No longer accurate**

`<s>` is similar to `<del>`, but with a different meaning. While `<del>` indicates text that has been removed from the document, `<s>` marks text that is no longer accurate or relevant but hasn't been "deleted" as such:

```html
<p><s>Available for commission work</s> Currently booked through September.</p>
```

Both render as a strikethrough by default. The distinction is semantic: `<del>` is for edits to a document, `<s>` is for content that's been superseded.

**`<u>`: Unarticulated annotation**

`<u>` renders as an underline by default. It's used for text that needs non-textual annotation, like marking proper nouns in Chinese, or flagging a misspelling:

```html
<p>The text contains a <u class="spelling-error">mispeling</u> that was flagged during review.</p>
```

Be careful with `<u>` on the web. Underlined text looks like a link, which can confuse users. If you're reaching for `<u>` purely to underline something visually, use CSS instead.

See all the inline text elements rendered side by side, so you can compare how `<strong>`, `<em>`, `<b>`, `<i>`, `<del>`, `<s>`, and `<u>` look with default browser styling.

{% assign path = "/sandboxes/html/ch4-inline-text.html" %}
{% assign title = "Inline text elements comparison" %}
{% include "sandbox" %}

**`<time>`: Dates and times**

```html
<p>The exhibition opens <time datetime="2025-03-15">March 15, 2025</time> and runs through <time datetime="2025-04-30">April 30th</time>.</p>
```

The `<time>` element marks up a date or time. The `datetime` attribute provides a machine-readable version, while the text inside is whatever human-friendly phrasing you prefer. The most common format is `YYYY-MM-DD`, but `datetime` also accepts year only (`2025`), year-month (`2025-03`), date with time (`2025-03-15T10:00`), time only (`10:00`), and durations (`PT2H30M`). This helps search engines, screen readers, and browser tools understand that "March 15, 2025" is an actual date, not just three words. You'll find it especially useful for exhibition dates, artwork years, and event listings. You can combine `<time>` with other inline elements: `<strong><time datetime="2025-03-15">March 15</time></strong>` if a date is both important and needs to be machine-readable.

## Character references

Some characters have special meaning in HTML (`<`, `>`, `&`), so you can't type them directly into your content without confusing the browser. **Character references** let you display them safely: `&lt;` for <, `&gt;` for >, and `&amp;` for &. They're also useful for symbols that may not be on your keyboard, like `&copy;` (&copy;), `&reg;` (&reg;), and `&trade;` (&trade;). You'll see `&copy;` used in footer copyright notices throughout this guide. For a full list, see the [MDN glossary entry on character references](https://developer.mozilla.org/en-US/docs/Glossary/Character_reference).

## Lists

**Unordered list (`<ul>`):** for items where the order doesn't matter.

```html
<ul>
  <li>Oil on canvas</li>
  <li>Charcoal on paper</li>
  <li>Digital (Procreate)</li>
</ul>
```

**Ordered list (`<ol>`):** for items where the order matters.

```html
<ol>
  <li>Apply the base wash</li>
  <li>Block in the major shapes</li>
  <li>Refine edges and details</li>
  <li>Final glaze</li>
</ol>
```

Every item inside a list must be an `<li>` (list item). You can also nest lists inside `<li>` elements for sub-levels.

## Description lists

Description lists are used for key-value pairs or term-definition relationships. They're perfect for artwork metadata:

```html
<dl>
  <dt>Medium</dt>
  <dd>Oil on canvas</dd>

  <dt>Dimensions</dt>
  <dd>120 × 80 cm</dd>

  <dt>Year</dt>
  <dd>2025</dd>
</dl>
```

- `<dl>` wraps the whole list.
- `<dt>` is the term (or key).
- `<dd>` is the description (or value).

All three list types rendered side by side with default browser styling. Description lists in particular are unfamiliar to most beginners, so seeing them next to the familiar `<ul>` and `<ol>` makes the differences clear.

{% assign path = "/sandboxes/html/ch4-lists.html" %}
{% assign title = "Lists comparison demo" %}
{% include "sandbox" %}

## Blockquotes and citations

For quoting text from another source:

```html
<blockquote cite="https://en.wikiquote.org/wiki/Claude_Monet">
  <p>Color is my day-long obsession, joy and torment.</p>
  <footer>&mdash; Claude Monet</footer>
</blockquote>
```

`<blockquote>` indicates an extended quotation. The `cite` attribute can provide a URL for the source. The `<footer>` inside the blockquote holds the attribution. Screen readers announce this nested pattern gracefully, understanding that this footer belongs to the quote rather than to the entire page.

See blockquotes rendered with default browser indentation and styling.

{% assign path = "/sandboxes/html/ch4-blockquote.html" %}
{% assign title = "Blockquote demo" %}
{% include "sandbox" %}

If you're attributing a quote to a specific work, use the `<cite>` element for the work's title, and optionally include a link:

```html
<blockquote cite="https://en.wikiquote.org/wiki/Salvador_Dalí">
  <p>Don't be afraid of perfection. You will never attain it!</p>
  <footer>
    &mdash; <cite>Salvador Dalí, <a href="https://archive.org/details/diaryofgenius0000dali">Diary of a Genius</a></cite>
  </footer>
</blockquote>
```
