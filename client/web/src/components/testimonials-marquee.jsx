"use client";

import { Quote } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { Section } from "./layout/section";

// ---------------------------------------------------------------------------
// Data — replace anytime
// ---------------------------------------------------------------------------

const AVATAR_COLORS = [
  "bg-neutral-200 text-neutral-700",
  "bg-stone-200 text-stone-700",
  "bg-zinc-200 text-zinc-700",
  "bg-neutral-300 text-neutral-800",
];

function initialsOf(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const columnOne = [
  {
    name: "Daniel Kim",
    role: "Founder, ScaleLabs Education",
    quote:
      "Our enrollment process used to require manual follow-ups and spreadsheet tracking. Now, AI handles lead qualification, scheduling, reminders, and CRM updates automatically. We've increased enrollment conversion by 35% in just one quarter.",
  },
  {
    name: "Alex Johnson",
    role: "Head of Operations, Finovate Consulting",
    quote:
      "Security and compliance were major concerns for us. They designed an automation architecture that was not only efficient but enterprise-grade secure.",
  },
];

const columnTwo = [
  {
    name: "David Lee",
    role: "Founder, Atodio Studio",
    quote:
      "We were spending hours on repetitive tasks. Their automation system saved us 30+ hours per week and dramatically improved our sales performance.",
  },
  {
    name: "Sarah Mitchell",
    role: "COO, BrightPath SaaS",
    quote:
      "We struggled with inconsistent lead follow-ups and slow response times. Their AI automation blueprint gave us clarity first, then execution. We've increased demo bookings by 40% while reducing operational friction.",
  },
  {
    name: "Jonathan Reed",
    role: "Managing Director, Nexora Digital Agency",
    quote:
      "We were scaling fast but drowning in manual workflows. Their automation system connected our CRM, email marketing, and reporting into one intelligent flow.",
  },
];

const columnThree = [
  {
    name: "Michael Tran",
    role: "Founder & CEO, Skyline Realty Group",
    quote:
      "We reduced admin work by nearly 50% and doubled our qualified appointment bookings. The ROI was faster than we expected — and the system continues to scale with us.",
  },
  {
    name: "Laura Martinez",
    role: "CMO, Elevate Commerce Co.",
    quote:
      "Marketing automation always felt fragmented — too many tools, not enough cohesion. They unified everything into one intelligent ecosystem, all automated with precision.",
  },
];

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

function TestimonialCard({ name, role, quote }) {
  const colorIndex =
    name.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0) %
    AVATAR_COLORS.length;

  return (
    <div className="relative  shrink-0 rounded-2xl bg-neutral-100/80 p-5">
      <Quote
        className="absolute right-4 top-4 h-6 w-6 text-neutral-300"
        aria-hidden
      />

      <div className="flex items-center gap-3 pr-8">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ring-1 ring-black/5",
            AVATAR_COLORS[colorIndex],
          )}
          aria-hidden
        >
          {initialsOf(name)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-md font-semibold leading-tight text-neutral-900">
            {name}
          </p>
          <p className="truncate  text-neutral-500">{role}</p>
        </div>
      </div>

      <p className="mt-4  leading-relaxed text-neutral-600">{quote}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export default function TestimonialsMasonryMarquee() {
  return (
    <Section
      aria-labelledby="testimonials-heading"
      className="w-full bg-white "
    >
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-medium tracking-wide text-neutral-500">
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
          TESTIMONIAL
        </span>
        <h2
          id="testimonials-heading"
          className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl"
        >
          What They&rsquo;re Saying
        </h2>
      </div>

      <div className="relative mx-auto mt-12 grid  grid-cols-1 gap-2 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        <div className="h-[560px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
          <Marquee
            vertical
            pauseOnHover
            className="h-full [--duration:30s] [--gap:1rem]"
          >
            {columnOne.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </Marquee>
        </div>

        <div className="hidden h-[560px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] sm:block">
          <Marquee
            vertical
            reverse
            pauseOnHover
            className="h-full [--duration:34s] [--gap:1rem]"
          >
            {columnTwo.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </Marquee>
        </div>

        <div className="hidden h-[560px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] lg:block">
          <Marquee
            vertical
            pauseOnHover
            className="h-full [--duration:26s] [--gap:1rem]"
          >
            {columnThree.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </Marquee>
        </div>
      </div>
    </Section>
  );
}
