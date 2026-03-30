---
title: "Glossary"
description: A reference of HTML and CSS terms used throughout the guide
layout: libdoc_page.liquid
permalink: glossary/index.html
eleventyNavigation:
    key: Glossary
    order: 3
---

A reference of key terms used throughout this guide, organized alphabetically. Each entry notes whether it relates to <strong>HTML</strong>, <strong>CSS</strong>, or both, and which chapter introduces it.

## A

**Alpha (Transparency)** <small>CSS · Chapter 13</small>
: A fourth value in color functions (e.g., `oklch(30% 0.19 268 / 0.5)`) that controls opacity from 0 (fully transparent) to 1 (fully opaque).

**Alt Text** <small>HTML · Chapter 6</small>
: Descriptive text in the `alt` attribute of an image that describes what the image shows, for people who can't see it.

**`aria-label`** <small>HTML · Chapter 8</small>
: An accessibility attribute that provides a screen-readable name or description when visual context alone isn't enough.

**Article** <small>HTML · Chapter 5</small>
: A self-contained piece of content that could stand alone, shared, reposted, or displayed in a feed independently.

**Aside** <small>HTML · Chapter 5</small>
: Content related to the main content but that could be considered separate, like sidebars, pull quotes, or supplementary information.

**Async Decoding** <small>HTML · Chapter 6</small>
: The `decoding="async"` attribute that tells the browser to decode an image in the background without blocking page rendering.

**Attribute** <small>HTML · Chapter 3</small>
: Extra information inside an opening tag that provides details about an element, written as `name="value"` (e.g., `href="page.html"`).

**Attribute Selector** <small>CSS · Chapter 10</small>
: A CSS selector targeting elements based on their attributes (e.g., `[data-theme="dark"]`).

**`auto-fit`** <small>CSS · Chapter 17</small>
: A CSS Grid keyword that creates as many tracks as will fit in the container, used with `repeat()`.

## B

**BEM (Block Element Modifier)** <small>CSS · Chapter 18</small>
: A CSS naming convention where `__` signals elements belonging to a block and `--` signals modifiers.

**Block Layer** <small>CSS · Chapter 18</small>
: In CUBE CSS, the layer for component-specific styles (`.card`, `.button`) that stay small because global and composition styles do the heavy lifting.

**Block-level Element** <small>HTML/CSS · Chapter 5</small>
: An element that stretches to fill available width and starts on a new line (e.g., `<p>`, `<h1>`, `<div>`).

**Blockquote** <small>HTML · Chapter 4</small>
: An element for extended quotations from another source, optionally with a `cite` attribute pointing to the source.

**Body** <small>HTML · Chapter 3</small>
: The section of an HTML document containing all visible content that visitors actually see.

**Border** <small>CSS · Chapter 11</small>
: The layer of the box model that sits between padding and margin.

**Box Model** <small>CSS · Chapter 11</small>
: The concept that every HTML element is a box with four layers: content, padding, border, and margin (from inside out).

**`box-sizing: border-box`** <small>CSS · Chapter 11</small>
: A CSS property that makes width and height include padding and border, making sizing much more intuitive.

**Breakpoint** <small>CSS · Chapter 9</small>
: A viewport width at which a design changes its layout (e.g., `768px`). Modern CSS aims to use these sparingly.

**Button** <small>HTML · Chapter 7</small>
: An element that triggers an action on the current page, not navigation. Marked with the `<button>` tag.

## C

**Cascade** <small>CSS · Chapter 10</small>
: The set of rules CSS uses to decide which styles win when multiple rules target the same element.

**`ch` Unit** <small>CSS · Chapter 14</small>
: A unit of measurement based on the width of the "0" character in the current font, useful for controlling line length.

**Character References** <small>HTML · Chapter 4</small>
: Special codes like `&copy;`, `&reg;`, `&trade;` used to represent symbols and special characters that can't be typed directly.

**Chroma** <small>CSS · Chapter 13</small>
: In OKLCH, the color intensity (0 = gray, higher = more vivid). Similar to saturation but perceptually uniform.

**`clamp()` Function** <small>CSS · Chapter 15</small>
: A CSS function taking three values (minimum, preferred, maximum) that scales fluidly between the min and max.

