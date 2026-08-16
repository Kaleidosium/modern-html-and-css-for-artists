---
title: "Chapter 12: Custom Properties (CSS Variables)"
description: "Define values once and reuse them everywhere with CSS custom properties"
layout: libdoc_page.liquid
permalink: css/custom-properties/index.html
eleventyNavigation:
    key: "Chapter 12: Custom Properties (CSS Variables)"
    parent: CSS
    order: 4
---

Custom properties (often called CSS variables) are one of the most powerful features in modern CSS. They let you define values once and reuse them everywhere. For artists, they're the equivalent of defining a color palette before you start painting.

## Defining and using custom properties

Custom properties start with `--` and are accessed with `var()`. This is your first encounter with a **CSS function**: a name followed by parentheses that takes an input and produces a result. You'll see several CSS functions throughout this guide: `var()`, `clamp()`, `min()`, `oklch()`, and others. They all follow the same pattern: `function-name(inputs)`.

Here's how custom properties work:

```css
:root {
  --color-primary: #120A8F;
  --color-accent: #E97451;
  --font-body: "Georgia", serif;
}

h1 {
  color: var(--color-primary);
}

a {
  color: var(--color-accent);
}

body {
  font-family: var(--font-body);
}
```

The `:root` selector targets the top-level element of the document (effectively `<html>`). Defining custom properties here makes them available everywhere on the page.

## Fallback values

The `var()` function accepts a second argument as a fallback:

```css
.card {
  padding: var(--card-padding, 1.5rem);
}
```

If `--card-padding` isn't defined, it falls back to `1.5rem`. This is useful for creating flexible components that can be customized from the outside but have sensible defaults.

Remember the color swatch example from the HTML guide?

```html
<p>Available in <span class="color-swatch" style="--swatch: #120A8F">ultramarine</span> and <span class="color-swatch" style="--swatch: #E97451">burnt sienna</span>.</p>
```

Each `<span>` sets a `--swatch` custom property via an inline `style` attribute. The CSS can then use that value with a fallback:

```css
.color-swatch {
  background-color: var(--swatch, currentColor);
}
```

Setting a custom property in HTML and consuming it with `var()` in CSS is one of the most practical reasons to use `<span>` and inline styles. The HTML provides the data, the CSS decides what to do with it.

## Scoping

Custom properties follow the cascade and inheritance, which means you can redefine them in a smaller scope:

```css
:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
}

[data-theme="dark"] {
  --color-bg: #1a1a1a;
  --color-text: #f0f0f0;
}
```

```html
<body>
  <section>
    <p>This text is dark on light.</p>
  </section>

  <section data-theme="dark">
    <p>This text is light on dark.</p>
  </section>
</body>
```

Every element inside `[data-theme="dark"]` inherits the overridden values. The same CSS properties (`color: var(--color-text)`, `background: var(--color-bg)`) produce completely different results depending on context. This is the foundation of theming, and it's incredibly elegant.

Click a button to toggle `data-theme="dark"` on a section and watch the same CSS produce a completely different look. (Uses JavaScript for the toggle button.)

{% assign path = "/sandboxes/css/ch12-theming.html" %}
{% assign title = "Scoped theming demo" %}
{% include "sandbox" %}

## Building a token system

Custom properties really shine when you use them to build a *system* of values. Rather than picking colors and sizes ad hoc, you define a set of **design tokens**, named values (a color, a size, a font) that you reference by name instead of by their raw value:

```css
:root {
  /* Colors (using OKLCH, which I'll explain in the next chapter) */
  --color-primary: oklch(30% 0.19 268);
  --color-accent: oklch(69% 0.15 37);
  --color-light: oklch(97% 0.005 264);
  --color-dark: oklch(20% 0.02 264);

  /* Font families */
  --font-heading: "Garamond", serif;
  --font-body: "Verdana", sans-serif;

  /* A fluid type scale (we'll generate these properly in Chapter 15) */
  --step-0: 1rem;
  --step-1: 1.25rem;
  --step-2: 1.563rem;
  --step-3: 1.953rem;

  /* A spacing scale */
  --space-s: 0.75rem;
  --space-m: 1.5rem;
  --space-l: 3rem;
}
```

Once defined, these tokens become the vocabulary of your entire design. You never write a raw color value or a magic number in your component styles. Everything references a token:

```css
h1 {
  font-family: var(--font-heading);
  font-size: var(--step-3);
  color: var(--color-primary);
}

section + section {
  margin-block-start: var(--space-l);
}
```

Change custom property values with color pickers and watch the entire page update in real time. This is the "aha" moment for design tokens. (Uses JavaScript for the interactive controls.)

{% assign path = "/sandboxes/css/ch12-tokens.html" %}
{% assign title = "Live token system demo" %}
{% include "sandbox" %}

This has practical benefits (change a color in one place, it updates everywhere) but it also has a *design* benefit: it forces you to work within a system. Every value is intentional. Nothing is arbitrary. Artists who work with limited palettes or strict grid systems will find this idea familiar.

We'll flesh out these tokens properly in [Chapter 15](/css/fluid-type-space/) when I introduce fluid scales from Utopia. For now, the important thing is the pattern: define your system as custom properties, then reference those properties everywhere.
