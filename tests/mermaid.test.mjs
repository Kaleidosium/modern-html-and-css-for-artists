import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { after, before, test } from "node:test";
import puppeteer from "puppeteer";
import configure from "../.eleventy.js";

const hooks = new Map();
const transforms = new Map();
const noop = () => {};
configure({
  addPlugin: noop,
  amendLibrary: noop,
  on: (name, handler) => hooks.set(name, handler),
  addTransform: (name, transform) => transforms.set(name, transform),
  addAsyncFilter: noop,
  addFilter: noop,
  addCollection: noop,
  addShortcode: noop,
  addPairedShortcode: noop,
  addPassthroughCopy: noop,
});

let browser;
let page;
const rendered = new Map();
async function render(source) {
  if (!rendered.has(source)) {
    rendered.set(source, await transforms.get("mermaid").call(
      { page: { outputPath: "test/index.html" } },
      `<div class="mermaid">${source}</div>`,
    ));
  }
  return rendered.get(source);
}

before(async () => {
  await hooks.get("eleventy.before")();
  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
});

after(async () => {
  await browser?.close();
  await hooks.get("eleventy.after")();
});

test("SVG scoping preserves quoted text and accessibility metadata", async () => {
  await page.setContent(await render(`sequenceDiagram
    accTitle: Set id="intro"
    accDescr: Keep href="#intro" and aria-labelledby="intro"
    Alice->>Bob: Set id="intro"
    Bob->>Alice: Set aria-labelledby="intro"
  `));
  const diagrams = await page.$$eval(".mermaid-diagram svg", (svgs) =>
    svgs.map((svg) => ({
      title: svg.querySelector("title").textContent,
      description: svg.querySelector("desc").textContent,
      labels: [...svg.querySelectorAll("text")].map((text) => text.textContent),
    })),
  );
  assert.equal(diagrams.length, 2);
  for (const diagram of diagrams) {
    assert.equal(diagram.title, 'Set id="intro"');
    assert.equal(diagram.description, 'Keep href="#intro" and aria-labelledby="intro"');
    assert(diagram.labels.includes('Set id="intro"'));
    assert(diagram.labels.includes('Set aria-labelledby="intro"'));
  }
});

test("diagram-local class definitions retain their fill and text colors", async () => {
  await page.setContent(await render(`graph LR
    A[Local style]:::info --> B
    classDef info fill:#ff0000,stroke:#000000,color:#ffffff;
  `));
  const colors = await page.$$eval(".node.info", (nodes) => nodes.map((node) => ({
    fill: getComputedStyle(node.querySelector(".label-container")).fill,
    text: getComputedStyle(node.querySelector("text")).fill,
  })));
  assert.deepEqual(colors, [
    { fill: "rgb(255, 0, 0)", text: "rgb(255, 255, 255)" },
    { fill: "rgb(255, 0, 0)", text: "rgb(255, 255, 255)" },
  ]);
});

test("namespaced chapter colors follow the theme without modifying Mermaid syntax", async () => {
  await page.setContent(await render(`graph LR
    A[Themed node]:::libdoc-mermaid-info --> B
  `));
  const fills = await page.$$eval(".node.libdoc-mermaid-info > .label-container", (nodes) =>
    nodes.map((node) => getComputedStyle(node).fill),
  );
  assert.deepEqual(fills, ["rgb(232, 244, 248)", "rgb(32, 43, 54)"]);
});

test("a mindmap node named graph does not receive flowchart declarations", async () => {
  await page.setContent(await render(`mindmap
    root((Web))
      graph
        nodes
      CSS
  `));
  const diagrams = await page.$$eval(".mermaid-diagram svg", (svgs) =>
    svgs.map((svg) => [...svg.querySelectorAll("text")].map((text) => text.textContent.trim()).filter(Boolean)),
  );
  for (const labels of diagrams) {
    assert.deepEqual(labels.sort(), ["CSS", "Web", "graph", "nodes"]);
  }
});

test("multiple diagram types keep unique IDs and working SVG references", async () => {
  const sources = [
    "sequenceDiagram\n accTitle: Message\n Alice->>Bob: Hello\n",
    "stateDiagram-v2\n [*] --> Moving\n Moving --> Still\n Still --> [*]\n",
    "classDiagram\n Animal <|-- Duck\n Duck *-- Egg\n Duck o-- Pond\n",
  ];
  const html = await transforms.get("mermaid").call(
    { page: { outputPath: "test/index.html" } },
    sources.map((source) => `<div class="mermaid">${source}</div>`).join(""),
  );
  await page.setContent(html);
  const result = await page.evaluate(() => {
    const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
    const references = [];
    for (const element of document.querySelectorAll("svg *")) {
      for (const attribute of element.attributes) {
        if (attribute.localName === "href" && attribute.value.startsWith("#")) {
          references.push(attribute.value.slice(1));
        } else if (["aria-labelledby", "aria-describedby"].includes(attribute.name)) {
          references.push(...attribute.value.split(/\s+/));
        } else {
          references.push(...[...attribute.value.matchAll(/url\(["']?#([^\s)"']+)["']?\)/g)].map((match) => match[1]));
        }
      }
    }
    return {
      variants: document.querySelectorAll(".mermaid-diagram svg").length,
      uniqueIds: ids.length === new Set(ids).size,
      missingReferences: references.filter((id) => !document.getElementById(id)),
    };
  });
  assert.deepEqual(result, { variants: 6, uniqueIds: true, missingReferences: [] });
});

