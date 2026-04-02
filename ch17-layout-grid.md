---
title: "Chapter 17: Layout with Grid"
description: "CSS Grid fundamentals: fluid galleries, template areas, alignment, and container queries"
layout: libdoc_page.liquid
permalink: css/layout-grid/index.html
eleventyNavigation:
    key: "Chapter 17: Layout with Grid"
    parent: CSS
    order: 9
---

CSS Grid is a two-dimensional layout system. While flexbox handles rows *or* columns, Grid handles both at once. It's the most powerful layout tool in CSS, and even learning the basics opens up a wide range of possibilities.

## A simple grid

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--space-m);
}
```

`1fr` means "one fraction of the available space." Three `1fr` columns divide the space equally into thirds. `gap` works the same way here as in flexbox.

## The fluid gallery pattern

This is the single most useful Grid pattern you'll learn, and it's perfect for portfolio sites:

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
  gap: var(--space-m);
}
```

Let's break that down:

- `repeat(auto-fit, ...)` creates as many columns as will fit
- `minmax(min(100%, 15rem), 1fr)` says each column should be at least 15rem wide (or 100% if the container is narrower than 15rem), and can grow to fill available space
- The browser figures out how many columns fit and distributes the space

The result: a grid that smoothly goes from one column on a phone to two, three, four, or more columns as the viewport widens. No breakpoints. The content and available space decide the layout.

Don't worry about memorizing this line. Copy it, adjust the `15rem` to control the minimum item width, and you have a responsive gallery. You can always look up the syntax later, what matters is understanding *what it does*.

The fluid gallery pattern with placeholder artwork cards. Resize your browser window to watch columns appear and disappear. This is the single most useful Grid pattern for portfolio sites.

{% assign path = "/sandboxes/css/ch17-gallery.html" %}
{% assign title = "Fluid gallery demo" %}
{% include "sandbox" %}

```html
<div class="gallery">
  <figure>
    <img src="piece-1.jpg" alt="Oil study of fishing boats at dawn" width="800" height="600">
    <figcaption>Harbor Study No. 1</figcaption>
  </figure>
  <figure>
    <img src="piece-2.jpg" alt="Dense garden foliage in deep blues and violets" width="800" height="600">
    <figcaption>Night Garden</figcaption>
  </figure>
  <figure>
    <img src="piece-3.jpg" alt="Soft golden light filtering through curtains" width="800" height="600">
    <figcaption>Morning Light</figcaption>
  </figure>
  <!-- as many items as you like -->
</div>
```

## Grid template areas

For page-level layout, named grid areas are wonderfully readable:

```css
.page-layout {
  display: grid;
  grid-template-areas:
    "header"
    "main"
    "footer";
}

@media (min-width: 50rem) {
  .page-layout {
    grid-template-columns: 1fr 3fr;
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
  }
}

header { grid-area: header; }
aside  { grid-area: sidebar; }
main   { grid-area: main; }
footer { grid-area: footer; }
```

This is one of the few places where a media query makes sense. You're not adjusting a *size* at a breakpoint; you're making a *structural* decision about whether the page has a sidebar or not. That's a qualitative change, not a quantitative one.

## Alignment in Grid

Grid shares many alignment properties with flexbox:

```css
.grid {
  display: grid;
  place-items: center; /* shorthand for align-items + justify-items */
}
```

`place-content` and `place-items` are handy shorthands. `place-items: center` on a grid is one of the simplest ways to center something both horizontally and vertically.

## A note on container queries

As your layouts grow more complex, you may run into a situation where a component should change based on the size of *its container*, not the viewport. Container queries solve this. Rather than explain them in full here (which would be a chapter in its own right), I'll point you to Josh Comeau's excellent introduction: [A Friendly Introduction to Container Queries](https://www.joshwcomeau.com/css/container-queries-introduction/).

## Going deeper with Grid

Grid has a lot more depth than I've covered here. For further exploration, these are some of the best resources:

- **Josh Comeau's [An Interactive Guide to CSS Grid](https://www.joshwcomeau.com/css/interactive-guide-to-css-grid/)**: A deeply visual, interactive guide that builds intuition for CSS Grid through hands-on examples and clear explanations.
- **[Grid Garden](https://cssgridgarden.com/)**: A puzzle game that teaches CSS Grid properties by having you grow a carrot garden using grid placement and layout techniques.
- **Kevin Powell's YouTube channel**: Practical, clear video tutorials on Grid and CSS layout in general. [youtube.com/@KevinPowell](https://www.youtube.com/@KevinPowell)
- **CSS-Tricks: A Complete Guide to CSS Grid**: A thorough visual reference. [css-tricks.com/snippets/css/complete-guide-grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- **Smashing Magazine**: In-depth articles on Grid and modern CSS layout. [smashingmagazine.com](https://www.smashingmagazine.com/)
- **Every Layout** by Andy Bell and Heydon Pickering: Composable layout primitives that embrace intrinsic design. [every-layout.dev](https://every-layout.dev/)