**Class** <small>HTML/CSS · Chapter 8</small>
: An HTML attribute (e.g., `class="wrapper card"`) that's the primary hook for CSS styling. An element can have multiple classes.

**Class Selector** <small>CSS · Chapter 10</small>
: A CSS selector targeting elements with a specific class, using a dot (e.g., `.wrapper`, `.card`).

**Cluster Layout** <small>CSS · Chapter 16</small>
: A reusable flex pattern for groups of items that wrap naturally, like tags, social links, or navigation.

**Color Palette** <small>CSS · Chapter 13</small>
: A curated set of colors used consistently across a design.

**Combinator** <small>CSS · Chapter 10</small>
: A symbol in CSS that describes relationships between elements (e.g., `>` for direct children, a space for descendants).

**Composition Layer** <small>CSS · Chapter 18</small>
: In CUBE CSS, layout primitives (`.flow`, `.wrapper`, `.grid`) that don't care about the content they contain.

**Container Queries** <small>CSS · Chapter 17</small>
: A CSS feature allowing components to respond to their container's size rather than the viewport's size.

**Content** <small>CSS · Chapter 11</small>
: The innermost part of the box model where an element's actual content (text, images) lives.

**CSS (Cascading Style Sheets)** <small>CSS · Chapter 9</small>
: The language that controls how HTML looks: color, typography, spacing, layout, animation.

**CSS Grid** <small>CSS · Chapter 17</small>
: A two-dimensional layout system that handles rows and columns simultaneously. More powerful than Flexbox for page-level layouts.

**CSS Nesting** <small>CSS · Chapter 10</small>
: A modern CSS feature allowing related styles to be written in a grouped, hierarchical way within a parent selector.

**CSS Reset** <small>CSS · Chapter 10</small>
: A set of CSS rules that normalize browser default styles to start from a consistent baseline.

**CSS Rule** <small>CSS · Chapter 10</small>
: A complete CSS statement consisting of a selector and a declaration block containing properties and values.

**CUBE CSS** <small>CSS · Chapter 18</small>
: A CSS methodology (Composition, Utility, Block, Exception) that organizes styles into layers for maintainability.

**Custom Property** <small>CSS · Chapter 12</small>
: A CSS variable defined with `--` and accessed with `var()` (e.g., `--color-primary`, `--space-m`).

## D

**Data Attribute** <small>HTML/CSS · Chapter 8</small>
: A custom HTML attribute beginning with `data-` (e.g., `data-theme="dark"`) that attaches custom information to elements.

**Description List** <small>HTML · Chapter 4</small>
: A list for key–value pairs or term–definition relationships, using `<dl>`, `<dt>`, and `<dd>` elements.

**Design Token** <small>CSS · Chapter 12</small>
: A named value (color, size, font) defined as a custom property, forming the vocabulary of a design system.

**Details / Summary** <small>HTML · Chapter 7</small>
: A pair of elements that create an expandable/collapsible section with no JavaScript. `<summary>` is the always-visible label.

**Developer Tools (Dev Tools)** <small>HTML/CSS · Chapter 2</small>
: Built-in browser tools that let you inspect HTML, view CSS, debug code, and experiment with changes without modifying your actual files.

**DOCTYPE** <small>HTML · Chapter 3</small>
: The declaration at the very beginning of an HTML file (`<!DOCTYPE html>`) telling browsers this is a modern HTML document.

## E

**Easing** <small>CSS · Chapter 19</small>
: The acceleration curve of an animation: ease, ease-in, ease-out, ease-in-out, or linear.

**Element** <small>HTML · Chapter 3</small>
: A fundamental building block of HTML, consisting of an opening tag, content, and a closing tag (e.g., `<h1>Title</h1>`).

**Element Selector** <small>CSS · Chapter 10</small>
: A CSS selector targeting HTML elements directly by tag name (e.g., `p`, `h1`, `img`).

**Emphasis** <small>HTML · Chapter 4</small>
: The `<em>` element that stresses a word or phrase, changing its meaning. It is the semantic alternative to italic.

