// Turns lesson Markdown into the site's lesson markup:
// - ```prompt blocks become screenplay-style prompts with a copy button
// - a ::::ladder of :::step{label="..."} becomes one frame switched in place, with a contact strip
//   of all steps below it (UI strings come from src/i18n/<locale>.json)
// - standalone images and .mp4 videos become captioned figures on a neutral stage
// - relative media/ paths point at public/media/<topic>/<lesson>/
// - the leading "# Title" is dropped (the layout renders the title)
// Captions come from the alt text and the generation record (media/<file>.json) next to each file.

import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { imageSizeFromFile } from "image-size/fromFile";
import { visit, SKIP } from "unist-util-visit";

const contentRoot = resolve("content");

const escape = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const isVideo = (url) => /\.(mp4|webm|mov)$/i.test(url);

// `next` as HTML, with the words it shares with `previous` (longest common subsequence) marked as unchanged.
function diffWords(previous, next) {
  const norm = (w) => w.toLowerCase().replace(/[^\p{L}\p{N}-]/gu, "");
  const a = previous.split(/\s+/).map(norm);
  const words = next.split(/\s+/);
  const b = words.map(norm);
  const lcs = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = b.length - 1; j >= 0; j--)
      lcs[i][j] = a[i] && a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
  const same = new Set();
  for (let i = 0, j = 0; i < a.length && j < b.length; ) {
    if (a[i] && a[i] === b[j]) same.add(j), i++, j++;
    else if (lcs[i + 1][j] >= lcs[i][j + 1]) i++;
    else j++;
  }
  // Runs of words share one span: <span class="same"> for unchanged, <span class="new"> for added.
  let html = "";
  let run = null;
  for (const [j, word] of words.entries()) {
    const kind = same.has(j) ? "same" : "new";
    if (kind !== run) html += `${run ? "</span> " : ""}<span class="${kind}">`;
    else html += " ";
    run = kind;
    html += escape(word);
  }
  return html + (run ? "</span>" : "");
}

// The image that a paragraph consists of, or null if it has anything else.
function soleImage(node) {
  if (node.type !== "paragraph") return null;
  const meaningful = node.children.filter((c) => !(c.type === "text" && !c.value.trim()));
  return meaningful.length === 1 && meaningful[0].type === "image" ? meaningful[0] : null;
}

