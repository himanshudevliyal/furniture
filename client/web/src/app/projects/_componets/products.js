"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { ArrowDown, Expand } from "lucide-react";

import { Section } from "@/components/layout/section";
import Heading from "@/components/layout/heading";

const ALL = "all";
const PAGE_SIZE = 24;

// `categories` comes from the server (lib/projects.js), one per folder in
// /public/img/projects.
export default function ProjectsGrid({ categories = [] }) {
  const [active, setActive] = useState(ALL);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // "All" interleaves categories (one photo from each in turn), so the first
  // screen shows every kind of space instead of only workstations.
  const allImages = useMemo(() => {
    const mixed = [];
    const longest = Math.max(0, ...categories.map((c) => c.images.length));
    for (let i = 0; i < longest; i++) {
      for (const c of categories) if (c.images[i]) mixed.push(c.images[i]);
    }
    return mixed;
  }, [categories]);

  const tabs = useMemo(
    () => [
      { slug: ALL, label: "All Projects", count: allImages.length },
      ...categories.map((c) => ({
        slug: c.slug,
        label: c.label,
        count: c.images.length,
      })),
    ],
    [categories, allImages.length],
  );

  const images =
    active === ALL
      ? allImages
      : (categories.find((c) => c.slug === active)?.images ?? []);
  const shown = images.slice(0, visibleCount);

  const selectTab = (slug) => {
    setActive(slug);
    setVisibleCount(PAGE_SIZE);
  };

  // Lightbox over whatever is currently shown (delegated, so it follows the
  // active tab and "load more" without rebinding).
  useEffect(() => {
    Fancybox.bind("[data-fancybox='projects']", {
      animated: true,
      showClass: "f-fadeIn",
      hideClass: "f-fadeOut",
      Thumbs: { autoStart: false },
    });
    return () => {
      Fancybox.unbind("[data-fancybox='projects']");
      Fancybox.close();
    };
  }, []);

  return (
    <Section className="bg-white">
      <Heading
        eyebrow="OUR WORK"
        heading="PROJECTS WE HAVE DELIVERED"
        subheading="A look at workspaces we have furnished — from open-plan workstations and executive cabins to meeting rooms, receptions and cafeterias."
        eyebrowClassName="justify-center"
        headingClassName="text-3xl sm:text-4xl lg:text-5xl"
        className="mx-auto max-w-4xl text-center"
      />

      {/* Category tabs — stay under the navbar while scrolling the grid */}
      <div className="sticky top-[68px] z-20 -mx-4 mt-10 bg-white/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/80 md:top-[80px] md:mx-0 md:px-0">
        <div
          role="tablist"
          aria-label="Project categories"
          className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] md:flex-wrap md:justify-center [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab) => {
            const selected = active === tab.slug;
            return (
              <button
                key={tab.slug}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="projects-panel"
                onClick={() => selectTab(tab.slug)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors duration-300 ${
                  selected
                    ? "bg-black text-white"
                    : "border border-gray-200 bg-white text-neutral-700 hover:border-neutral-900 hover:text-neutral-900"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs tabular-nums ${
                    selected ? "bg-white/20 text-white" : "bg-[#f4f0eb] text-neutral-700"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div id="projects-panel" role="tabpanel" className="mt-6">
        {shown.length === 0 ? (
          <p className="py-16 text-center text-neutral-600">
            No projects in this category yet.
          </p>
        ) : (
          <ul
            key={active}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            {shown.map((project, index) => (
              <li
                key={project.image}
                className="animate-in fade-in-0 slide-in-from-bottom-2 fill-mode-both duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:animate-none"
                style={{ animationDelay: `${(index % PAGE_SIZE) * 30}ms` }}
              >
                <a
                  href={project.image}
                  data-fancybox="projects"
                  data-caption={`${project.title} — ${project.subtitle}`}
                  aria-label={`View ${project.subtitle} photo ${index + 1}`}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-[20px] bg-neutral-100"
                >
                  <Image
                    src={project.image}
                    alt={`${project.subtitle} by Natraj Office Furniture`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-focus-visible:opacity-100 translate-y-2 group-hover:translate-y-0">
                    <span className="text-lg font-semibold text-white">
                      {project.title}
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-neutral-900">
                      <Expand className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Load more */}
        {images.length > visibleCount && (
          <div className="mt-10 flex flex-col items-center gap-3">
            <p className="text-sm text-neutral-600">
              Showing {shown.length} of {images.length}
            </p>
            <button
              type="button"
              onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
              className="group inline-flex items-center gap-3 rounded-md bg-black py-2.5 pl-5 pr-2.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-neutral-800"
            >
              Load More Projects
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-700 transition-transform duration-300 group-hover:translate-y-0.5">
                <ArrowDown className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
              </span>
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}
