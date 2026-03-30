import puppeteer from 'puppeteer';

// START 11TY imports
import {
  EleventyHtmlBasePlugin,
  InputPathToUrlTransformPlugin,
} from '@11ty/eleventy';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import eleventyNavigationPlugin from '@11ty/eleventy-navigation';
import pluginRss from '@11ty/eleventy-plugin-rss';
// END 11TY imports
import { renderMermaid } from '@mermaid-js/mermaid-cli';

// START LibDoc imports
import libdocConfig from './_data/libdocConfig.js';
import libdocFunctions from './_data/libdocFunctions.js';

// END LibDoc imports

export default function(eleventyConfig) {
    // START PLUGINS
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, libdocFunctions.pluginsParameters.eleventyImageTransform());
    eleventyConfig.addPlugin(pluginRss);
    // Mermaid support: render mermaid code blocks as diagrams
    eleventyConfig.amendLibrary("md", (mdLib) => {
        const defaultFence = mdLib.renderer.rules.fence;
        mdLib.renderer.rules.fence = function(tokens, idx, options, env, self) {
            const token = tokens[idx];
            if (token.info.trim() === "mermaid") {
                return `<div class="mermaid">${token.content}</div>`;
            }
            return defaultFence
                ? defaultFence(tokens, idx, options, env, self)
                : self.renderToken(tokens, idx, options);
        };
    });
    // Build-time mermaid rendering: replace <div class="mermaid"> with rendered SVGs
    let mermaidBrowser = null;
    eleventyConfig.on("eleventy.before", async () => {
        mermaidBrowser = await puppeteer.launch({ headless: true });
    });
    eleventyConfig.on("eleventy.after", async () => {
        if (mermaidBrowser) { await mermaidBrowser.close(); mermaidBrowser = null; }
    });
    eleventyConfig.addTransform("mermaid", async function(content) {
        if (!this.page.outputPath?.endsWith(".html")) return content;
        const regex = /<div class="mermaid">([\s\S]*?)<\/div>/g;
        const matches = [...content.matchAll(regex)];
        if (matches.length === 0) return content;
        for (const match of matches) {
            const { data } = await renderMermaid(mermaidBrowser, match[1], "svg", {
                backgroundColor: "transparent",
            });
            const svg = new TextDecoder().decode(data);
            content = content.replace(match[0], svg);
        }
        return content;
    });
    // END PLUGINS

    // START FILTERS
    eleventyConfig.addAsyncFilter("autoids", libdocFunctions.filters.autoids);
    eleventyConfig.addAsyncFilter("embed", libdocFunctions.filters.embed);
    eleventyConfig.addAsyncFilter("cleanup", libdocFunctions.filters.cleanup);
    eleventyConfig.addAsyncFilter("dateString", libdocFunctions.filters.dateString);
    eleventyConfig.addAsyncFilter("datePrefixText", libdocFunctions.filters.datePrefixText);
    eleventyConfig.addAsyncFilter("toc", libdocFunctions.filters.toc);
    eleventyConfig.addAsyncFilter("sanitizeJSON", libdocFunctions.filters.sanitizeJson);
    eleventyConfig.addAsyncFilter("gitLastModifiedDate", libdocFunctions.filters.gitLastModifiedDate);
    // END FILTERS

    // START COLLECTIONS
    eleventyConfig.addCollection("myTags", libdocFunctions.collections.myTags);
    eleventyConfig.addCollection("postsByDateDescending", libdocFunctions.collections.postsByDateDescending);
    // END COLLECTIONS

    // START SHORTCODES
    eleventyConfig.addShortcode("alert", libdocFunctions.shortcodes.alert);
    eleventyConfig.addPairedShortcode("alertAlt", libdocFunctions.shortcodes.alert);
    eleventyConfig.addShortcode("embed", libdocFunctions.shortcodes.embed);
    eleventyConfig.addShortcode("icons", libdocFunctions.shortcodes.icons);
    eleventyConfig.addShortcode("icon", libdocFunctions.shortcodes.icon);
    eleventyConfig.addShortcode("iconCard", libdocFunctions.shortcodes.iconCard);
    eleventyConfig.addPairedShortcode("sandbox", libdocFunctions.shortcodes.sandbox);
    eleventyConfig.addPairedShortcode("sandboxFile", libdocFunctions.shortcodes.sandboxFile);
    // END SHORTCODES

    // START FILE COPY
	eleventyConfig.addPassthroughCopy("sandboxes");
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("core/assets");
    eleventyConfig.addPassthroughCopy("favicon.png");
    // END FILE COPY
    
    return {
        pathPrefix: libdocConfig.htmlBasePathPrefix
    }
};