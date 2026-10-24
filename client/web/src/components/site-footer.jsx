
"use client";


import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import { useCategories } from "@/hooks/use-categories";
import { sortCategoriesByPriority } from "@/lib/category-order";

import {
  categoryHref,
  getSubCategories,
  subCategoryHref,
  subCategoryLabel,
} from "@/components/category-mega-menu";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const phoneNumbers = ["+91 9810438876", "+91 9810418877"];

const addresses = [
  {
    label: "Display",
    text: "Plot No. C 40, DDA Sheds, Okhla Industrial Area, Phase 1, New Delhi 110020",
  },
  {
    label: "Works",
    text: "Plot No. A7, 12/6 Street 3, Gurukul Industrial Estate, Faridabad, Haryana 121003",
  },
];

const socialLinks = [
  { key: "facebook", label: "Facebook", href: "#", icon: FacebookIcon },
  { key: "dribbble", label: "Dribbble", href: "#", icon: DribbbleIcon },
  { key: "instagram", label: "Instagram", href: "#", icon: InstagramIcon },
  { key: "linkedin", label: "LinkedIn", href: "#", icon: LinkedinIcon },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Projects", href: "/projects" },
  { label: "Our Clients", href: "/clients" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

// ---------------------------------------------------------------------------
// Social Icons
// ---------------------------------------------------------------------------

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.52l.38-2.93h-2.9v-1.87c0-.85.24-1.43 1.46-1.43h1.56V4.63c-.27-.04-1.2-.12-2.27-.12-2.25 0-3.79 1.37-3.79 3.89v2.17H8.03v2.93h2.43V21h3.04z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.4"
        cy="6.6"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3.2 8.75h3.5V21H3.2V8.75zM9.5 8.75h3.36v1.68h.05c.47-.88 1.6-1.8 3.3-1.8 3.53 0 4.18 2.32 4.18 5.34V21h-3.5v-5.44c0-1.3-.02-2.97-1.81-2.97-1.82 0-2.1 1.42-2.1 2.88V21H9.5V8.75z" />
    </svg>
  );
}

function DribbbleIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72" />
      <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
      <path d="M21.75 12.84c-6.62-1.41-12.14-1.16-18.5.65" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Small Pieces
// ---------------------------------------------------------------------------

function FooterInlineLinks({ links, label, className = "" }) {
  return (
    <nav
      aria-label={label}
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}
    >
      {links.map((link, index) => (
        <span key={link.label} className="flex items-center gap-3">
          <a href={link.href} className="transition-colors hover:text-white">
            {link.label}
          </a>

          {index < links.length - 1 && (
            <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden />
          )}
        </span>
      ))}
    </nav>
  );
}

function ContactIcon({ children }) {
  return (
    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-black [&_svg]:h-3.5 [&_svg]:w-3.5">
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// All categories with their sub-categories
// ---------------------------------------------------------------------------

function FooterCategories() {
  const { data } = useCategories();
  const categories = sortCategoriesByPriority(data?.categories ?? []);

  if (!categories.length) return null;

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-6 border-b border-white/10 py-6 sm:grid-cols-4 xl:grid-flow-col xl:auto-cols-fr">
      {categories.map((category) => {
        const subs = getSubCategories(category);

        return (
          <div key={category.id}>
            <Link
              href={categoryHref(category)}
              className="block text-sm font-semibold leading-snug text-white transition-colors hover:text-white"
            >
              {category.title}
            </Link>

            {subs.length > 0 && (
              <ul className="mt-2.5 space-y-1">
                {subs.map((sub) => (
                  <li key={sub.id}>
                    <Link
                      href={subCategoryHref(category, sub)}
                      className="text-[13px] leading-snug text-white/65 transition-colors hover:text-white"
                    >
                      {subCategoryLabel(sub)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-black via-[#1c1c1c] to-[#4d4d4d] text-white">
      {/* Decorative diamond pattern, bottom-left */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 text-white/[0.04]"
        viewBox="0 0 200 200"
        fill="none"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <rect
            key={i}
            x={20 * i}
            y={20 * i}
            width={200 - 40 * i}
            height={200 - 40 * i}
            transform="rotate(45 100 100)"
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
      </svg>

      <div className="relative mx-auto max-w-[1600px] px-6 sm:px-10">

        {/* ---------------------------------------------------------------- */}
        {/* Top Bar — logo, contact details, social */}
        {/* ---------------------------------------------------------------- */}

        <div className="flex flex-col gap-6 border-b border-white/10 py-5 lg:flex-row lg:items-center lg:gap-10">

          <div className="flex shrink-0 items-center gap-3">
            <Image
              src="/logo-5.png"
              alt="Natraj Furniture"
              width={180}
              height={60}
              className="h-10 w-auto object-contain"
            />
          </div>

          <div className="hidden h-12 w-px shrink-0 bg-white/15 lg:block" />

          <div className="grid flex-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {/* Email */}
            <div className="flex items-start gap-3">
              <ContactIcon>
                <Mail className="h-4 w-4" aria-hidden />
              </ContactIcon>

              <div>
                <p className="text-sm font-semibold text-white">
                  E-mail Us
                </p>

                <a
                  href="mailto:sales@natrajfurniture.com"
                  className="break-all text-[13px] text-white/70 transition-colors hover:text-white"
                >
                  sales@natrajfurniture.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <ContactIcon>
                <Phone className="h-4 w-4" aria-hidden />
              </ContactIcon>

              <div>
                <p className="text-sm font-semibold text-white">
                  Contact Us
                </p>

                {phoneNumbers.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="flex min-h-6 items-center text-[13px] text-white/70 transition-colors hover:text-white"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>

            {/* Addresses */}
            {addresses.map((address) => (
              <div key={address.label} className="flex items-start gap-3">
                <ContactIcon>
                  <MapPin className="h-4 w-4" aria-hidden />
                </ContactIcon>

                <div>
                  <p className="text-sm font-semibold text-white">
                    {address.label}
                  </p>

                  <p className="text-[13px] leading-snug text-white/70">
                    {address.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {socialLinks.map(({ key, label, href, icon: Icon }) => (
              <a
                key={key}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-all hover:border-[#e30613] hover:bg-[#e30613] hover:text-white"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Categories */}
        {/* ---------------------------------------------------------------- */}

        <FooterCategories />

        {/* ---------------------------------------------------------------- */}
        {/* Bottom Bar — copyright | quick links | legal links */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid grid-cols-1 items-center gap-3 py-4 text-[13px] text-white/60 lg:grid-cols-[1fr_auto_1fr] lg:gap-6 md:pr-20">

          <p className="text-center lg:text-left">
            Copyright © {new Date().getFullYear()} Natraj Furniture.
            All Rights Reserved.
          </p>

          <FooterInlineLinks
            links={quickLinks}
            label="Quick links"
            className="justify-center"
          />

          <FooterInlineLinks
            links={legalLinks}
            label="Legal"
            className="justify-center lg:justify-end"
          />
        </div>
      </div>
    </footer>
  );
}
