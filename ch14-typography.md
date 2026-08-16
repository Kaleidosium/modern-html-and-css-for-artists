---
title: "Chapter 14: Typography"
description: "Font families, sizing with rem, line height, measure, and loading web fonts"
layout: libdoc_page.liquid
permalink: css/typography/index.html
eleventyNavigation:
    key: "Chapter 14: Typography"
    parent: CSS
    order: 6
---

Typography on the web is where your eye for detail will pay off most directly. Let's look at the core properties.

**`font-family`** sets the typeface. Always provide fallbacks:

```css
body {
  font-family: Inter, "Helvetica Neue", Arial, sans-serif;
}
```

The browser tries each font in order and uses the first one available. The generic family (`serif`, `sans-serif`, `monospace`) should always be last.

**`font-size`** sets the text size. I'll use the `rem` unit throughout:

```css
h1 {
  font-size: 2rem; /* 2 times the root font size */
}
```

`rem` stands for "root em" and is relative to the `<html>` element's font size (16px in most browsers by default, but users can change this). So at the default setting, `1rem = 16px`, `2rem = 32px`, and so on. Using `rem` means your entire type system scales if the user changes their default font size in their browser settings, which is an important accessibility consideration.

**`line-height`** controls the spacing between lines of text. Use unitless values:

```css
body {
  line-height: 1.6; /* 1.6 times the font size */
}

h1, h2, h3, h4 {
  line-height: 1.1;
}
```

Body text generally reads well between 1.5 and 1.7. Headings, which are larger, need tighter line-height to look cohesive.

The same paragraph at three different line-height values (1.2, 1.5, 1.8) side by side.

{% assign path = "/sandboxes/css/ch14-line-height.html" %}
{% assign title = "Line height comparison" %}
{% include "sandbox" %}

**measure (line length)** is the number of characters per line. Lines that are too long are hard to read. The ideal is roughly 60 to 80 characters. You can control this with `max-width` using the `ch` unit:

```css
p {
  max-width: 65ch; /* approximately 65 characters wide */
}
```

The `ch` unit is based on the width of the "0" character in the current font.

A paragraph at `max-width: 65ch` (comfortable) and another at `max-width: 120ch` (uncomfortably wide), showing why measure matters for readability.

{% assign path = "/sandboxes/css/ch14-measure.html" %}
{% assign title = "The ch unit and measure demo" %}
{% include "sandbox" %}

**`text-wrap`** is a newer property that improves how text wraps:

```css
h1, h2, h3, h4 {
  text-wrap: balance;
}

p {
  text-wrap: pretty;
}
```

`balance` tries to make each line of a heading roughly equal length, avoiding the awkward single-word last line. `pretty` makes more subtle adjustments to paragraph text, ensuring at least two words on the final line.

## Loading web fonts

Most projects use custom fonts. The simplest way to load them is with `@font-face` or a service like Google Fonts. Here's the `@font-face` approach, which gives you the most control:

```css
@font-face {
  font-family: "Playfair Display";
  src: url("/fonts/playfair-display.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}
```

`font-display: swap` tells the browser to show text in a fallback font immediately, then swap in the custom font once it's loaded. This prevents the dreaded "flash of invisible text" where visitors stare at a blank page while fonts download.

## Putting color and typography together

Here's what your typography and color system might look like as a cohesive set of custom properties:

```css
:root {
  /* Color */
  --color-ink: oklch(20% 0.02 264);
  --color-paper: oklch(97% 0.005 264);
  --color-primary: oklch(30% 0.19 268);
  --color-accent: oklch(69% 0.15 37);

  --color-bg: var(--color-paper);
  --color-text: var(--color-ink);
  --color-heading: var(--color-primary);
  --color-link: var(--color-accent);

  /* Typography */
  --font-heading: "Playfair Display", serif;
  --font-body: "Verdana", sans-serif;

  --leading-body: 1.6;
  --leading-heading: 1.1;
  --measure: 65ch;
}

body {
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: var(--leading-body);
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  color: var(--color-heading);
  line-height: var(--leading-heading);
  text-wrap: balance;
}

p {
  max-width: var(--measure);
  text-wrap: pretty;
}

a {
  color: var(--color-link);
}
```

This is a working design system in about 40 lines of CSS. Everything flows from the custom properties at the top. Change a value there, and it ripples through the entire site.
