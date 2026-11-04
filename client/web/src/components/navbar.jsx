"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronDown, Search, ShoppingBag } from "lucide-react";
import MobileMenu from "@/components/mobile-menu";
import CategoryMegaMenu from "@/components/category-mega-menu";
import { useCategories } from "@/hooks/use-categories";
import { useCart } from "@/hooks/use-cart";
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
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Workshop", href: "/workshop" },
      { label: "Showroom", href: "/showroom" },
      { label: "Quality", href: "/quality" },
    ],
  },
  { label: "Cases", href: "/cases" },
  {
    label: "Inspiration",
    href: "/materials-colors",
    children: [
      { label: "Materials & Colors", href: "/materials-colors" },
      { label: "Blogs", href: "/blog" },
      { label: "Resources", href: "/resources" },
    ],
  },
  { label: "Our Clients", href: "/clients" },
  { label: "Contact Us", href: "/contact" },

];

const linkClass =
  "flex items-center gap-1 whitespace-nowrap text-[14px] font-light text-neutral-700 transition-colors hover:text-black";

export default function Navbar() {
  const pathname = usePathname();
  const onBooking = pathname === "/book-your-slot";

  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();
  const { cartCount, toggleCart } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);

  // fetchCategories() already unwraps `{ status, data }`
// fetchCategories() already unwraps `{ status, data }`
  const categories = categoriesData?.categories ?? [];
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
      <div className="mx-auto flex h-[58px] w-full max-w-[1600px] items-center justify-between gap-4 px-5 md:h-[62px] md:px-10">
        {/* LEFT — hamburger (mobile/tablet) + logo */}
        <div className="flex shrink-0 items-center gap-3">

          <Link
            href="/"
            aria-label="Natraj Office Furniture home"
            className="flex shrink-0 items-center"
          >
            <Image
              width={1200}
              height={363}
              className="h-auto w-[125px] object-contain md:w-[145px]"
              src="/logo-natraj.png"
              alt="Natraj Office Furniture logo"
              priority
            />
          </Link>
        </div>

        {/* RIGHT — nav links + CTA + icons */}
        <div className="flex min-w-0 items-center gap-4 xl:gap-8">
          <nav
            aria-label="Main"
            className="hidden items-center gap-5 lg:flex xl:gap-10"
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
                strokeWidth={1.5}
              />
            </Link>

            {navLinks.map((link) =>
              link.children ? (
                // Small hover dropdown (CSS only)
                <div
                  key={link.label}
                  onMouseEnter={closeNow}
                  className="group/dd relative flex h-full items-center"
                >
                  <Link href={link.href} aria-haspopup="true" className={linkClass}>
                    {link.label}
                    <ChevronDown
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/dd:rotate-180"
                      strokeWidth={1.5}
                    />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover/dd:visible group-hover/dd:opacity-100 group-focus-within/dd:visible group-focus-within/dd:opacity-100">
                    <ul className="min-w-[200px] border border-neutral-200 bg-white py-2 shadow-lg">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block whitespace-nowrap px-5 py-2.5 text-[14px] text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-[#E87717]"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={closeNow}
                  className={linkClass}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          {/* Book Your Slot: outlined pill; orange fills in from the left on
              hover, presses in on click, and stays filled on its own page. */}
          <Link
            href="/book-your-slot"
            onMouseEnter={closeNow}
            aria-current={onBooking ? "page" : undefined}
            className={`group relative !hidden h-9 items-center gap-2 whitespace-nowrap rounded-full border pl-4 pr-1 text-[13px] font-medium transition-[color,border-color,box-shadow,transform] duration-300 active:scale-95 lg:!flex ${
              onBooking
                ? "border-[#E87717] bg-[#E87717] text-white shadow-[0_4px_14px_rgba(232,119,23,0.35)]"
                : "border-[#E87717]/50 text-neutral-900 hover:border-[#E87717] hover:text-white hover:shadow-[0_4px_14px_rgba(232,119,23,0.35)] active:bg-[#C9620E]"
            }`}
          >
            {/* Fill is clipped by its own wrapper so the icon can jump out of the button. */}
            <span aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-full">
            <span
              className={`absolute inset-0 origin-left bg-[#E87717] transition-transform duration-300 ease-out group-active:bg-[#C9620E] ${
                onBooking ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
            </span>
            {/* Orange light running around the border (globals.css). */}
            {!onBooking && (
              <span aria-hidden="true" className="border-beam-wrap group-hover:opacity-0">
                <span className="border-beam" />
              </span>
            )}
            <span className="relative">Book Your Slot</span>
            <span
              className={`relative flex h-7 w-7 animate-cal-ring items-center justify-center rounded-full shadow-sm transition-colors duration-300 group-hover:[animation-duration:1.3s] motion-reduce:animate-none ${
                onBooking ? "bg-white text-[#E87717]" : "bg-[#E87717] text-white group-hover:bg-white group-hover:text-[#E87717]"
              }`}
            >
              <CalendarDays aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            </span>
          </Link>

          <div
            onMouseEnter={closeNow}
            className="flex items-center gap-1 text-neutral-900 md:gap-2   "
          >
         <IconButton label="Search" onClick={() => setSearchOpen((v) => !v)}>
  <Search aria-hidden="true" className="h-[19px] w-[19px] shrink-0" strokeWidth={1.5} />
</IconButton>

            <IconButton
              label="Cart"
              badge={cartCount > 0 ? cartCount : undefined}
              onClick={toggleCart}
            >
              <ShoppingBag
                aria-hidden="true"
                className="h-[19px] w-[19px] shrink-0"
                strokeWidth={1.5}
              />
            </IconButton>
          </div>

                    <MobileMenu
                      categories={categories}
                      links={navLinks}
                    />

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





















