---
title: "Chapter 20: Where to Go from Here"
description: "Next steps: other CSS approaches, accessibility testing, JavaScript resources, and communities"
layout: libdoc_page.liquid
permalink: css/where-to-go/index.html
eleventyNavigation:
    key: "Chapter 20: Where to Go from Here"
    parent: CSS
    order: 12
---

Congratulations. You now have a solid foundation in modern HTML and CSS. You can build a real website, and you understand *why* it works, not just *how*. That puts you ahead of many people who've been writing CSS for years without engaging with these underlying principles.

But this guide is a starting point, not an ending point. Here's where to explore next.

## Other approaches to CSS

This guide taught you one coherent way to write CSS: CUBE methodology, fluid design, intrinsic layouts. It's an approach rooted in working *with* the language and the browser. I believe it's a great way to think about CSS, especially for someone building their own site.

But it's not the only way, and it would be dishonest to pretend otherwise.

**Tailwind CSS** is the most popular utility-first CSS framework. Instead of writing custom CSS, you compose styles entirely from utility classes in your HTML:

```html
<div class="flex flex-wrap gap-4 p-6 rounded-lg shadow-md bg-white">
  <h2 class="text-xl font-bold text-slate-900">Harbor Study</h2>
  <p class="text-slate-600">Oil on panel, 30 × 40 cm</p>
</div>
```

This looks very different from what we've been writing, but the underlying ideas aren't as far apart as they might seem. CUBE CSS has a utility layer. Tailwind *is* a utility layer, taken to its logical extreme. Tailwind is excellent for teams, for rapid prototyping, and for projects with component-based frameworks like React or Vue. It also has a tremendous ecosystem and community.

**BEM (Block Element Modifier)** is a methodology for structuring CSS around components and their parts. I borrowed its naming convention in [Chapter 18](/css/cube-css/) (`.card__image`, `.card__content`), but BEM as a full methodology goes further. BEM organises your entire CSS around blocks, their child elements, and modifier variants (`.card--featured`). It's verbose but predictable, and you'll encounter it often in existing codebases.

**CSS Modules** and **CSS-in-JS** approaches (like styled-components or Emotion) scope styles to individual components at the JavaScript framework level. If you end up working with React, you'll encounter these.

Each of these approaches has trade-offs, and each solves real problems in specific contexts. A solo artist building a portfolio has different needs than a team of twenty engineers building a SaaS product. The CSS knowledge you've built here (the box model, the cascade, flexbox, grid, custom properties, fluid design) transfers to *all* of these approaches. The fundamentals don't change.

## Don't be dogmatic

You may encounter strong opinions in the web community. Some people are passionately against Tailwind. Some think CUBE is too loose. Some think vanilla CSS is a waste of time when frameworks exist. Some believe the opposite with equal fervor.

Here's the thing: Andy Bell, whose CUBE methodology we've been learning, lists Tailwind as a useful tool on his own site. Josh Comeau, who teaches deep CSS fundamentals, also teaches React and CSS-in-JS. The people who *make* these tools and write these methodologies are far less tribal about them than some of their followers.

Stay curious. Read widely. Try different approaches. The goal is to understand the trade-offs and choose what serves your project. What works for a personal portfolio might not work for a startup. What works for a startup might not work for a news site. That's fine.

This guide is not gospel. It's one perspective, hopefully a useful one, but one you should hold lightly and adapt to your own needs.

## Deepening your CSS knowledge