export default function remarkLesson({ base = "/" } = {}) {
  return async (tree, file) => {
    const lessonDir = dirname(resolve(file.path ?? ""));
    const [locale, topic, lesson] = relative(contentRoot, lessonDir).split("/");
    if (!topic || !lesson) return;
    const ui = JSON.parse(readFileSync(resolve(`src/i18n/${locale}.json`), "utf8"));
    const mediaUrl = `${base.replace(/\/?$/, "/")}media/${topic}/${lesson}/`;

    // Metadata for one media path: public URL, size, and generation record.
    async function media(url) {
      const name = url.replace(/^\.?\/?media\//, "");
      const path = join(lessonDir, "media", name);
      const record = path.replace(/\.[^.]+$/, ".json");
      const meta = existsSync(record) ? JSON.parse(readFileSync(record, "utf8")) : {};
      let size = {};
      if (!isVideo(name) && existsSync(path)) size = await imageSizeFromFile(path);
      const source = meta.film ?? (meta.model ? meta.model.replace(/^[^/]+\//, "") : "");
      return { src: mediaUrl + name, width: size.width, height: size.height, source };
    }

    const tag = async (url, alt, cls = "") => {
      const m = await media(url);
      if (isVideo(url))
        return { m, html: `<video class="${cls}" src="${m.src}" autoplay muted loop playsinline aria-label="${escape(alt)}"></video>` };
      const dims = m.width ? ` width="${m.width}" height="${m.height}"` : "";
      return { m, html: `<img class="${cls}" src="${m.src}" alt="${escape(alt)}"${dims} loading="lazy">` };
    };

    // Drop the leading H1.
    const h1 = tree.children.findIndex((n) => n.type === "heading" && n.depth === 1);
    if (h1 !== -1) tree.children.splice(h1, 1);

    // The screenplay typeface marks a prompt, so it needs no label; Copy sits at its right.
    const promptBox = (inner, raw, cls = "prompt") =>
      `<div class="${cls}" aria-label="${escape(ui.prompt)}"><p class="line" data-copy="${escape(raw)}">${inner}</p>` +
      `<button class="copy" type="button">${escape(ui.copy)}</button></div>`;

    // Ladders. Each step holds a prompt and an image; the explanation is ordinary prose after the ladder.
    const ladders = [];
    visit(tree, "containerDirective", (node, index, parent) => {
      if (node.name !== "ladder") return;
      ladders.push({ node, index, parent });
      return SKIP;
    });
    for (const { node, index, parent } of ladders) {
      const steps = node.children.filter((c) => c.type === "containerDirective" && c.name === "step");
      const thumbs = [];
      const frames = [];
      const prompts = [];
      let source = "";
      let previous = "";
      for (const [i, step] of steps.entries()) {
        const label = escape(step.attributes?.label ?? String(i));
        const number = String(i).padStart(2, "0");
        const image = step.children.map(soleImage).findLast(Boolean);
        const prompt = step.children.find((c) => c.type === "code" && c.lang === "prompt")?.value.trim() ?? "";
        let thumb = "";
        if (image) {
          const { m, html } = await tag(image.url, image.alt ?? "", i === 0 ? "on" : "");
          frames.push(html);
          thumb = `<img src="${m.src}" alt=""${m.width ? ` width="${m.width}" height="${m.height}"` : ""}>`;
          source ||= m.source;
        }
        prompts.push(promptBox(i === 0 ? escape(prompt) : diffWords(previous, prompt), prompt, i === 0 ? "prompt on" : "prompt"));
        previous = prompt;
        thumbs.push(
          `<button type="button" role="tab" aria-selected="${i === 0}">${thumb}<span>${number} ${label}</span></button>`,
        );
      }
      parent.children[index] = {
        type: "html",
        value:
          `<section class="ladder"><div class="stage"><figure>` +
          `<div class="frames" role="button" tabindex="0" aria-label="${escape(ui.next)}">${frames.join("")}` +
          `<button type="button" class="arrow prev" aria-label="${escape(ui.previous)}">‹</button>` +
          `<button type="button" class="arrow next" aria-label="${escape(ui.next)}">›</button></div>` +
          `<div class="prompts" aria-live="polite">${prompts.join("")}</div>` +
          `<div class="strip"><div class="thumbs" role="tablist">${thumbs.join("")}</div>` +
          `<div class="meta"><button type="button" class="play" data-play="${escape(ui.play)}" data-stop="${escape(ui.stop)}">${escape(ui.play)}</button>` +
          `<span>${escape(source)}</span></div></div></figure></div></section>`,
      };
    }

    // Prompts outside ladders.
    visit(tree, "code", (node, index, parent) => {
      if (node.lang !== "prompt") return;
      const raw = node.value.trim();
      parent.children[index] = { type: "html", value: promptBox(escape(raw), raw) };
    });

    // :goto[00 Default]{step=0} switches the nearest ladder above to that step.
    visit(tree, "textDirective", (node) => {
      if (node.name !== "goto") return;
      node.data = { hName: "button", hProperties: { type: "button", className: ["goto"], dataStep: node.attributes?.step ?? "0" } };
    });

    // Standalone images and videos.
    const figures = [];
    visit(tree, "paragraph", (node, index, parent) => {
      const image = soleImage(node);
      if (image) figures.push({ image, index, parent });
    });
    for (const { image, index, parent } of figures) {
      const { m, html } = await tag(image.url, image.alt ?? "");
      parent.children[index] = {
        type: "html",
        value:
          `<div class="stage"><figure>${html}` +
          `<figcaption><span>${escape(image.alt ?? "")}</span><span>${escape(m.source)}</span></figcaption></figure></div>`,
      };
    }
  };
}
