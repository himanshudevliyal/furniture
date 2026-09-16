"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search, ShoppingBag } from "lucide-react";
import MobileMenu from "@/components/mobile-menu";
import CategoryMegaMenu from "@/components/category-mega-menu";
import Image from "next/image";
import { useCategories } from "@/hooks/use-categories";
import { useCart } from "@/hooks/use-cart";

function IconBadge({ count, isWhite }) {
  if (count === undefined || count === null) return null;

  return (
    <span
      className={`absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold leading-none ${
        isWhite ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {count}
    </span>
  );
}

function IconButton({
  label,
  children,
  badge,
  className = "",
  isWhite = false,
  onClick,
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`
        relative
        flex h-9 w-9 shrink-0
        items-center justify-center
        rounded-full
        bg-transparent
        p-0
        text-current
        transition-opacity
        hover:opacity-70
        focus:outline-none
        ${className}
      `}
    >
      {badge !== undefined && (
        <IconBadge count={badge} isWhite={isWhite} />
      )}

      {children}
    </button>
  );
}

// centered nav links
const centerLinks = [
  { label: "ABOUT US", href: "/about" },
  { label: "WE ARE HIRING", href: "/careers" },
  { label: "RESOURCES", href: "/resources", hasDropdown: true },
  { label: "CONTACT US", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
  } = useCategories();

  // Cart
  const { cartCount, toggleCart } = useCart();

  // fetchCategories() already unwraps the outer
  // `{ status, data }` envelope in category-service.js
  const categories = categoriesData?.categories ?? [];

  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const closeTimeoutRef = useRef(null);

  // Close the sub-category panel whenever route changes
  useEffect(() => {
    setActiveCategoryId(null);
  }, [pathname]);

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const openCategory = (id) => {
    cancelClose();
    setActiveCategoryId(id);
  };

  const scheduleClose = () => {
    cancelClose();

    closeTimeoutRef.current = setTimeout(() => {
      setActiveCategoryId(null);
    }, 150);
  };

  const activeCategory = categories.find(
    (category) =>
      String(category.id) === String(activeCategoryId)
  );

  // Shop page keeps a plain white nav.
  // Every other page gets the dark glass nav.
  const isShopPage =
    pathname === "/shop" || pathname.startsWith("/shop/");

  const isWhiteNav = isShopPage;

  // Dark nav needs the light/white logo mark;
  // white shop nav needs the solid/dark logo mark.
  const logoSrc = isWhiteNav ? "/logo.png" : "/logo-5.png";

  return (
    <header
      onMouseLeave={scheduleClose}
      data-nav-theme={isWhiteNav ? "white" : "dark"}
      className={`site-header sticky inset-x-0 top-0 z-[9] flex flex-col transition-colors duration-300 ${
        isWhiteNav
          ? "border-b border-black/10 bg-white text-black shadow-sm"
          : "text-white"
      }`}
    >
      {/* ROW 1 — TOP UTILITY NAV */}
      <div className="mx-auto flex h-[72px] w-full max-w-[1600px] items-center justify-between px-5 md:h-[88px] md:px-10">

        {/* LEFT — menu icon + logo */}
        <div className="flex shrink-0 items-center gap-4">
          <MobileMenu />

          <Link
            href="/"
            aria-label="Natraj Office Furniture home"
            className="flex shrink-0 items-center"
          >
            <Image
              width={220}
              height={90}
              className="h-auto w-[120px] object-contain md:w-[150px]"
              src={logoSrc}
              alt="Natraj Office Furniture logo"
              priority
            />
          </Link>
        </div>

        {/* CENTER NAVIGATION */}
        <nav className="hidden items-center gap-6 lg:flex">
          {centerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-1 whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                isWhiteNav
                  ? "text-black/80 hover:text-black"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {link.label}

              {link.hasDropdown && (
                <ChevronDown
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0"
                  strokeWidth={2}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* RIGHT — get inquiry + icons */}
        <div className="flex shrink-0 items-center gap-3 md:gap-5">
          <Link
            href="/get-a-quote"
            className={`hidden shrink-0 items-center rounded-full border px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wide transition-colors lg:flex ${
              isWhiteNav
                ? "border-black bg-black text-white hover:bg-neutral-800"
                : "border-white bg-white text-black hover:bg-neutral-200"
            }`}
          >
            Get Inquiry
          </Link>

          <div
            className={`flex items-center gap-1 md:gap-2 ${
              isWhiteNav ? "text-black" : "text-white"
            }`}
          >
            {/* SEARCH */}
            <IconButton label="Search">
              <Search
                aria-hidden="true"
                className="h-5 w-5 shrink-0"
                strokeWidth={1.8}
              />
            </IconButton>

            {/* CART */}
            <IconButton
              label="Cart"
              badge={cartCount > 0 ? cartCount : undefined}
              isWhite={isWhiteNav}
              onClick={toggleCart}
            >
              <ShoppingBag
                aria-hidden="true"
                className="h-5 w-5 shrink-0"
                strokeWidth={1.8}
              />
            </IconButton>
          </div>
        </div>
      </div>

      {/* ROW 2 — CATEGORY NAV */}
      <div
        className={`hidden border-t lg:block ${
          isWhiteNav
            ? "border-black/10 bg-neutral-50"
            : "border-white/10 bg-black/25"
        }`}
      >
        <nav
          aria-label="Categories"
          className="mx-auto flex max-w-[1600px] items-center justify-center gap-10 px-5 py-3 md:px-10"
        >
          {categoriesLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`h-3 w-16 animate-pulse rounded ${
                  isWhiteNav ? "bg-black/10" : "bg-white/20"
                }`}
              />
            ))}

          {!categoriesLoading &&
            categories.map((category) => {
              const isActive =
                String(category.id) === String(activeCategoryId);

              const categorySlug =
                category.slug ?? category.id;

              return (
                <Link
                  key={category.id}
                  href={`/categories/${categorySlug}`}
                  onMouseEnter={() =>
                    openCategory(category.id)
                  }
                  className={`whitespace-nowrap text-[13px] font-bold uppercase tracking-[0.12em] transition-colors ${
                    isWhiteNav
                      ? isActive
                        ? "text-black"
                        : "text-black/70 hover:text-black"
                      : isActive
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {category.title}
                </Link>
              );
            })}
        </nav>
      </div>

      {/* SUB-CATEGORY PANEL */}
      {activeCategory && (
        <CategoryMegaMenu
          category={activeCategory}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        />
      )}

      <style jsx>{`
        .site-header[data-nav-theme="dark"] {
          background: rgba(10, 10, 10, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
      `}</style>
    </header>
  );
}