**Exception Layer** <small>CSS · Chapter 18</small>
: In CUBE CSS, state variations applied with `data-*` attributes that represent deviations from defaults.

## F

**Fallback Value** <small>CSS · Chapter 12</small>
: A second argument to `var()` that applies if the custom property isn't defined.

**Figcaption** <small>HTML · Chapter 6</small>
: A caption inside a `<figure>` element that describes or provides context for the figure's content.

**Figure** <small>HTML · Chapter 6</small>
: An element wrapping self-contained content (image, diagram, code snippet) that's referenced from the main text.

**`flex-basis`** <small>CSS · Chapter 16</small>
: The ideal starting size of a flex item before any growing or shrinking happens.

**`flex-direction`** <small>CSS · Chapter 16</small>
: A CSS property that determines the main axis of a flex container (row = horizontal, column = vertical).

**`flex-grow`** <small>CSS · Chapter 16</small>
: A value determining how much a flex item expands relative to its siblings when there's extra space.

**`flex-shrink`** <small>CSS · Chapter 16</small>
: A value determining how much a flex item contracts relative to its siblings when space is tight.

**`flex-wrap`** <small>CSS · Chapter 16</small>
: A CSS property that allows flex items to wrap to a new line when they run out of space.

**Flexbox** <small>CSS · Chapter 16</small>
: A CSS layout system (`display: flex`) for distributing items along a single axis with control over alignment and wrapping.

**Flow Utility** <small>CSS · Chapter 11</small>
: The `.flow` class pattern using an adjacent sibling selector to add consistent vertical spacing without margin collapse issues.

**Fluid Design** <small>CSS · Chapter 9</small>
: An approach that embraces the web's fluid nature, establishing relationships and proportions instead of designing for fixed screen sizes.

**Fluid Gallery Pattern** <small>CSS · Chapter 17</small>
: A Grid pattern using `repeat(auto-fit, minmax(...))` that creates a responsive gallery with no breakpoints needed.

**Fluid Scaling** <small>CSS · Chapter 15</small>
: Sizing that smoothly scales between a minimum and maximum as the viewport changes, without breakpoint jumps.

**`font-display: swap`** <small>CSS · Chapter 14</small>
: A CSS property that shows text in a fallback font immediately, then swaps in the custom font once loaded.

**`@font-face`** <small>CSS · Chapter 14</small>
: A CSS rule that loads a custom font file and defines how it should be used.

**`font-family`** <small>CSS · Chapter 14</small>
: A CSS property that sets the typeface, typically with fallbacks (e.g., `font-family: "Georgia", serif`).

**`font-size`** <small>CSS · Chapter 14</small>
: A CSS property that controls the size of text, often measured in `rem` units.

**Footer** <small>HTML · Chapter 5</small>
: A landmark element typically containing copyright notices, secondary links, or contact details.

**`fr` (Fraction Unit)** <small>CSS · Chapter 17</small>
: A CSS unit used in Grid that represents a fraction of available space (e.g., `1fr 1fr` = two equal columns).

## G

**Gap** <small>CSS · Chapter 16</small>
: A CSS property that sets spacing between flex or grid items, replacing older margin-based hacks.

**Generic Container** <small>HTML · Chapter 5</small>
: Elements like `<div>` and `<span>` with no semantic meaning, used purely for structure or styling hooks.

**Grid Container** <small>CSS · Chapter 17</small>
: An element with `display: grid` whose direct children become grid items.

**Grid Item** <small>CSS · Chapter 17</small>
: A direct child of a grid container that participates in grid layout.

**Grid Template Areas** <small>CSS · Chapter 17</small>
: A CSS Grid feature using named areas for semantic, readable page layouts (e.g., `"header header" "sidebar main"`).

**`grid-area`** <small>CSS · Chapter 17</small>
: A CSS property that assigns an element to a named grid area.

**`grid-template-columns`** <small>CSS · Chapter 17</small>
: A CSS property that defines the column structure of a grid (e.g., `1fr 1fr 1fr` for three equal columns).

## H

**`:has()`** <small>CSS · Chapter 10</small>
: A modern CSS selector (the "parent selector") that lets you style an element based on what it contains.

