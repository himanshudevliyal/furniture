"use client";

import { useState } from "react";
import { Asterisk, Building2, Mail, Phone, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const socialLinks = [
  { key: "facebook", label: "Facebook", href: "#", icon: FacebookIcon },
  { key: "dribbble", label: "Dribbble", href: "#", icon: DribbbleIcon },
  { key: "instagram", label: "Instagram", href: "#", icon: InstagramIcon },
  { key: "linkedin", label: "LinkedIn", href: "#", icon: LinkedinIcon },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Our Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
];

const services = [
  { label: "3D Visualization", href: "/services/3d-visualization" },
  { label: "Architectural Planning", href: "/services/architectural-planning" },
  {
    label: "Residential Interior Design",
    href: "/services/residential-interior",
  },
  {
    label: "Commercial Interior Design",
    href: "/services/commercial-interior",
  },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

// lucide-react doesn't ship brand glyphs — inline SVGs (fill="currentColor") for the 4 socials
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
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
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

// lucide-react has no Dribbble glyph either — same inline-SVG approach
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
// Small pieces
// ---------------------------------------------------------------------------

function FooterHeading({ children }) {
  return <h3 className="text-xl font-semibold text-white">{children}</h3>;
}

function FooterLinkList({ links }) {
  return (
    <ul className="mt-5 space-y-3.5">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className="group flex items-center gap-2.5 text-base text-white/70 transition-colors hover:text-white"
          >
            <Asterisk className="h-4 w-4 shrink-0 text-[#C9A165]" aria-hidden />
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export default function SiteFooter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // wire up to your newsletter provider / API route
    console.log("subscribe:", email);
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-[#0B0A08] text-white">
      {/* Decorative diamond pattern, bottom-left */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 text-white/[0.05]"
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
            transform={`rotate(45 100 100)`}
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
      </svg>

      <div className="relative mx-auto max-w-[1600px] px-6 sm:px-10">
        {/* Top bar */}
        <div className="flex flex-col gap-6 border-b border-white/10 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF7A] to-[#8A6B3F]">
              <Building2
                className="h-6 w-6 text-[#0B0A08]"
                strokeWidth={1.75}
                aria-hidden
              />
            </span>
            <span className="text-3xl font-semibold">Luxine</span>
          </div>

          <div className="hidden h-10 w-px bg-white/15 lg:block" />

          <p className="max-w-2xl text-base leading-relaxed text-white/70">
            Absolutely. We can incorporate your existing furniture, décor, and
            layout preferences into the new design to maintain continuity and
            budget efficiency.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ key, label, href, icon: Icon }) => (
              <a
                key={key}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white hover:text-[#0B0A08]"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        {/* Main columns */}
        <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Newsletter */}
          <div>
            <h3 className="text-[28px] font-semibold leading-snug text-white sm:text-3xl">
              Subscribe for Architecture &amp; Interior Updates
            </h3>
            <p className="mt-4 text-base leading-relaxed text-white/65">
              Absolutely. We can incorporate your existing furniture, décor, and
              layout preferences into the new design
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-6 flex items-center justify-between gap-3 border-b border-white/25 pb-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address*"
                className="w-full bg-transparent text-base text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF7A] to-[#8A6B3F] text-[#0B0A08] transition-transform hover:scale-105"
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <FooterLinkList links={quickLinks} />
          </div>

          {/* Our Services */}
          <div>
            <FooterHeading>Our Services</FooterHeading>
            <FooterLinkList links={services} />
          </div>

          {/* Get In Touch */}
          <div>
            <FooterHeading>Get In Touch</FooterHeading>
            <div className="mt-5 space-y-5">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF7A] to-[#8A6B3F]">
                  <Mail className="h-4 w-4 text-[#0B0A08]" aria-hidden />
                </span>
                <div>
                  <p className="text-base font-semibold text-white">
                    E-mail Us
                  </p>
                  <a
                    href="mailto:info@domainname.com"
                    className="text-base text-white/70 transition-colors hover:text-white"
                  >
                    info@domainname.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF7A] to-[#8A6B3F]">
                  <Phone className="h-4 w-4 text-[#0B0A08]" aria-hidden />
                </span>
                <div>
                  <p className="text-base font-semibold text-white">
                    Urgent Inquiries
                  </p>
                  <a
                    href="tel:+123456789"
                    className="text-base text-white/70 transition-colors hover:text-white"
                  >
                    +(123)456-789
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-4 border-t border-white/10 py-6 text-base text-white/60 sm:flex-row sm:justify-between">
          <p>Copyright © {new Date().getFullYear()} All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            {legalLinks.map((link, index) => (
              <span key={link.label} className="flex items-center gap-3">
                <a
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </a>
                {index < legalLinks.length - 1 && (
                  <span
                    className="h-1 w-1 rounded-full bg-[#C9A165]"
                    aria-hidden
                  />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
