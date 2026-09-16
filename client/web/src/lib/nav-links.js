export const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/shop",
    // dropdown removed — plain link now
  },
  {
    label: "Categories",
    href: "/categories",
    children: [
      { label: "Outerwear", href: "/categories/outerwear" },
      { label: "Dresses", href: "/categories/dresses" },
      { label: "Accessories", href: "/categories/accessories" },
    ],
  },

  {
    label: "Men",
    href: "/men",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];