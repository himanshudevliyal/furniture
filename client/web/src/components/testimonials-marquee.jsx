"use client";

import { Quote } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { Section } from "./layout/section";
import Heading from "./layout/heading";

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
    name: "Rahul Sharma",
    role: "Director, Corporate Office",
    quote:
      "Natraj Furniture helped us create a professional workspace with the right combination of workstations, seating, and storage. The quality and finish exceeded our expectations.",
  },
  {
    name: "Amit Mehta",
    role: "Founder, Business Solutions",
    quote:
      "We were looking for furniture that was both functional and elegant. The team understood our requirements and delivered a workspace that perfectly matched our vision.",
  },
];

const columnTwo = [
  {
    name: "Neha Kapoor",
    role: "Operations Head, Gurgaon",
    quote:
      "From selecting the right workstations to completing the office setup, the entire experience was smooth and professional. The furniture quality is excellent.",
  },
  {
    name: "Vikas Malhotra",
    role: "Managing Director, Delhi",
    quote:
      "The customized furniture solutions made a big difference to our office. Everything was designed around our space, requirements, and day-to-day workflow.",
  },
  {
    name: "Saurabh Jain",
    role: "Business Owner, Faridabad",
    quote:
      "We wanted a modern office with a clean and professional look. Natraj Furniture provided practical solutions with excellent finishing and attention to detail.",
  },
];

const columnThree = [
  {
    name: "Priya Verma",
    role: "HR & Administration Head",
    quote:
      "The seating and workstation solutions have made our office much more comfortable and organized. The team was responsive throughout the project.",
  },
  {
    name: "Rohit Agarwal",
    role: "Director, Commercial Workspace",
    quote:
      "What stood out was the balance of design, quality, and functionality. Natraj Furniture delivered exactly what our workspace needed.",
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
<Heading
  heading="What Our Clients Say"
  subheading="Hear from businesses and professionals who have transformed their workspaces with Natraj Furniture's quality, functionality, and customized furniture solutions."
  eyebrowClassName="justify-center"
  headingClassName="text-3xl sm:text-4xl lg:text-5xl"
  className="max-5-xl mx-auto text-center"
/>

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
