"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

import { navLinks } from "@/lib/nav-links";
import MobileMenu from "@/components/mobile-menu";

function IconBadge({ count, isWhite }) {
  if (count === undefined || count === null) return null;

  return (
    <span
      className={`absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold leading-none ${
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
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
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

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const staticWhitePages = [
    "/shop",
    "/about",
    "/contact",
    "/faq",
    "/privacy-policy",
    "/terms-and-conditions",
    "/shipping-policy",
    "/return-policy",
    "/refund-policy",
  ];

  const isShopPage =
    pathname === "/shop" || pathname.startsWith("/shop/");

  const isStaticWhitePage =
    staticWhitePages.includes(pathname);

  const isWhiteNav =
    isShopPage ||
    isStaticWhitePage ||
    isScrolled;

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        border-b
        transition-all duration-300
        ${
          isWhiteNav
            ? "border-black/10 bg-white text-black shadow-sm"
            : "border-white/25 bg-transparent text-white"
        }
      `}
    >
      <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 md:h-[96px] md:px-10">
        {/* LEFT */}
        <div className="flex items-center gap-6">
          <div className="shrink-0">
            <MobileMenu />
          </div>

          <Link
            href="/"
            aria-label="NURFIA home"
            className={`
              font-serif
              text-2xl
              font-semibold
              tracking-[0.08em]
              transition-colors
              md:text-3xl
              ${isWhiteNav ? "text-black" : "text-white"}
            `}
          >
            NURFIA
          </Link>
        </div>

        {/* CENTER NAVIGATION */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 lg:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`
                flex
                items-center
                gap-1
                whitespace-nowrap
                text-[13px]
                font-semibold
                uppercase
                tracking-[0.14em]
                transition-colors
                ${
                  isWhiteNav
                    ? "text-black/90 hover:text-black"
                    : "text-white/95 hover:text-white"
                }
              `}
            >
              {link.label}

              {link.children && (
                <ChevronDown
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0"
                  strokeWidth={2}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* RIGHT ICONS */}
        <div
          className={`
            flex
            items-center
            gap-1
            md:gap-2
            ${isWhiteNav ? "text-black" : "text-white"}
          `}
        >
          {/* DESKTOP SEARCH */}
          <IconButton
            label="Search"
            isWhite={isWhiteNav}
            className="hidden md:flex"
          >
            <Search
              aria-hidden="true"
              className="h-5 w-5 shrink-0"
              strokeWidth={1.8}
            />
          </IconButton>

          {/* MOBILE SEARCH */}
          <IconButton
            label="Search"
            isWhite={isWhiteNav}
            className="md:hidden"
          >
            <Search
              aria-hidden="true"
              className="h-5 w-5 shrink-0"
              strokeWidth={1.8}
            />
          </IconButton>
        </div>
      </div>
    </header>
  );
}