// Copies lesson media from content/<locale>/<topic>/<lesson>/media/ to public/media/<topic>/<lesson>/.
// Media is shared across locales; generation records (*.json) stay next to the sources.

import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const out = join(root, "public/media");
await rm(out, { recursive: true, force: true });

let copied = 0;
for (const locale of await readdir(join(root, "content"), { withFileTypes: true })) {
  if (!locale.isDirectory()) continue;
  for (const topic of await readdir(join(root, "content", locale.name), { withFileTypes: true })) {
    if (!topic.isDirectory()) continue;
    for (const lesson of await readdir(join(root, "content", locale.name, topic.name), { withFileTypes: true })) {
      const src = join(root, "content", locale.name, topic.name, lesson.name, "media");
      const files = await readdir(src).catch(() => []);
      const dest = join(out, topic.name, lesson.name);
      await mkdir(dest, { recursive: true });
      for (const file of files) {
        if (file.endsWith(".json")) continue;
        await cp(join(src, file), join(dest, file));
        copied++;
      }
    }
  }
}
console.log(`media: copied ${copied} files to public/media`);
