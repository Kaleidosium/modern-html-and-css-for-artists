---
title: "Chapter 6: Images, Figures, and Media"
description: "How to present images, figures with captions, video, audio, and responsive images."
layout: libdoc_page.liquid
permalink: html/images-figures-media/index.html
eleventyNavigation:
    key: "Chapter 6: Images, Figures, and Media"
    parent: HTML
    order: 6
---

As an artist, this chapter is arguably the most relevant to you. How you present your visual work matters.

## Basic images

```html
<img src="harbor-study.jpg" alt="Oil study of fishing boats in a harbor at dawn" width="1200" height="800" loading="lazy" decoding="async">
```

A few things to note:

- **`src`** points to the image file.
- **`alt`** describes the image for people who can't see it (screen reader users, or when the image fails to load). For artwork, describe what the piece depicts, not just its title. **The `alt` attribute is mandatory.** Every `<img>` must have one. For decorative images, use an empty value (`alt=""`), but never omit the attribute entirely.
- **`width` and `height`** tell the browser the image's dimensions. This allows the browser to reserve the right amount of space before the image loads, preventing layout shifts. These values represent the image's intrinsic size in pixels.
- **`loading="lazy"`** tells the browser to defer loading the image until the user scrolls near it. On a portfolio page with dozens of high-resolution artworks, this makes a significant difference: the browser loads only the images that are actually visible, rather than downloading everything at once. Add it to any image that isn't visible in the initial viewport.
- **`decoding="async"`** tells the browser it can decode the image in the background without blocking the rest of the page from rendering. On image-heavy portfolio pages, this keeps the page feeling responsive while large artworks load.

### Writing good alt text for artwork

This deserves special attention. The alt text should help someone who can't see the image understand what they're missing.

```html
<!-- Too vague -->
<img src="piece-14.jpg" alt="Painting">

<!-- Just a title, not descriptive -->
<img src="piece-14.jpg" alt="Untitled No. 14">

<!-- Descriptive -->
<img src="piece-14.jpg" alt="Abstract composition with overlapping geometric shapes in deep blue and ochre, with visible brushwork and dripped paint at the lower edge">
```

If the image is purely decorative (a background pattern, a visual divider), use an empty alt: `alt=""`. This tells screen readers to skip it entirely.

## Figures and captions

When an image (or any content) is referenced from the main text and needs a caption, wrap it in a `<figure>`:

```html
<figure>
  <img src="harbor-study.jpg" alt="Oil study of fishing boats in a harbor at dawn" width="1200" height="800">
  <figcaption>
    Harbor Study No. 3 - Oil on panel, 30 × 40 cm, 2025
  </figcaption>
</figure>
```

See a `<figure>` with `<figcaption>` rendered with default browser styling. For an art audience, seeing how the browser groups your work with its caption matters.

{% assign path = "/sandboxes/html/ch6-figure.html" %}
{% assign title = "Figure and figcaption demo" %}
{% include "sandbox" %}

`<figure>` isn't only for images. It's for any self-contained content that's referenced from the main flow: diagrams, code snippets, charts, or even embedded videos.

```html
<figure>
  <video src="process-timelapse.mp4" controls width="1200" height="800">
    Your browser does not support the video element.
  </video>
  <figcaption>Timelapse of the painting process (3 min)</figcaption>
</figure>
```

## Video and audio

If you work with video or sound, HTML has native elements for both:

```html
<video src="process-timelapse.mp4" controls width="1200" height="800">
  Your browser does not support the video element.
</video>

<audio src="studio-ambience.mp3" controls>
  Your browser does not support the audio element.
</audio>
```

The `controls` attribute gives the user play/pause, volume, and a progress bar. The text inside the element is fallback content for browsers that don't support the element (rare today, but good practice). Both `<video>` and `<audio>` support multiple `<source>` elements for format fallbacks, just like `<picture>` does for images.

For longer or higher-quality video, you'll likely want to host on a service like Vimeo or YouTube and embed with an `<iframe>` rather than serving files directly. But for short process clips, timelapses, or audio sketches, native elements work well and keep everything on your own site.

## Responsive images with `<picture>`

Sometimes you want to serve different image files depending on the context. Perhaps a tightly cropped version for small screens, or a WebP version for browsers that support it.

```html
<picture>
  <source srcset="harbor-study.avif" type="image/avif">
  <source srcset="harbor-study.webp" type="image/webp">
  <img src="harbor-study.jpg" alt="Oil study of fishing boats in a harbor at dawn" width="1200" height="800">
</picture>
```

The browser picks the first `<source>` it supports and falls back to the `<img>`. This lets you serve modern, smaller formats (AVIF, WebP) while keeping a JPEG as a safe fallback.

You can also combine `<source>` with media conditions for **art direction**: showing different image crops at different screen sizes. We'll cover media conditions properly in the CSS guide, but here's what the markup looks like:

```html
<picture>
  <source media="(min-width: 800px)" srcset="harbor-wide.jpg">
  <source media="(min-width: 400px)" srcset="harbor-medium.jpg">
  <img src="harbor-square.jpg" alt="Oil study of fishing boats in a harbor at dawn" width="800" height="800">
</picture>
```

The browser checks each `<source>` in order and picks the first one whose media condition matches. The `<img>` at the end serves as the fallback.