**Head** <small>HTML · Chapter 3</small>
: The invisible section of an HTML document containing metadata like charset, viewport settings, the page title, and stylesheet links.

**Header** <small>HTML · Chapter 5</small>
: A landmark element typically containing the site title or logo and primary navigation.

**Heading Hierarchy** <small>HTML · Chapter 4</small>
: The six levels of headings (`<h1>` through `<h6>`) that create an outline of a page, with `<h1>` being the most important.

**HSL (Hue, Saturation, Lightness)** <small>CSS · Chapter 13</small>
: A color model where hue is position on the color wheel (0–360°), saturation is vividness (0–100%), and lightness is brightness (0–100%).

**HTML (HyperText Markup Language)** <small>HTML · Chapter 1</small>
: The language that gives web pages structure and meaning. It describes what content *is* (heading, paragraph, image) rather than how it looks.

**Hue** <small>CSS · Chapter 13</small>
: The position on the color wheel (red ≈ 0°, green ≈ 120°, blue ≈ 240°), the aspect that makes a color feel "blue" or "red."

## I

**ID** <small>HTML/CSS · Chapter 8</small>
: An HTML attribute providing a unique identifier for an element. No two elements on the same page should share an `id`.

**`!important`** <small>CSS · Chapter 10</small>
: A CSS flag that overrides normal specificity. Best avoided except for critical overrides like `prefers-reduced-motion` rules.

**Inheritance** <small>CSS · Chapter 10</small>
: The mechanism by which certain CSS properties automatically pass from parent elements to their children (e.g., `color`, `font-family`).

**Inline Element** <small>HTML/CSS · Chapter 5</small>
: An element that sits within a line of text without breaking it, taking up only as much width as its content (e.g., `<a>`, `<strong>`, `<span>`).

**Interactive Element** <small>HTML · Chapter 7</small>
: HTML elements designed for user interaction: links, buttons, form controls, and `<details>`/`<summary>` pairs.

**`:is()` and `:where()`** <small>CSS · Chapter 10</small>
: Modern CSS pseudo-classes that group selectors concisely. `:where()` has zero specificity, making it ideal for defaults.

## J

**`justify-content`** <small>CSS · Chapter 16</small>
: A CSS property that aligns flex or grid items along the main axis (e.g., `center`, `space-between`).

## K

**`@keyframes`** <small>CSS · Chapter 19</small>
: A CSS rule that defines the steps of an animation using `from`/`to` or percentage markers.

**Keyframe Animation** <small>CSS · Chapter 19</small>
: A CSS animation defined with `@keyframes` that sequences multiple steps beyond a simple A-to-B transition.

## L

**`@layer` (CSS Layer)** <small>CSS · Chapter 10</small>
: An explicit ordering mechanism in CSS that ensures styles in later-declared layers always beat styles in earlier layers.

**`lang` Attribute** <small>HTML · Chapter 8</small>
: The attribute on the `<html>` element declaring the page's language (e.g., `lang="en"` for English).

**Landmark** <small>HTML · Chapter 5</small>
: A major region of a page (`<header>`, `<main>`, `<nav>`, `<footer>`) that screen readers and assistive technologies can jump to directly.

**Lazy Loading** <small>HTML · Chapter 6</small>
: The `loading="lazy"` attribute that tells the browser to defer loading an image until the user scrolls near it.

**Lightness** <small>CSS · Chapter 13</small>
: How bright a color is: 0% is black, 50% is the pure color, 100% is white.

**`line-height`** <small>CSS · Chapter 14</small>
: The vertical spacing between lines of text, typically expressed as a unitless multiplier (e.g., 1.6 means 1.6× the font size).

**Link** <small>HTML · Chapter 7</small>
: An element that navigates to another URL, marked with the `<a>` tag and `href` attribute.

**Logical Properties** <small>CSS · Chapter 11</small>
: CSS properties that adapt to writing direction using `block` (vertical) and `inline` (horizontal) instead of `top`, `right`, `bottom`, `left`.

## M

**Main** <small>HTML · Chapter 5</small>
: The landmark element wrapping the primary content of a page. There should be only one per page.