test("wide diagrams scroll at readable sizes without overflowing the page", async () => {
  const read = (file) => readFile(new URL(file, import.meta.url), "utf8");
  const chapter = await read("../ch10-how-css-works.md");
  // Keep the overflow fixture horizontal even though the guide uses a vertical layout.
  const source = chapter.match(/```mermaid\n([\s\S]*?)```/)[1].replace(/^graph TD$/m, "graph LR");
  const html = await render(source);
  const styles = await Promise.all([
    "../core/assets/css/ds.css",
    "../core/assets/css/ds__defaults.css",
    "../core/assets/css/ds__colors.css",
    "../core/assets/css/ds__dark_mode.css",
  ].map(read));
  for (const width of [375, 1440]) {
    await page.setViewport({ width, height: 1000 });
    await page.setContent(`<style>${styles.slice(0, 3).join("\n")}</style>
      <style media="(prefers-color-scheme: dark)">${styles[3]}</style>
      <main w-100-minus-sidebar="md" w-100="xs,sm">${html}</main>`);
    for (const theme of ["light", "dark"]) {
      await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: theme }]);
      const metrics = await page.evaluate((theme) => {
        const wrapper = document.querySelector(".mermaid-diagram");
        const svg = wrapper.querySelector(`.mermaid--${theme} svg`);
        const text = svg.querySelector(".node text");
        return {
          fontSize: parseFloat(getComputedStyle(text).fontSize) * text.getScreenCTM().a,
          pageWidth: document.documentElement.scrollWidth,
          viewport: innerWidth,
          scrolls: wrapper.scrollWidth > wrapper.clientWidth,
          visible: svg.getBoundingClientRect().width > 0,
          width: svg.getBoundingClientRect().width,
          nativeWidth: svg.viewBox.baseVal.width,
        };
      }, theme);
      assert(metrics.fontSize >= 12, `${width}px ${theme}: ${metrics.fontSize}px labels`);
      assert.equal(metrics.pageWidth, metrics.viewport);
      assert(metrics.visible);
      assert(metrics.width < metrics.nativeWidth * 0.99, "Diagrams should shrink below their native size");
      if (width === 375) {
        assert(metrics.scrolls);
        await page.focus(".mermaid-diagram");
        await page.keyboard.press("ArrowRight");
        await page.waitForFunction(() => document.querySelector(".mermaid-diagram").scrollLeft > 0);
        await page.$eval(".mermaid-diagram", (wrapper) => wrapper.scrollLeft = 0);
      }
    }
    await page.emulateMediaType("print");
    const print = await page.$eval(".mermaid-diagram", (wrapper) => ({
      width: wrapper.clientWidth,
      svgWidth: wrapper.querySelector(".mermaid--light svg").getBoundingClientRect().width,
    }));
    assert(print.svgWidth <= print.width, "Printed diagrams should fit the page");
    await page.emulateMediaType("screen");
  }
});

test("nested diagrams scroll inside blockquotes and lists without widening the page", async () => {
  const read = (file) => readFile(new URL(file, import.meta.url), "utf8");
  const chapter = await read("../ch10-how-css-works.md");
  const source = chapter.match(/```mermaid\n([\s\S]*?)```/)[1].replace(/^graph TD$/m, "graph LR");
  const diagram = await render(source);
  const styles = await Promise.all([
    "../core/assets/css/ds.css",
    "../core/assets/css/ds__defaults.css",
    "../core/assets/css/ds__colors.css",
    "../core/assets/css/ds__dark_mode.css",
  ].map(read));
  const containers = {
    blockquote: `<blockquote>${diagram}</blockquote>`,
    "unordered list": `<ul><li>${diagram}</li></ul>`,
    "ordered list": `<ol><li>${diagram}</li></ol>`,
  };
  for (const width of [375, 1440]) {
    await page.setViewport({ width, height: 1000 });
    for (const [container, content] of Object.entries(containers)) {
      await page.setContent(`<style>${styles.slice(0, 3).join("\n")}</style>
        <style media="(prefers-color-scheme: dark)">${styles[3]}</style>
        <main w-100-minus-sidebar="md" w-100="xs,sm">${content}</main>`);
      for (const theme of ["light", "dark"]) {
        await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: theme }]);
        const metrics = await page.evaluate((theme) => {
          const wrapper = document.querySelector(".mermaid-diagram");
          const text = wrapper.querySelector(`.mermaid--${theme} .node text`);
          return {
            pageWidth: document.documentElement.scrollWidth,
            viewport: innerWidth,
            scrolls: wrapper.scrollWidth > wrapper.clientWidth,
            overflowX: getComputedStyle(wrapper).overflowX,
            fontSize: parseFloat(getComputedStyle(text).fontSize) * text.getScreenCTM().a,
          };
        }, theme);
        const context = `${container}, ${width}px, ${theme}`;
        assert.equal(metrics.pageWidth, metrics.viewport, context);
        assert.equal(metrics.overflowX, "auto", context);
        assert(metrics.scrolls, context);
        assert(metrics.fontSize >= 12, context);
      }
    }
  }
});
