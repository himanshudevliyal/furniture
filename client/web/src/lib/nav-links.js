export const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "New Arrivals", href: "/shop/new-arrivals" },
      { label: "Best Sellers", href: "/shop/best-sellers" },
      { label: "Sale", href: "/shop/sale" },
    ],
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
    label: "Women",
    href: "/women",
    children: [
      { label: "Ready-to-Wear", href: "/women/ready-to-wear" },
      { label: "Footwear", href: "/women/footwear" },
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