- **[Every Layout](https://every-layout.dev/)** by Andy Bell and Heydon Pickering: The composable layout primitives we used in the composition layer were inspired by this project. It goes much deeper.
- **[web.dev Learn CSS](https://web.dev/learn/css/)**: Google's comprehensive CSS course, co-authored by Andy Bell.
- **[Modern CSS Solutions](https://moderncss.dev/)** by Stephanie Eckles: In-depth tutorials on modern CSS techniques, covering layout, custom form styling, accessibility, and more. A great next step after this guide.
- **[Josh W. Comeau's blog](https://www.joshwcomeau.com/)**: Deep, interactive explorations of CSS. His articles on the CSS reset, custom properties, and layout are referenced throughout this guide, and there's much more on his site worth reading.
- **[Kevin Powell's YouTube channel](https://www.youtube.com/@KevinPowell)**: Consistent, high-quality, practical CSS tutorials. One of the best educators in the space.
- **[CSS-Tricks](https://css-tricks.com/)**: A long-running web development blog with an excellent CSS almanac and a huge archive of practical articles. A reliable place to look something up or go deep on a technique.
- **[Smashing Magazine](https://www.smashingmagazine.com/)**: Long-form articles on CSS, design, accessibility, and the web in general.
- **[MDN Web Docs](https://developer.mozilla.org/)**: The definitive reference for HTML, CSS, and JavaScript. When you need to know exactly how a property works, MDN is where you go.

## Accessibility

I've touched on accessibility throughout this guide, but there's much more to learn. More importantly, there's a gap between *knowing* you should write accessible HTML and *verifying* that you actually did. Here are some ways to check your work:

**Use a screen reader, at least once.** If you're on a Mac, VoiceOver is built in (activate it with Cmd+F5). On Windows, [NVDA](https://www.nvaccess.org/) is free. Navigate your own site with the screen reader and no monitor (or with your eyes closed). Listen for whether the heading hierarchy makes sense, whether image alt text is descriptive, and whether links and buttons announce themselves clearly. This experience will change how you write HTML.

**Run a Lighthouse audit.** In Chrome's developer tools, open the Lighthouse panel and run an accessibility audit on your page. It catches common issues like missing alt text, insufficient color contrast, and elements without accessible names. It won't find everything (automated tools catch roughly 30-50% of accessibility issues), but it's a quick sanity check you should run regularly.

**Check your color contrast.** The WebAIM Contrast Checker at [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/) lets you plug in your foreground and background colors and see whether they meet WCAG guidelines. If you're using OKLCH for your palette, the perceptual uniformity helps, but you still need to verify the actual contrast ratios. Normal text needs a ratio of at least 4.5:1. Large text (roughly 24px or larger) needs at least 3:1.

For deeper learning:

- **[The A11Y Project](https://www.a11yproject.com/)**: A community-driven resource with practical accessibility advice.
- **[Inclusive Components](https://inclusive-components.design/)** by Heydon Pickering: How to build common UI patterns accessibly.
- **[WebAIM](https://webaim.org/)**: Tools and resources for web accessibility evaluation and education.

## Learning JavaScript

HTML and CSS will take you remarkably far, but at some point you'll want interactivity that goes beyond what `<details>` and CSS transitions can provide. That's where JavaScript comes in.

Here are some excellent starting points:

- **[javascript.info](https://javascript.info/)**: A comprehensive, free, modern JavaScript tutorial. It starts from the basics and goes deep. One of the best resources online.
- **[MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)**: Mozilla's reference and guide. Thorough and reliable.
- **[freeCodeCamp](https://www.freecodecamp.org/)**: Free, project-based learning that covers JavaScript alongside HTML and CSS.
- **[The Odin Project](https://www.theodinproject.com/)**: A full-stack curriculum that builds on HTML/CSS foundations and progresses through JavaScript and beyond.
- **[Joy of Code](https://joyofcode.xyz/)**: Friendly tutorials with a focus on Svelte, a framework that's especially approachable for people who already understand HTML and CSS.

A word of advice: don't rush into JavaScript frameworks (React, Vue, Svelte, etc.) before you're comfortable with plain JavaScript. The frameworks are tools built on top of the language, and they make much more sense once you understand the foundations underneath.

## Communities

Building websites can feel solitary. Finding a community helps. A few good ones:

- **[Frontend Horse](https://frontend.horse/)**: A community and newsletter celebrating creative web development.
- **[Kevin Powell's Discord](https://www.kevinpowell.co/discord/)**: Active community focused on CSS, with forums for help and project feedback.
- **[The Practical Dev (dev.to)](https://dev.to/)**: A broad developer community with a welcoming culture.

## The most important thing

Build things. Read the source code of websites you admire (right-click, "View Page Source"). Break things. Fix them. Rebuild your portfolio three times and notice how much better it gets each time.

The web is one of the most accessible creative mediums ever invented. You don't need a gallery, a publisher, or a distributor. You write some HTML and CSS, put it on a self-hosted server or use [Neocities](https://neocities.org/) or [Nekoweb](https://nekoweb.org/), and anyone in the world can see it.

Go build.
