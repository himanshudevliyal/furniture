
const PRIORITY_ORDER = [
  "Workstations",
  "Seating",
  "Desk & Table",
  "Office Storage",
  "Office Partitions",
  "Soft Seating",
  "Office Furniture Accessories",
];
const LAST = "Custom Made";

const normalize = (title = "") => title.trim().toLowerCase();

export function sortCategoriesByPriority(categories = []) {
  const priorityIndex = new Map(
    PRIORITY_ORDER.map((title, i) => [normalize(title), i]),
  );

  const known = [];
  const unknown = [];
  let last = null;

  categories.forEach((category) => {
    const key = normalize(category.title);
    if (key === normalize(LAST)) {
      last = category;
    } else if (priorityIndex.has(key)) {
      known.push(category);
    } else {
      unknown.push(category);
    }
  });

  known.sort(
    (a, b) => priorityIndex.get(normalize(a.title)) - priorityIndex.get(normalize(b.title)),
  );

  return [...known, ...unknown, ...(last ? [last] : [])];
}