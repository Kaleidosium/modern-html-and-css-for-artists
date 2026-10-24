import puppeteer from "puppeteer";

// START 11TY imports
import {
  EleventyHtmlBasePlugin,
  InputPathToUrlTransformPlugin,
} from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import pluginRss from "@11ty/eleventy-plugin-rss";
// END 11TY imports
import { renderMermaid } from "@mermaid-js/mermaid-cli";

// START LibDoc imports
import libdocConfig from "./_data/libdocConfig.js";
import libdocFunctions from "./_data/libdocFunctions.js";
import libdocUtils from "./_data/libdocUtils.js";

// END LibDoc imports

// Shared semantic node colors for the light and dark Mermaid themes.
const mermaidNodeStyles = {
  light: `
    .edgeLabel .background { opacity: 1; fill-opacity: 1; }
    .node.libdoc-mermaid-neutral > .label-container { fill: #f0f0f0; stroke: #999; }
    .node.libdoc-mermaid-info > .label-container { fill: #e8f4f8; stroke: #2980b9; }
    .node.libdoc-mermaid-success > .label-container { fill: #d5f5e3; stroke: #27ae60; }
    .node.libdoc-mermaid-warning > .label-container { fill: #fef3e2; stroke: #e67e22; }
    .node.libdoc-mermaid-accent > .label-container { fill: #fdf2f8; stroke: #9b59b6; }
    .node.libdoc-mermaid-danger > .label-container { fill: #fee; stroke: #e74c3c; }
  `,
  dark: `
    .edgeLabel .background { opacity: 1; fill-opacity: 1; }
    .node > .label-container { stroke-width: 1.25px; }
    .node.libdoc-mermaid-neutral > .label-container { fill: #252329; stroke: #857c90; }
    .node.libdoc-mermaid-info > .label-container { fill: #202b36; stroke: #8fb9d4; }
    .node.libdoc-mermaid-success > .label-container { fill: #23302b; stroke: #9abfa8; }
    .node.libdoc-mermaid-warning > .label-container { fill: #302a22; stroke: #d1b27e; }
    .node.libdoc-mermaid-accent > .label-container { fill: #2b2539; stroke: #b0a8f0; }
    .node.libdoc-mermaid-danger > .label-container { fill: #34262d; stroke: #d19b9f; }
  `,
};

// A flat drafting style, using the guide's Recursive lettering and lavender ink.
const mermaidDarkTheme = {
  theme: "dark",
  darkMode: true,
  look: "classic",
  fontFamily: '"Recursive Variable", "Recursive", sans-serif',
  themeVariables: {
    fontFamily: '"Recursive Variable", "Recursive", sans-serif',
    fontSize: "16px",
    background: "#131210",
    primaryColor: "#252329",
    primaryBorderColor: "#8c80a8",
    primaryTextColor: "#eeedeb",
    mainBkg: "#252329",
    mainContrastColor: "#eeedeb",
    nodeBorder: "#8c80a8",
    lineColor: "#b0a8f0",
    defaultLinkColor: "#b0a8f0",
    textColor: "#eeedeb",
    edgeLabelBackground: "#131210",
    clusterBkg: "#1d1a23",
    clusterBorder: "#857c90",
    useGradient: false,
    dropShadow: "none",
  },
};

