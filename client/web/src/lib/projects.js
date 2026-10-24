import fs from "fs";
import path from "path";

// Project photos live in /public/img/projects/<category>/<category>-NN.jpg.
// Each folder is a category; the list is read at build time, so adding or
// removing photos only needs a rebuild — no code changes.

const PROJECTS_DIR = path.join(process.cwd(), "public", "img", "projects");

// Display order and labels. A new folder not listed here still shows up,
// after these, with a label made from its folder name.
const CATEGORY_META = {
  workstation: { label: "Workstations", subtitle: "Open-plan workstation project" },
  cabin: { label: "Cabins", subtitle: "Executive cabin project" },
  meeting: { label: "Meeting Rooms", subtitle: "Meeting & conference room project" },
  reception: { label: "Reception", subtitle: "Reception area project" },
  lounge: { label: "Lounge", subtitle: "Lounge & breakout area project" },
  cafeteria: { label: "Cafeteria", subtitle: "Cafeteria project" },
};

// Folders in /img/projects that are not project photos (client logos now
// live in /img/clients).
const EXCLUDED_FOLDERS = new Set([]);

const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;
const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

const titleCase = (s) =>
  s.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

let cache = null;

// [{ slug, label, images: [{ image, title, subtitle, category }] }]
export function getProjectCategories() {
  if (cache) return cache;

  let folders = [];
  try {
    folders = fs
      .readdirSync(PROJECTS_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !EXCLUDED_FOLDERS.has(d.name.toLowerCase()))
      .map((d) => d.name);
  } catch (error) {
    console.error("getProjectCategories: cannot read", PROJECTS_DIR, error);
    return [];
  }

  const order = Object.keys(CATEGORY_META);
  folders.sort((a, b) => {
    const ia = order.indexOf(a.toLowerCase());
    const ib = order.indexOf(b.toLowerCase());
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || collator.compare(a, b);
  });

  cache = folders
    .map((folder) => {
      const slug = folder.toLowerCase();
      const meta = CATEGORY_META[slug] ?? {
        label: titleCase(folder),
        subtitle: `${titleCase(folder)} project`,
      };
      const images = fs
        .readdirSync(path.join(PROJECTS_DIR, folder))
        .filter((f) => IMAGE_EXT.test(f))
        .sort(collator.compare)
        .map((file) => ({
          image: `/img/projects/${folder}/${file}`,
          title: meta.label,
          subtitle: meta.subtitle,
          category: slug,
        }));
      return { slug, label: meta.label, images };
    })
    .filter((c) => c.images.length > 0);

  return cache;
}

// A mixed selection for the homepage carousel: one photo from each category
// in turn, so every kind of space is represented.
export function getFeaturedProjects(limit = 10) {
  const categories = getProjectCategories();
  const picked = [];
  for (let i = 0; picked.length < limit; i++) {
    let added = false;
    for (const c of categories) {
      if (c.images[i] && picked.length < limit) {
        picked.push(c.images[i]);
        added = true;
      }
    }
    if (!added) break;
  }
  return picked;
}
