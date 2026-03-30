---
title: "Chapter 16: Layout with Flexbox"
description: "Flexbox fundamentals: direction, wrapping, alignment, flex sizing, gap, and practical patterns"
layout: libdoc_page.liquid
permalink: css/layout-flexbox/index.html
eleventyNavigation:
    key: "Chapter 16: Layout with Flexbox"
    parent: CSS
    order: 8
---

Flexbox is a CSS layout system designed for distributing items along a single axis. Think of it as laying items out in a row or a column, with fine control over alignment, spacing, and wrapping.

## The basics

Apply `display: flex` to a container, and its direct children become flex items:

```css
.nav-links {
  display: flex;
  gap: var(--space-s);
}
```

```html
<nav>
  <div class="nav-links">
    <a href="/work">Work</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </div>
</nav>
```

By default, flex items line up in a row and don't wrap. If the container is too narrow, they'll squish.

An interactive playground where you can toggle `flex-direction`, `flex-wrap`, and `justify-content` and watch items rearrange in real time. Also includes the resizable sidebar layout pattern. (Uses JavaScript for the interactive controls.)

{% assign path = "/sandboxes/css/ch16-flexbox.html" %}
{% assign title = "Flexbox interactive demo" %}
{% include "sandbox" %}

## Direction

```css
/* Row (default): items flow left to right */
.row { display: flex; flex-direction: row; }

/* Column: items stack top to bottom */
.column { display: flex; flex-direction: column; }
```

## Wrapping

This is where flexbox becomes powerful for fluid design. `flex-wrap: wrap` allows items to move to a new line when they run out of space:

```css
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}
```

```html
<ul class="tag-list">
  <li>Oil painting</li>
  <li>Watercolor</li>
  <li>Digital</li>
  <li>Charcoal</li>
  <li>Mixed media</li>
</ul>
```

On a wide screen, all tags sit on one line. As the screen narrows, they naturally wrap to multiple lines. No breakpoints needed.

## Alignment

Flexbox gives you two axes of alignment:

```css
.centered {
  display: flex;
  justify-content: center;  /* align along the main axis (horizontal for rows) */
  align-items: center;      /* align along the cross axis (vertical for rows) */
}
```

Common `justify-content` values:

- `flex-start` (default): pack items to the start
- `flex-end`: pack items to the end
- `center`: center items
- `space-between`: spread items with space between them (no space at edges)
- `space-around`: spread items with space around each one

## Flex sizing

Individual flex items can control how they grow, shrink, and what their base size is. The three properties involved are:

- **`flex-basis`**: The ideal starting size of the item before any growing or shrinking happens. Think of it as a suggestion, not a guarantee.
- **`flex-grow`**: How much the item should grow relative to its siblings when there's extra space. A value of `0` means it won't grow. A value of `1` means it takes its fair share. Higher values take proportionally more.
- **`flex-shrink`**: How much the item should shrink relative to its siblings when there isn't enough space. The default is `1`, meaning all items shrink equally. Set it to `0` if an item should never compress below its basis (useful for fixed-width sidebars or icons).

Here's how these properties work together in practice:

```css
.sidebar-layout {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-l);
}

.sidebar-layout > :first-child {
  flex-basis: 15rem;   /* ideal starting width */
  flex-grow: 1;        /* can grow */
}

.sidebar-layout > :last-child {
  flex-basis: 0;
  flex-grow: 999;      /* grows much more than the sidebar */
  min-width: 60%;      /* if it can't get 60%, it wraps to its own line */
}
```

This creates a sidebar layout that automatically stacks on narrow screens without any breakpoints. When there isn't enough room for both the sidebar and the main content side by side, the main content wraps to its own line. This is an example of an **intrinsic** layout: the content itself decides when to reflow.

## The `gap` property

`gap` sets the spacing between flex items (and works in Grid too):

```css
.nav-links {
  display: flex;
  gap: var(--space-s);
}
```

It's cleaner than adding margins to individual items, and it only adds space *between* items, not at the edges.

## A practical pattern: the cluster

A "cluster" is a flex layout for groups of items that should wrap freely, like tags, social links, or navigation:

```css
.cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-s);
  align-items: center;
}
```

This single utility handles navigation bars, tag lists, icon groups, footer links, and more. Simple and endlessly reusable.

For a deeper mental model of how Flexbox works, Josh Comeau's [An Interactive Guide to Flexbox](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/) walks through every property with live, interactive examples that make the layout model click. If you prefer a more hands-on and playful approach, [Flexbox Froggy](https://flexboxfroggy.com/) teaches the same concepts through a series of small puzzles.