// Run in Chromium to edit SVG attributes without changing labels or metadata.
function prepareMermaidSvg(svg, svgId) {
  const document = new DOMParser().parseFromString(svg, "image/svg+xml");
  if (document.querySelector("parsererror")) {
    throw new Error("Mermaid returned invalid SVG");
  }
  const elements = [...document.querySelectorAll("*")];
  const ids = new Map(
    elements
      .filter((element) => element.hasAttribute("id"))
      .map((element) => {
        const id = element.getAttribute("id");
        return [id, id.startsWith(svgId) ? id : `${svgId}-${id}`];
      }),
  );
  const scope = (id) => ids.get(id) ?? id;
  const scopeUrls = (value) =>
    value.replace(
      /url\(\s*(['"]?)#([^\s)'";]+)\1\s*\)/g,
      (_, quote, id) => `url(${quote}#${scope(id)}${quote})`,
    );
  const referenceAttributes = new Set([
    "fill", "stroke", "filter", "mask", "clip-path", "cursor",
    "marker", "marker-start", "marker-mid", "marker-end",
  ]);
  const scopeDeclarations = (declarations) => {
    let changed = false;
    for (const property of declarations) {
      if (!referenceAttributes.has(property)) continue;
      const value = declarations.getPropertyValue(property);
      const scoped = scopeUrls(value);
      if (scoped !== value) {
        declarations.setProperty(property, scoped, declarations.getPropertyPriority(property));
        changed = true;
      }
    }
    return changed;
  };
  for (const element of elements) {
    for (const attribute of element.attributes) {
      if (attribute.name === "id") {
        attribute.value = scope(attribute.value);
      } else if (attribute.localName === "href" && attribute.value.startsWith("#")) {
        attribute.value = `#${scope(attribute.value.slice(1))}`;
      } else if (["aria-labelledby", "aria-describedby"].includes(attribute.name)) {
        attribute.value = attribute.value.split(/\s+/).map(scope).join(" ");
      } else if (attribute.name === "style") {
        scopeDeclarations(element.style);
      } else if (referenceAttributes.has(attribute.name)) {
        attribute.value = scopeUrls(attribute.value);
      }
    }
  }
  // Parse CSS separately so only selectors and URL references are rewritten.
  for (const style of document.querySelectorAll("style")) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(style.textContent);
    let changed = false;
    const scopeRules = (rules) => {
      for (const rule of rules) {
        if (typeof rule.selectorText === "string") {
          const selector = rule.selectorText.replace(
            /#([\w-]+)/g,
            (_, id) => `#${scope(id)}`,
          );
          if (selector !== rule.selectorText) {
            rule.selectorText = selector;
            changed = true;
          }
        }
        if (rule.style && scopeDeclarations(rule.style)) changed = true;
        if (rule.cssRules) scopeRules(rule.cssRules);
      }
    };
    scopeRules(sheet.cssRules);
    if (changed) {
      style.textContent = [...sheet.cssRules].map((rule) => rule.cssText).join("\n");
    }
  }
  const root = document.documentElement;
  if (root.viewBox.baseVal.width > 0) {
    root.style.setProperty(
      "--libdoc-mermaid-width",
      `${root.viewBox.baseVal.width}px`,
    );
    root.style.maxWidth =
      "calc(var(--libdoc-mermaid-width) * var(--libdoc-mermaid-preferred-scale, 1))";
  }
  return new XMLSerializer().serializeToString(root);
}

export default function (eleventyConfig) {
  // START PLUGINS
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(
    eleventyImageTransformPlugin,
    libdocFunctions.pluginsParameters.eleventyImageTransform(),
  );
  eleventyConfig.addPlugin(pluginRss);
  // Mermaid support: render mermaid code blocks as diagrams
  eleventyConfig.amendLibrary("md", (mdLib) => {
    const defaultFence = mdLib.renderer.rules.fence;
    mdLib.renderer.rules.fence = function (tokens, idx, options, env, self) {
      const token = tokens[idx];
      if (token.info.trim() === "mermaid") {
        return `<div class="mermaid">${token.content}</div>`;
      }
      return defaultFence
        ? defaultFence(tokens, idx, options, env, self)
        : self.renderToken(tokens, idx, options);
    };

    const defaultLinkOpen =
      mdLib.renderer.rules.link_open ||
      function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
      };
    mdLib.renderer.rules.link_open = function (
      tokens,
      idx,
      options,
      env,
      self,
    ) {
      const token = tokens[idx];
      let linkText = "";
      for (let i = idx + 1; i < tokens.length; i++) {
        if (tokens[i].type === "link_close") break;
        if (tokens[i].type === "text" || tokens[i].type === "code_inline") {
          linkText += tokens[i].content;
        }
      }
      const href = token.attrGet("href");
      if (libdocUtils.isRawLink(linkText, href)) {
        token.attrJoin("class", "raw-link");
      }
      return defaultLinkOpen(tokens, idx, options, env, self);
    };
  });
  // Build-time mermaid rendering: replace <div class="mermaid"> with rendered SVGs
  let mermaidBrowser = null;
  let mermaidSvgPage = null;
  eleventyConfig.on("eleventy.before", async () => {
    mermaidBrowser = await puppeteer.launch({ headless: true });
    mermaidSvgPage = await mermaidBrowser.newPage();
  });
  eleventyConfig.on("eleventy.after", async () => {
    if (mermaidBrowser) {
      await mermaidBrowser.close();
      mermaidBrowser = null;
      mermaidSvgPage = null;
    }
  });
  eleventyConfig.addTransform("mermaid", async function (content) {
    if (!this.page.outputPath?.endsWith(".html")) return content;
    const regex = /<div class="mermaid">([\s\S]*?)<\/div>/g;
    const matches = [...content.matchAll(regex)];
    if (matches.length === 0) return content;
    for (const [index, match] of matches.entries()) {
      const diagrams = [];
      for (const theme of ["light", "dark"]) {
        const svgId = `mermaid-${index}-${theme}`;
        const { data } = await renderMermaid(
          mermaidBrowser,
          match[1],
          "svg",
          {
            backgroundColor: "transparent",
            svgId,
            mermaidConfig: {
              ...(theme === "dark" ? mermaidDarkTheme : {}),
              themeCSS: mermaidNodeStyles[theme],
              htmlLabels: false,
              flowchart: {
                htmlLabels: false,
                ...(theme === "dark" ? { padding: 20, wrappingWidth: 160 } : {}),
              },
            },
          },
        );
        const svg = await mermaidSvgPage.evaluate(
          prepareMermaidSvg,
          new TextDecoder().decode(data),
          svgId,
        );
        diagrams.push(`<div class="mermaid--${theme}">${svg}</div>`);
      }
      content = content.replace(
        match[0],
        `<div class="mermaid-diagram" tabindex="0" role="region" aria-label="Diagram">${diagrams.join("")}</div>`,
      );
    }
    return content;
  });
  eleventyConfig.addTransform("raw-links", function (content) {
    if (!this.page.outputPath?.endsWith(".html")) return content;
    return content.replace(
      /<a\b([^>]*?)>(.*?)<\/a>/gi,
      (match, attrs, innerText) => {
        if (/<(img|picture|svg|span\s+class="icon-)/i.test(innerText))
          return match;
        const plainText = innerText.replace(/<[^>]*>/g, "").trim();
        const hrefMatch = attrs.match(/href=(["'])(.*?)\1/i);
        const href = hrefMatch ? hrefMatch[2] : "";
        if (libdocUtils.isRawLink(plainText, href)) {
          if (/class=(["'])(.*?)\1/i.test(attrs)) {
            if (!/\braw-link\b/.test(attrs)) {
              attrs = attrs.replace(
                /class=(["'])(.*?)\1/i,
                'class="$2 raw-link"',
              );
            }
          } else {
            attrs = `${attrs} class="raw-link"`;
          }
          return `<a${attrs}>${innerText}</a>`;
        }
        return match;
      },
    );
  });
  // END PLUGINS

  // START FILTERS
  eleventyConfig.addAsyncFilter("autoids", libdocFunctions.filters.autoids);
  eleventyConfig.addAsyncFilter("embed", libdocFunctions.filters.embed);
  eleventyConfig.addAsyncFilter("cleanup", libdocFunctions.filters.cleanup);
  eleventyConfig.addAsyncFilter(
    "dateString",
    libdocFunctions.filters.dateString,
  );
  eleventyConfig.addAsyncFilter(
    "datePrefixText",
    libdocFunctions.filters.datePrefixText,
  );
  eleventyConfig.addAsyncFilter("toc", libdocFunctions.filters.toc);
  eleventyConfig.addAsyncFilter(
    "sanitizeJSON",
    libdocFunctions.filters.sanitizeJson,
  );
  eleventyConfig.addAsyncFilter(
    "gitLastModifiedDate",
    libdocFunctions.filters.gitLastModifiedDate,
  );
  eleventyConfig.addFilter("getNextPage", libdocFunctions.filters.getNextPage);
  eleventyConfig.addFilter(
    "getPreviousPage",
    libdocFunctions.filters.getPreviousPage,
  );
  // END FILTERS

  // START COLLECTIONS
  eleventyConfig.addCollection("myTags", libdocFunctions.collections.myTags);
  eleventyConfig.addCollection(
    "postsByDateDescending",
    libdocFunctions.collections.postsByDateDescending,
  );
  // END COLLECTIONS

  // START SHORTCODES
  eleventyConfig.addShortcode("alert", libdocFunctions.shortcodes.alert);
  eleventyConfig.addPairedShortcode(
    "alertAlt",
    libdocFunctions.shortcodes.alert,
  );
  eleventyConfig.addShortcode("embed", libdocFunctions.shortcodes.embed);
  eleventyConfig.addShortcode("icons", libdocFunctions.shortcodes.icons);
  eleventyConfig.addShortcode("icon", libdocFunctions.shortcodes.icon);
  eleventyConfig.addShortcode("iconCard", libdocFunctions.shortcodes.iconCard);
  eleventyConfig.addPairedShortcode(
    "sandbox",
    libdocFunctions.shortcodes.sandbox,
  );
  eleventyConfig.addPairedShortcode(
    "sandboxFile",
    libdocFunctions.shortcodes.sandboxFile,
  );
  // END SHORTCODES

  // START FILE COPY
  eleventyConfig.addPassthroughCopy("sandboxes");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("core/assets");
  eleventyConfig.addPassthroughCopy("favicon.png");
  // END FILE COPY

  return {
    pathPrefix: libdocConfig.htmlBasePathPrefix,
  };
}
