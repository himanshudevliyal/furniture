"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { WHATSAPP_URL, WhatsappIcon } from "@/components/cta";

// Call-to-action band shown on every page, right above the footer.
export default function FooterCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#b8050f] via-[#e30613] to-[#c4050f] text-white">
      {/* Decorative rings */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[40px] border-white/[0.07]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full border-[32px] border-white/[0.05]"
      />

      <div className="relative mx-auto flex max-w-[1600px] flex-col items-start gap-5 px-6 py-8 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-9">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
            Let&apos;s plan your workspace
          </p>
          <h2 className="mt-1.5 text-2xl font-semibold leading-tight sm:text-3xl">
            Discuss Your Office Furniture Requirements
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-white/85 sm:text-base">
            Share the product range, layout information and applicable finish
            needs.
          </p>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-semibold text-[#e30613] shadow-lg shadow-black/10 transition-all hover:bg-neutral-100"
          >
            Contact Us
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#e30613]"
          >
            <WhatsappIcon className="h-4 w-4" />
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
