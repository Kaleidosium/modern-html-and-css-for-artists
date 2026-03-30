---
title: "Chapter 19: Transitions and Animation"
description: "CSS transitions, transforms, keyframe animations, and respecting prefers-reduced-motion"
layout: libdoc_page.liquid
permalink: css/transitions/index.html
eleventyNavigation:
    key: "Chapter 19: Transitions and Animation"
    parent: CSS
    order: 11
---

CSS can make things move, fade, and transform. For artists, this is where the medium starts to feel truly alive. But restraint matters here as much as technique. The best web animations are the ones you barely notice: a link color that fades smoothly instead of snapping, a card that lifts gently on hover, a section that eases into view as you scroll.

## Transitions

A transition animates the change between two states of a CSS property. You define what to transition, how long it should take, and what easing to use. The browser handles everything in between.

```css
.button {
  background: var(--color-primary);
  color: var(--color-paper);
  transition: background-color 200ms ease;
}

.button:hover {
  background: var(--color-accent);
}
```

Without the `transition` property, the background would snap instantly from one color to the other on hover. With it, the color shifts smoothly over 200 milliseconds.

Hover over buttons and cards to see transitions in action. Includes a side-by-side comparison of a smooth transition vs. an instant snap, plus a card lift effect.

{% assign path = "/sandboxes/css/ch19-transitions.html" %}
{% assign title = "Transitions and animation demo" %}
{% include "sandbox" %}

The `transition` shorthand takes up to four values:

```css
transition: property duration easing delay;
```

- **property**: Which CSS property to animate (`background-color`, `transform`, `opacity`, or `all`)
- **duration**: How long the transition takes (`200ms`, `0.3s`)
- **easing**: The acceleration curve (`ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`)
- **delay**: How long to wait before starting (optional, usually omitted)

You can transition multiple properties at once:

```css
.card {
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px oklch(0% 0 0 / 0.15);
}
```

A few guidelines. Keep transitions short: 150 to 300 milliseconds for most interactions. Anything longer starts to feel sluggish. Avoid transitioning `all` unless you genuinely want every property to animate, because it can cause unexpected performance issues or visual glitches. And avoid transitioning layout properties like `width`, `height`, or `margin`, as these force the browser to recalculate the layout of the entire page on every frame. Stick to `transform` and `opacity` where possible, since the browser can animate these without triggering layout recalculations.

## Transforms

The `transform` property lets you move, scale, rotate, and skew elements without affecting the document flow. This makes it ideal for animation, because the browser doesn't need to recalculate the positions of surrounding elements.

```css
/* Move an element */
transform: translateX(10px);
transform: translateY(-2px);
transform: translate(10px, -2px);  /* both axes at once */

/* Scale an element */
transform: scale(1.05);  /* 5% larger */

/* Rotate an element */
transform: rotate(3deg);

/* Combine transforms */
transform: translateY(-2px) scale(1.02);
```

A subtle lift on hover is one of the most common and effective patterns for interactive cards:

```css
@layer block {
  .card {
    transition: transform 200ms ease, box-shadow 200ms ease;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px oklch(0% 0 0 / 0.12);
  }
}
```

## Keyframe animations

While transitions animate between two states, `@keyframes` animations let you define a sequence of steps. This is useful for effects that aren't triggered by a state change, or that involve more than a simple A-to-B transition.

```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fade-in 400ms ease both;
}
```

The `animation` shorthand:

```css
animation: name duration easing fill-mode;
```

- **name**: References the `@keyframes` block
- **duration**: How long one cycle takes
- **easing**: The acceleration curve (same options as transitions)
- **fill-mode**: What styles apply before/after the animation (`both` is usually what you want, as it keeps the final state)

You can also specify `iteration-count` (how many times to repeat, or `infinite`) and `direction` (`alternate` to yo-yo back and forth), though for most UI purposes you'll want a single play-through.

For more complex sequences, use percentage keyframes:

```css
@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
}

.loading-indicator {
  animation: pulse 1.5s ease-in-out infinite;
}
```

## Respecting user preferences

Some people experience motion sickness, discomfort, or distraction from animated content. The `prefers-reduced-motion` media query lets you honor their system-level preference:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This is one of the rare cases where `!important` is justified: it's a user-preference override that should win unconditionally. It doesn't remove animations entirely (which could break layouts that depend on animation states), but it makes them effectively instant.

An alternative approach is to write your CSS "reduced motion first" and only add animations when the user hasn't requested reduced motion:

```css
.card {
  /* No transition by default */
}

@media (prefers-reduced-motion: no-preference) {
  .card {
    transition: transform 200ms ease, box-shadow 200ms ease;
  }
}
```

Either approach works. The second is generally considered the safer default: it means animation is something you add when appropriate, rather than something you remove when asked. If you're starting a new project, the "no animation by default" approach is the more principled choice. If you're adding reduced-motion support to an existing site, the global reset in the first approach is easier to retrofit.

The important thing is that you think about this. A portfolio site with smooth hover effects is lovely. The same site making someone nauseous is not.

## Where animations live in CUBE

In the CUBE methodology, transitions on components belong in the `block` layer (they're part of the component's visual treatment). Reusable animation utilities can go in the `utility` layer. You saw this hinted at earlier in the file-splitting example:

```css
@import "animation.css" layer(utility);
```

Your `animation.css` might contain utility classes like:

```css
@layer utility {
  .fade-in {
    animation: fade-in 400ms ease both;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
```

The `prefers-reduced-motion` reset belongs in the `reset` layer, since it's a global default that should apply before anything else.
