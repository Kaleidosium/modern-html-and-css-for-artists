---
title: "Chapter 13: Color"
description: "HSL, OKLCH, and building perceptually uniform color palettes"
layout: libdoc_page.liquid
permalink: css/color/index.html
eleventyNavigation:
    key: "Chapter 13: Color"
    parent: CSS
    order: 5
---

This is where your artistic instincts will be most directly useful. Let's look at how CSS handles color.

CSS has many ways to express color. I'll focus on the two most useful approaches for artists.

**HSL (Hue, Saturation, Lightness)** is intuitive and widely supported:

```css
color: hsl(264 50% 40%);
```

- **Hue** is the color wheel position in degrees (0 = red, 120 = green, 240 = blue)
- **Saturation** is how vivid the color is (0% = gray, 100% = fully vivid)
- **Lightness** is how bright (0% = black, 50% = pure color, 100% = white)

**OKLCH (Lightness, Chroma, Hue)** is the modern, perceptually uniform alternative:

```css
color: oklch(30% 0.19 268);
```

- **Lightness** from 0% (black) to 100% (white)
- **Chroma** is the color intensity (0 = gray, higher = more vivid). Unlike saturation in HSL, chroma has no fixed upper bound. What limits it in practice is your display's color gamut. In sRGB, the maximum safe chroma depends on the hue and lightness:
  - **C up to ~0.1** is pastel territory, safe at any hue
  - **C around 0.15** is safe for most hues
  - **C above 0.2** starts clipping at some hues (yellows, cyans have lower ceilings around 0.17-0.18)
  - **C around 0.28-0.32** is near the sRGB edge, only reachable at certain hues like greens, blues, and purples
  - The absolute sRGB maximum is roughly **C of 0.37**, at a very specific vivid orange-red

  Lightness also matters: very dark or very light colors have much less available chroma. Peak chroma is highest around 50-65% lightness. You can see the sRGB boundary visually at each hue slice using the [OKLCH color picker](https://oklch.com).

- **Hue** is the angle on the color wheel, similar to HSL

The advantage of OKLCH over HSL is that it's **perceptually uniform**. In HSL, two colors at the same "lightness" can look dramatically different in brightness to the human eye. In OKLCH, if two colors have the same lightness value, they look much closer in perceived brightness than they would in HSL. This makes it much easier to create harmonious, consistent palettes.

As an artist, you'll appreciate this immediately. OKLCH behaves more like how you'd mix color intuitively.

Two rows of color swatches at "the same lightness" in HSL and OKLCH. The HSL row has visually uneven brightness; the OKLCH row is perceptually even.

{% assign path = "/sandboxes/css/ch13-oklch-vs-hsl.html" %}
{% assign title = "OKLCH vs HSL perceptual uniformity" %}
{% include "sandbox" %}

## Building a color palette with custom properties

```css
:root {
  /* Base palette */
  --color-ink: oklch(20% 0.02 264);
  --color-paper: oklch(97% 0.005 264);
  --color-primary: oklch(30% 0.19 268);
  --color-accent: oklch(69% 0.15 37);

  /* Functional tokens that reference the palette */
  --color-bg: var(--color-paper);
  --color-text: var(--color-ink);
  --color-heading: var(--color-primary);
  --color-link: var(--color-accent);
}
```

Notice the two layers: raw palette values, then functional tokens that map those values to roles. This means you can swap the entire color scheme by remapping the functional tokens:

```css
[data-theme="dark"] {
  --color-bg: var(--color-ink);
  --color-text: var(--color-paper);
}
```

## Transparency

Both HSL and OKLCH support alpha (transparency) as a fourth value:

```css
background: oklch(30% 0.19 268 / 0.5);  /* 50% transparent */
background: hsl(264 50% 40% / 0.5);     /* same idea in HSL */
```
