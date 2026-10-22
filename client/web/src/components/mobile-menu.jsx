"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  categoryHref,
  getSubCategories,
  subCategoryHref,
  subCategoryLabel,
} from "@/components/category-mega-menu";

const rowClass =
  "flex w-full items-center justify-between py-4 text-left text-[15px] font-semibold tracking-[0.06em] text-neutral-900 transition-colors hover:text-neutral-600";

const STAGGER_START = 120; // ms, after the panel has started moving
const STAGGER_STEP = 45; // ms between rows
const staggerClass =
  "animate-in fade-in-0 slide-in-from-left-3 fill-mode-both duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:animate-none";

function Collapse({ open, children }) {
  return (
    <div
      className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

function ProductsAccordion({ categories, onNavigate }) {
  const [open, setOpen] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState(null);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className={rowClass}
      >
        Products
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <Collapse open={open}>
        <ul className="pb-3 pl-3">
          {categories.map((category) => {
            const subs = getSubCategories(category);
            const isOpen = String(openCategoryId) === String(category.id);

            return (
              <li key={category.id} className="border-l border-neutral-200">
                <div className="flex items-center justify-between">
                  <Link
                    href={categoryHref(category)}
                    onClick={onNavigate}
                    className="flex-1 py-3 pl-4 text-[15px] font-medium text-neutral-800 transition-colors hover:text-black"
                  >
                    {category.title}
                  </Link>

                  {subs.length > 0 && (
                    <button
                      type="button"
                      aria-label={`Toggle ${category.title}`}
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenCategoryId(isOpen ? null : category.id)
                      }
                      className="flex h-10 w-10 items-center justify-center text-neutral-500"
                    >
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {subs.length > 0 && (
                  <Collapse open={isOpen}>
                    <ul className="space-y-3 pb-3 pl-8">
                      {subs.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            href={subCategoryHref(category, sub)}
                            onClick={onNavigate}
                            className="block text-[14px] text-neutral-500 transition-colors hover:text-neutral-900"
                          >
                            {subCategoryLabel(sub)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Collapse>
                )}
              </li>
            );
          })}
        </ul>
      </Collapse>
    </div>
  );
}

export default function MobileMenu({ categories = [], links = [] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the sheet on route change (state adjusted during render, no effect).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-900 transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 lg:hidden"
      >
        <Menu className="h-6 w-6" strokeWidth={1.75} />
      </SheetTrigger>

      <SheetContent
        side="left"
        // Full-width slide from the edge (not a short nudge + fade). Opening
        // decelerates in; closing is quicker and accelerates out.
        className="flex w-[88vw] max-w-sm flex-col border-neutral-200 bg-white p-0 text-neutral-900 duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] data-starting-style:opacity-100 data-ending-style:opacity-100 data-ending-style:duration-300 data-ending-style:ease-[cubic-bezier(0.7,0,0.84,0)] data-[side=left]:data-starting-style:-translate-x-full data-[side=left]:data-ending-style:-translate-x-full motion-reduce:transition-none"
        overlayClassName="bg-black/30 duration-500 ease-out data-ending-style:duration-300"
      >
        <SheetHeader className="border-b border-neutral-200 px-6 py-4 text-left">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <Link href="/" onClick={close} aria-label="Home">
            <Image
              width={220}
              height={90}
              className="h-auto w-[120px] object-contain"
              src="/logo.png"
              alt="Natraj Office Furniture logo"
            />
          </Link>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto px-6 py-2">
          {/* Rows settle in one after another while the panel slides. */}
          <div className="divide-y divide-neutral-200">
            <div
              className={staggerClass}
              style={{ animationDelay: `${STAGGER_START}ms` }}
            >
              <ProductsAccordion categories={categories} onNavigate={close} />
            </div>

            {links.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={close}
                className={`${rowClass} ${staggerClass}`}
                style={{
                  animationDelay: `${STAGGER_START + (i + 1) * STAGGER_STEP}ms`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="border-t border-neutral-200 p-6">
          <Link
            href="/contact"
            onClick={close}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-neutral-800"
          >
            Get Inquiry
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
