import { defineConfig } from "astro/config";
import remarkDirective from "remark-directive";
import remarkLesson from "./src/lib/remark-lesson.mjs";

// BASE is the path the site is served under, e.g. "/studium/" on GitHub Pages.
const base = process.env.BASE ?? "/";

export default defineConfig({
  base,
  trailingSlash: "always",
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  markdown: {
    remarkPlugins: [remarkDirective, [remarkLesson, { base }]],
  },
});
