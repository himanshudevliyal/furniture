"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";

import { navLinks } from "@/lib/nav-links";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";

function MobileNavItem({ link }) {
  const [open, setOpen] = useState(false);
  const hasChildren = Boolean(link.children?.length);

  if (!hasChildren) {
    return (
      <Link
        href={link.href}
        className="block py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white/90 transition-colors hover:text-white"
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div>
      <Button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white/90 transition-colors hover:text-white"
      >
        {link.label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </Button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <ul className="space-y-3 pb-4 pl-4">
            {link.children.map((child) => (
              <li key={child.label}>
                <Link
                  href={child.href}
                  className="text-sm tracking-wide text-white/70 transition-colors hover:text-white"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          type="button"
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center text-white transition-opacity hover:opacity-80"
        >
          <Menu className="h-5 w-5" strokeWidth={1.75} />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0">
        <SheetHeader className="border-b border-white/10">
          <SheetTitle className="text-white">NURFIA</SheetTitle>
        </SheetHeader>
        <nav className="flex-1 overflow-y-auto px-6 py-2">
          {navLinks.map((link, index) => (
            <div key={link.label}>
              <MobileNavItem link={link} />
              {index < navLinks.length - 1 && (
                <Separator className="bg-white/10" />
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
