import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Lessons live in content/<locale>/<topic>/<slug>/index.md; the id is "<locale>/<topic>/<slug>".
const lessons = defineCollection({
  loader: glob({
    base: "./content",
    pattern: "**/index.md",
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    topic: z.string(),
    order: z.number(),
    technique: z.array(z.string()),
    references: z.array(z.record(z.string())).default([]),
    model: z.string(),
    minutes: z.number(),
    doorways: z.array(z.string()).default([]),
    status: z.enum(["draft", "published"]),
  }),
});

export const collections = { lessons };
