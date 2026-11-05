import { getCollection } from "astro:content";
import en from "../i18n/en.json";

const dictionaries = { en } as const;
export type Locale = keyof typeof dictionaries;
export const locales = Object.keys(dictionaries) as Locale[];

// UI strings, with {placeholders} filled in.
export function t(locale: Locale, key: keyof typeof en, vars: Record<string, string | number> = {}) {
  return dictionaries[locale][key].replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}

// A path under the site's base, e.g. url("en/") → "/studium/en/".
export function url(path = "") {
  return import.meta.env.BASE_URL.replace(/\/?$/, "/") + path.replace(/^\//, "");
}

// A planned lesson can live in another topic: `from: "hook/01-make-one-thing-pop"` reuses that lesson
// (each block opens with its Hook lesson). A topic marked `coming` isn't written yet.
type Planned = { slug: string; title: string; axis: string; from?: string };
type Topic = { id: string; title: string; lede: string; coming?: boolean; lessons: Planned[] };

export async function curriculum(locale: Locale) {
  const { topics } = (await import(`../../content/${locale}/curriculum.json`)).default as { topics: Topic[] };
  const written = await getCollection("lessons", (e) => e.id.startsWith(`${locale}/`));
  return topics.map((topic) => ({
    ...topic,
    lessons: topic.lessons.map((planned, i) => {
      const path = planned.from ?? `${topic.id}/${planned.slug}`;
      const entry = written.find((e) => e.id === `${locale}/${path}`);
      return { ...planned, number: i + 1, entry, href: entry ? url(`${locale}/${path}/`) : null };
    }),
  }));
}

export type CurriculumTopic = Awaited<ReturnType<typeof curriculum>>[number];
