---
title: "Chapter 2: Getting Set Up"
description: "Setting up your tools: a code editor, live preview, and browser developer tools."
layout: libdoc_page.liquid
permalink: html/getting-set-up/index.html
eleventyNavigation:
    key: "Chapter 2: Getting Set Up"
    parent: HTML
    order: 2
---

Before you write any code, you need a few tools. The good news is that everything you need is free, and setup takes about five minutes.

## A text editor

You need a text editor designed for code, not a word processor like Google Docs or Microsoft Word. The most popular choice is **[Visual Studio Code](https://code.visualstudio.com/)** (usually called VS Code). It's free, runs on Mac, Windows, and Linux, and has excellent support for HTML and CSS out of the box.

When you first open VS Code, create a new folder for your project (File > Open Folder), then create a new file called `index.html`. Make sure the file is saved with **UTF-8 encoding** (VS Code does this by default; you can check in the bottom status bar). This matches the `<meta charset="UTF-8">` declaration in your HTML and ensures characters like accented letters, special symbols, and emoji display correctly.

You'll notice that VS Code gives you syntax highlighting (different parts of your code appear in different colors), auto-closing tags, and helpful suggestions as you type. These aren't cosmetic touches. They make it much easier to spot mistakes.

VS Code also includes a tool called Emmet that expands shorthand into HTML. Try typing `!` and pressing Tab in an empty `.html` file to generate a starter skeleton. You'll pick up more shortcuts naturally as you go.

Other good options include [Zed](https://zed.dev/), [Sublime Text](https://www.sublimetext.com/), and [Nova](https://nova.app/) (Mac only). Any of these will serve you well. Pick one and get comfortable with it.

## Previewing your work

Once you've saved an HTML file, you can open it directly in your browser. On most systems, double-clicking the `.html` file will do it. You'll see your page, and the address bar will show a `file:///` path.

This works for getting started, but you'll quickly want a **live preview** that refreshes automatically whenever you save a change. In VS Code, install the **Live Preview** extension (by Microsoft). It gives you a one-click preview that updates in real time. Right-click your HTML file and choose "Show Preview" to get started.

## Browser developer tools

This is the single most important tool you'll use after your text editor, and it's already built into your browser. Every modern browser (Chrome, Firefox, Safari, Edge) includes a set of developer tools that let you inspect, debug, and experiment with any web page, including your own.

To open them:

- **Chrome / Edge**: Right-click any element on the page and choose "Inspect," or press `F12` or `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (Mac).
- **Firefox**: Same shortcuts, or right-click and choose "Inspect."
- **Safari**: First enable them in Safari > Settings > Advanced > "Show features for web developers." Then right-click and choose "Inspect Element."

The two panels you'll use most:

**The Elements panel** (called "Inspector" in Firefox) shows the HTML structure of the page as a live, interactive tree. You can click on any element to see its CSS on the right side. You can also edit the HTML and CSS directly in the panel to experiment. None of your changes are permanent; refreshing the page resets everything. This makes it a perfect sandbox for trying things out.

**The box model diagram** appears when you select an element in the Elements panel. It shows the content, padding, border, and margin as a visual, layered rectangle. When we cover the box model in the CSS guide, this diagram will make the concept click immediately.

Get in the habit of opening the developer tools whenever something looks wrong (or right) on your page. Inspecting how other people's websites are built is one of the best ways to learn.