**Margin** <small>CSS · Chapter 11</small>
: Space outside the border that pushes other elements away and creates separation between boxes.

**Margin Collapse** <small>CSS · Chapter 11</small>
: A behavior where adjacent vertical margins merge into one instead of adding together.

**Markup** <small>HTML · Chapter 1</small>
: The process of adding HTML tags and structure to content to give it meaning.

**`max()` Function** <small>CSS · Chapter 15</small>
: A CSS function that returns the largest of its arguments (e.g., `max(1rem, 3vw)`).

**Measure** <small>CSS · Chapter 14</small>
: The number of characters per line. The ideal reading measure is roughly 60–80 characters wide.

**Metadata** <small>HTML · Chapter 3</small>
: Information *about* a page that doesn't appear on the page itself, stored in the `<head>` element.

**`min()` Function** <small>CSS · Chapter 15</small>
: A CSS function that returns the smallest of its arguments (e.g., `min(100%, 60rem)`).

**`minmax()` Function** <small>CSS · Chapter 17</small>
: A CSS Grid function that sets a minimum and maximum size for a grid track.

## N

**Navigation (`<nav>`)** <small>HTML · Chapter 5</small>
: A landmark element for major navigation blocks. Can have `aria-label` to distinguish multiple navigation areas on the same page.

**Nesting** <small>HTML · Chapter 3</small>
: Placing one HTML element inside another to create a hierarchical structure. Indentation shows these relationships visually.

**Normal Flow** <small>CSS · Chapter 11</small>
: The browser's default layout algorithm where block elements stack vertically and inline elements sit side by side.

## O

**OKLCH (Lightness, Chroma, Hue)** <small>CSS · Chapter 13</small>
: A modern, perceptually uniform color model where lightness and chroma behave consistently across all hues.

**Ordered List** <small>HTML · Chapter 4</small>
: A list where the sequence matters, using the `<ol>` element. Items appear numbered.

## P

**Padding** <small>CSS · Chapter 11</small>
: Space inside the border but outside the content, creating breathing room within a box.

**Perceptually Uniform** <small>CSS · Chapter 13</small>
: A color model where colors at the same lightness value actually appear equally bright to the human eye. OKLCH is perceptually uniform; HSL is not.

**Picture Element** <small>HTML · Chapter 6</small>
: An HTML element (`<picture>`) that lets you serve different image files depending on context (format support, viewport size).

**`place-items`** <small>CSS · Chapter 17</small>
: A CSS shorthand for both `align-items` and `justify-items` in Grid.

**`prefers-reduced-motion`** <small>CSS · Chapter 19</small>
: A media query that detects a user's system preference for reduced motion, used to disable or soften animations for accessibility.

**Property** <small>CSS · Chapter 10</small>
: The CSS characteristic being styled (e.g., `color`, `font-size`, `padding`).

**Pseudo-class** <small>CSS · Chapter 10</small>
: A CSS selector targeting elements based on state or position (e.g., `:hover`, `:focus-visible`, `:first-child`).

**Pseudo-element** <small>CSS · Chapter 10</small>
: Virtual elements that CSS can style before or after actual elements (e.g., `::before`, `::after`).

## R

**`rem` (Root Em)** <small>CSS · Chapter 14</small>
: A unit of measurement equal to the root font size (usually 16px), allowing sizes to scale if users change their browser's default font size.

**`repeat()` Function** <small>CSS · Chapter 17</small>
: A CSS Grid function that repeats a track pattern (e.g., `repeat(3, 1fr)` = three equal columns).

**Responsive Design** <small>CSS · Chapter 9</small>
: Designing websites that work well on any screen size or device, from phones to large monitors.

**Responsive Images** <small>HTML · Chapter 6</small>
: Images that adapt to different screen sizes and contexts, often using `<picture>` or the `srcset` attribute.

**`rotate()`** <small>CSS · Chapter 19</small>
: A CSS transform function that spins an element by a given angle.

## S

**Saturation** <small>CSS · Chapter 13</small>
: In HSL, how vivid a color is: 0% is gray, 100% is fully vivid.

**`scale()`** <small>CSS · Chapter 19</small>
: A CSS transform function that enlarges or shrinks an element.

