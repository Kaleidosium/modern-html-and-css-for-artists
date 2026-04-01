---
title: "Chapter 11: The Box Model and Normal Flow"
description: "How every element is a box, and how boxes arrange themselves on the page"
layout: libdoc_page.liquid
permalink: css/box-model/index.html
eleventyNavigation:
    key: "Chapter 11: The Box Model and Normal Flow"
    parent: CSS
    order: 3
---

Every element on a web page is a box. Whether it's a heading, a paragraph, an image, or a `<div>`, the browser treats it as a rectangular box. Understanding how these boxes are sized and how they relate to each other is the foundation of CSS layout.

## The box model

Every box has four layers, from inside out: content (the actual stuff inside), padding (space between content and border), border (a line around the padding, can be invisible), and margin (space outside the border, pushing other elements away).

An interactive diagram showing the four box model layers, plus a side-by-side comparison of `content-box` vs `border-box` sizing.

{% assign path = "/sandboxes/css/ch11-box-model.html" %}
{% assign title = "Box model and border-box demo" %}
{% include "sandbox" %}

```css
.card {
  padding: 1.5rem;      /* space inside the box */
  border: 1px solid #ddd; /* the border itself */
  margin-block-end: 2rem;  /* space below the box */
}
```

By default, CSS calculates an element's width as just the content area. Padding and border get *added on top*. So if you set `width: 300px` and add `padding: 20px`, the actual box becomes 340px wide. This is confusing, and almost everyone changes it.

That's why virtually every modern reset includes this rule:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

(`*::before` and `*::after` are **pseudo-elements**, virtual elements that CSS can insert before or after an element's content. You don't need to understand them yet; they're included here so the reset covers everything.)

With `border-box`, the width you set *includes* padding and border. `width: 300px` means the box is 300px, period. Much more intuitive.

## Logical properties

Traditional CSS uses physical directions: `top`, `right`, `bottom`, `left`. But not every language reads left-to-right. Arabic reads right-to-left. Some languages are vertical. Modern CSS uses **logical properties** that adapt to the writing direction:

- `margin-block-start` / `margin-block-end` = top / bottom (in horizontal writing)
- `margin-inline-start` / `margin-inline-end` = left / right (in horizontal writing)
- `padding-block` = shorthand for block-start and block-end
- `padding-inline` = shorthand for inline-start and inline-end

```css
.wrapper {
  margin-inline: auto;   /* centers horizontally */
  padding-inline: 1rem;  /* left and right padding */
}

section {
  margin-block-end: 2rem; /* space below */
}
```

Even if your site is only in English, using logical properties is the modern convention and it makes your CSS more resilient. I'll use them throughout this guide.

## Normal flow

Before you apply any layout CSS, elements arrange themselves according to **normal flow**. This is the browser's default layout algorithm, and understanding it is essential.

There are two fundamental display types:

**Block-level elements** stack vertically. Each one starts on a new line and stretches to fill the available width. Examples: `<div>`, `<p>`, `<h1>` through `<h6>`, `<section>`, `<article>`.

```txt
┌──────────────────────────────┐
│ <header>                     │
└──────────────────────────────┘
┌──────────────────────────────┐
│ <h1>                         │
└──────────────────────────────┘
┌──────────────────────────────┐
│ <p>                          │
└──────────────────────────────┘
```

**Inline elements** sit side by side on the same line, like words in a sentence. They only take up as much width as their content needs. Examples: `<a>`, `<strong>`, `<em>`, `<span>`. (`<img>` is technically inline by default but is a *replaced element*, meaning it respects width and height properties unlike other inline elements. However, it still sits on the text baseline, which causes a small gap below the image. Most resets set images to `display: block` to eliminate this gap.)

```txt
This is a paragraph with a [link] and some [bold text] inline.
```

See block elements stacking vertically and inline elements sitting side by side, with a toggle to switch between display types. (Uses JavaScript for the interactive controls.)

{% assign path = "/sandboxes/css/ch11-block-vs-inline.html" %}
{% assign title = "Block vs. inline elements demo" %}
{% include "sandbox" %}

You can change an element's display type with CSS:

```css
/* Make a list display its items side by side */
li {
  display: inline;
}

/* Make a link behave like a block */
a {
  display: block;
}
```

## Margin collapse

There's one quirk of normal flow worth knowing: **vertical margins collapse**. If a heading has `margin-block-end: 2rem` and the following paragraph has `margin-block-start: 1rem`, the space between them won't be 3rem. It will be 2rem (the larger of the two).

This is actually helpful behavior most of the time. It prevents double-spacing between elements. But it can be confusing if you don't know it's happening.

A better approach to vertical spacing is the "flow" utility. The `* + *` selector pattern is sometimes called the "lobotomized owl" (a name coined by Heydon Pickering). The `.flow` utility builds on this idea with a scoped version and a custom property for the spacing value:

```css
.flow > * + * {
  margin-block-start: var(--flow-space, 1em);
}
```

(The `var()` here is a CSS function that reads a custom variable, we'll cover these properly in the next chapter. For now, just know that `var(--flow-space, 1em)` means "use the value of `--flow-space` if it exists, otherwise fall back to `1em`.")

This selector is dense, so let's unpack it piece by piece:

- **`.flow`** targets any element with the class `flow`.
- **`>`** means "direct children only" (not deeper descendants).
- **`*`** matches any element.
- **`+`** is the **adjacent sibling combinator**: it selects an element that immediately follows another element.
- So **`* + *`** means "any element that is immediately preceded by another element." In practice, this selects every child *except the first one*.

The result: every child of `.flow` gets top margin, except the first child (which has nothing above it). The default fallback of `1em` resolves relative to each element's own font size. Since the margin is on the *following* element (the one after the `+`), a heading that follows another element gets a larger gap because the heading's own font size is larger. Body text gets a smaller gap because its font size is smaller. No collapsing, no double-spacing, no need to cancel margin on the first or last child. If you want truly uniform gaps instead, set `--flow-space` to a fixed `rem` value like `1.5rem`.

This pairs naturally with the CSS reset I introduced in the previous chapter. The reset strips browser default margins (which vary by element and collapse unpredictably), and `.flow` adds controlled spacing back in a single direction.

A three-step progression: browser default margins (both directions, collapsing), after a CSS reset (collapsed), and reset + `.flow` (single direction, no collapsing).

{% assign path = "/sandboxes/css/ch11-flow-utility.html" %}
{% assign title = "The .flow utility demo" %}
{% include "sandbox" %}
