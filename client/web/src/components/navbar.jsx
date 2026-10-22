"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Search, ShoppingBag } from "lucide-react";
import MobileMenu from "@/components/mobile-menu";
import CategoryMegaMenu from "@/components/category-mega-menu";
import { useCategories } from "@/hooks/use-categories";
import { useCart } from "@/hooks/use-cart";
import { buttonVariants } from "./ui/button";
import { sortCategoriesByPriority } from "@/lib/category-order";
import SearchBar from "./search-bar";
function IconBadge({ count }) {
  if (count === undefined || count === null) return null;

  return (
    <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-semibold leading-none text-white">
      {count}
    </span>
  );
}

function IconButton({ label, children, badge, className = "", onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-transparent p-0 text-current transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 ${className}`}
    >
      {badge !== undefined && <IconBadge count={badge} />}
      {children}
    </button>
  );
}

// Nav links shown after "Products"
const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Our Blogs", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },

];

const linkClass =
  "flex items-center gap-1.5 whitespace-nowrap text-[13px] font-semibold tracking-[0.08em] text-neutral-800 transition-colors hover:text-black xl:text-[15px] xl:tracking-[0.1em]";

export default function Navbar() {
  const pathname = usePathname();

  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();
  const { cartCount, toggleCart } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);

  // fetchCategories() already unwraps `{ status, data }`
// fetchCategories() already unwraps `{ status, data }`
const categories = sortCategoriesByPriority(categoriesData?.categories ?? []);
  const [productsOpen, setProductsOpen] = useState(false);
  const closeTimeoutRef = useRef(null);

  const cancelClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    cancelClose();
    setProductsOpen(true);
  }, [cancelClose]);

  const closeNow = useCallback(() => {
    cancelClose();
    setProductsOpen(false);
  }, [cancelClose]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimeoutRef.current = setTimeout(() => setProductsOpen(false), 150);
  }, [cancelClose]);

  // Close on route change (adjusting state during render avoids the extra
  // render an effect would cause). Any pending close timer just sets false.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setProductsOpen(false);
  }

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeNow();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeNow]);

  // Clear pending timer on unmount
  useEffect(() => cancelClose, [cancelClose]);

  return (
    <header
      onMouseLeave={scheduleClose}
      className="sticky  relative inset-x-0 top-0 z-[9999] w-full border-b border-neutral-200 bg-white text-neutral-900"
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1600px] items-center justify-between gap-4 px-5 md:h-[80px] md:px-10">
        {/* LEFT — hamburger (mobile/tablet) + logo */}
        <div className="flex shrink-0 items-center gap-3">

          <Link
            href="/"
            aria-label="Natraj Office Furniture home"
            className="flex shrink-0 items-center"
          >
            <Image
              width={220}
              height={90}
              className="h-auto w-[150px] object-contain md:w-[200px]"
              src="/logo.png"
              alt="Natraj Office Furniture logo"
              priority
            />
          </Link>
        </div>

        {/* RIGHT — nav links + CTA + icons */}
        <div className="flex min-w-0 items-center gap-4 xl:gap-8">
          <nav
            aria-label="Main"
            className="hidden items-center gap-5 lg:flex xl:gap-9"
          >
            {/* PRODUCTS — hover opens the mega menu */}
            <Link
              href="/shop"
              onMouseEnter={openMenu}
              onFocus={openMenu}
              aria-haspopup="true"
              aria-expanded={productsOpen}
              className={linkClass}
            >
              Products
              <ChevronDown
                aria-hidden="true"
                className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
                  productsOpen ? "rotate-180" : ""
                }`}
                strokeWidth={2.25}
              />
            </Link>

            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onMouseEnter={closeNow}
                className={linkClass}
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0"
                    strokeWidth={2.25}
                  />
                )}
              </Link>
            ))}
          </nav>

   <Link
  href="/contact"
  onMouseEnter={closeNow}
  className={buttonVariants({
    variant: "default",
    size: "default",
    className:
      "group !hidden bg-black py-5 text-white items-center gap-2.5 whitespace-nowrap text-[13px] font-semibold lg:!flex xl:text-[15px]",
  })}
>
  Get Inquiry

  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-700 text-white transition-transform duration-200 group-hover:translate-x-0.5">
    <ArrowRight
      aria-hidden="true"
      className="h-3.5 w-3.5"
      strokeWidth={2.25}
    />
  </span>
</Link>

          <div
            onMouseEnter={closeNow}
            className="flex items-center gap-1 text-neutral-900 md:gap-2   "
          >
         <IconButton label="Search" onClick={() => setSearchOpen((v) => !v)}>
  <Search aria-hidden="true" className="h-5 w-5 shrink-0" strokeWidth={1.8} />
</IconButton>

            <IconButton
              label="Cart"
              badge={cartCount > 0 ? cartCount : undefined}
              onClick={toggleCart}
            >
              <ShoppingBag
                aria-hidden="true"
                className="h-5 w-5 shrink-0"
                strokeWidth={1.8}
              />
            </IconButton>
          </div>

                    <MobileMenu categories={categories} links={navLinks} />

        </div>
      </div>

      {/* MEGA MENU — all categories + sub-categories (desktop) */}
      {/* Always mounted so both opening and closing can animate. */}
      <CategoryMegaMenu
        open={productsOpen}
        categories={categories}
        loading={categoriesLoading}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        onNavigate={closeNow}
      />

      <SearchBar
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        categories={categories}
      />
    </header>
  );
}





