**Scale Ratio** <small>CSS · Chapter 15</small>
: A multiplier between steps in a type or space scale (e.g., 1.2 = minor third, 1.333 = perfect fourth).

**Scoping** <small>CSS · Chapter 12</small>
: Redefining custom properties in a smaller context (like within `[data-theme="dark"]`) where they override the root values.

**Section** <small>HTML · Chapter 5</small>
: A thematic grouping of related content, usually with its own heading. Only exposed as a landmark when it has an accessible name.

**Selector** <small>CSS · Chapter 10</small>
: The part of a CSS rule that targets which HTML elements to style.

**Semantic HTML** <small>HTML · Chapter 1</small>
: Choosing HTML elements based on what the content *means* rather than what you want it to *look like*. Helps with accessibility, search engines, and code maintenance.

**Source Order** <small>CSS · Chapter 10</small>
: When two CSS rules have equal specificity and layer, the one written later in the stylesheet wins.

**Space Scale** <small>CSS · Chapter 15</small>
: A harmonious set of related spacing values that scale fluidly with the viewport.

**Specificity** <small>CSS · Chapter 10</small>
: The ranking system CSS uses to determine which rule wins when multiple rules target the same element.

**Strong Importance** <small>HTML · Chapter 4</small>
: The `<strong>` element that marks text as having strong importance. It is the semantic alternative to bold.

**Syntax Highlighting** <small>HTML/CSS · Chapter 2</small>
: Different parts of code appearing in different colors in a text editor, making code easier to read and mistakes easier to spot.

## T

**Tag** <small>HTML · Chapter 3</small>
: The markers that define HTML elements, written with angle brackets (e.g., `<html>`, `</html>`).

**`text-wrap: balance`** <small>CSS · Chapter 14</small>
: A CSS property that makes each line of a heading roughly equal length, avoiding awkward single-word last lines.

**`text-wrap: pretty`** <small>CSS · Chapter 14</small>
: A CSS property that improves paragraph wrapping by ensuring at least two words on the final line.

**Theming** <small>CSS · Chapter 12</small>
: Using scoped custom properties to create different visual treatments of the same component, like light and dark modes.

**Transform** <small>CSS · Chapter 19</small>
: A CSS property that moves, scales, rotates, or skews elements without affecting document flow.

**Transition** <small>CSS · Chapter 19</small>
: A CSS property that smoothly animates the change between two states of a property over a specified duration.

**`translateX()` / `translateY()`** <small>CSS · Chapter 19</small>
: CSS transform functions that move an element horizontally or vertically.

**Type Scale** <small>CSS · Chapter 15</small>
: A harmonious set of related font sizes, typically using a consistent ratio between steps.

**Typeface** <small>CSS · Chapter 14</small>
: A complete set of characters in a particular design (e.g., Garamond, Helvetica, Georgia).

## U

**Unordered List** <small>HTML · Chapter 4</small>
: A list where order doesn't matter, using the `<ul>` element. Items appear as bullet points.

**UTF-8 Encoding** <small>HTML/CSS · Chapter 2</small>
: A character encoding standard that ensures special characters, accented letters, emoji, and symbols display correctly across browsers and systems.

**Utility Layer** <small>CSS · Chapter 18</small>
: In CUBE CSS, single-purpose reusable classes (`.text-center`, `.visually-hidden`) that override block styles.

**Utopia** <small>CSS · Chapter 15</small>
: A tool suite (utopia.fyi) that generates fluid type and space scales as custom properties based on your design parameters.

## V

**Value** <small>CSS · Chapter 10</small>
: The setting applied to a CSS property (e.g., `darkslateblue`, `2rem`, `1.5`).

**Viewport** <small>HTML/CSS · Chapter 3</small>
: The visible area of the browser window, the rectangular space where content is displayed.

**Viewport Width (`vw`)** <small>CSS · Chapter 15</small>
: A CSS unit equal to 1% of the browser window's width. Used in fluid scaling calculations.

**Visually Hidden** <small>HTML/CSS · Chapter 18</small>
: A utility class that hides content visually but keeps it accessible to screen readers.
