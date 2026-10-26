"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  ChevronDown,
  ChevronRight,
  Download,
  FileArchive,
  FileText,
  Palette,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Heading from "@/components/layout/heading";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";
import { resolveFileUrl } from "@/utils/resolve-file-url";

// Materials, 3D models and downloads — shown below the gallery as a
// side menu + content panel instead of tabs. Brand red (#e30613) is kept
// to accents only: the active marker, icons and button hover.

function MaterialGroup({ section }) {
  const [open, setOpen] = useState(true);
  const items = section.items ?? [];

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      {section.heading && (
        <CollapsibleTrigger className="group/trigger flex w-full items-center justify-between border-b border-neutral-200 py-4 text-left">
          <span className="flex items-center gap-3">
            <span className="h-4 w-0.5 bg-[#e30613]" aria-hidden />
            <span className="text-lg font-medium text-neutral-900">
              {section.heading}
            </span>
            <span className="text-sm text-neutral-400">({items.length})</span>
          </span>
          <ChevronDown
            className={cn(
              "h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-300 group-hover/trigger:text-neutral-900",
              open && "rotate-180",
            )}
          />
        </CollapsibleTrigger>
      )}
      <CollapsibleContent>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 py-6 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {items.map((item, i) => {
            const src = resolveFileUrl(item.image);
            return (
              <div key={item.title || i} className="group flex flex-col gap-2.5">
                <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 ring-1 ring-neutral-200 transition-shadow duration-300 group-hover:shadow-md">
                  {src && (
                    <Image
                      src={src}
                      alt={item.title || "Material"}
                      fill
                      sizes="(min-width: 1024px) 140px, (min-width: 640px) 25vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <span className="text-sm leading-snug text-neutral-600 transition-colors group-hover:text-neutral-900">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function FileList({ files, icon: Icon, fallbackTitle }) {
  return (
    <ul className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
      {files.map((file, i) => (
        <li
          key={file.title || i}
          className="flex items-center gap-4 border border-neutral-200 p-4 transition-shadow duration-300 hover:shadow-md"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#f4f0eb]">
            <Icon className="h-5 w-5 text-[#e30613]" strokeWidth={1.6} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-medium text-neutral-900">
              {file.title || fallbackTitle}
            </p>
            {file.fileType && (
              <p className="mt-0.5 text-xs uppercase tracking-wide text-neutral-500">
                {file.fileType} file
              </p>
            )}
          </div>
          <a
            href={resolveFileUrl(file.file)}
            download
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Download ${file.title || fallbackTitle}`}
            className="inline-flex h-10 shrink-0 items-center gap-2 border border-neutral-900 px-4 text-sm font-medium text-neutral-900 transition-colors hover:border-[#e30613] hover:bg-[#e30613] hover:text-white"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function EmptyPanel({ icon: Icon, title, text }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-14 text-center lg:min-h-100">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f4f0eb]">
        <Icon className="h-7 w-7 text-[#e30613]" strokeWidth={1.5} />
      </div>
      <h3 className="mt-5 text-xl font-medium text-neutral-900">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-600 sm:text-base">
        {text}
      </p>
      <Link
        href="/contact"
        className="mt-6 inline-flex h-10 items-center gap-2 border border-neutral-900 px-5 text-sm font-medium text-neutral-900 transition-colors hover:border-[#e30613] hover:bg-[#e30613] hover:text-white"
      >
        Contact Us
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export default function CustomizationOptions({ product }) {
  const materialSections = (product?.materials?.sections ?? []).filter(
    (s) => s?.items?.length,
  );
  const models3d = product?.models_3d ?? [];
  const downloads = product?.downloads ?? [];

  // All three options always show; an empty one gets a friendly message.
  const panels = [
    {
      value: "materials",
      label: "Materials & Colors",
      icon: Palette,
      content: materialSections.length ? (
        materialSections.map((section, i) => (
          <MaterialGroup key={section.heading || i} section={section} />
        ))
      ) : (
        <EmptyPanel
          icon={Palette}
          title="Finishes available on request"
          text="Material and colour swatches for this product haven't been added yet. Our team can share the full range of laminates, metals and fabrics with you."
        />
      ),
    },
    {
      value: "3d-models",
      label: "3D Models",
      icon: Box,
      content: models3d.length ? (
        <FileList files={models3d} icon={FileArchive} fallbackTitle="3D Model" />
      ) : (
        <EmptyPanel
          icon={Box}
          title="3D models coming soon"
          text="3D files for this product aren't available for download yet. Need them for your layout? Ask us and we'll send them across."
        />
      ),
    },
    {
      value: "downloads",
      label: "Downloads",
      icon: Download,
      content: downloads.length ? (
        <FileList files={downloads} icon={FileText} fallbackTitle="Download" />
      ) : (
        <EmptyPanel
          icon={FileText}
          title="No downloads yet"
          text="Catalogues and spec sheets for this product will be added soon. Contact us and we'll email them to you."
        />
      ),
    },
  ];

  const [active, setActive] = useState(
    materialSections.length
      ? "materials"
      : models3d.length
        ? "3d-models"
        : downloads.length
          ? "downloads"
          : "materials",
  );

  const current = panels.find((p) => p.value === active) ?? panels[0];

  return (
    <Section className="bg-white">
      <Heading
        eyebrow="CUSTOMIZATION"
        heading="Customization Options"
        subheading="Choose from our range of finishes and download the resources for your project. Contact us to confirm availability."
        eyebrowClassName="text-[#e30613]"
        headingClassName="text-3xl sm:text-4xl lg:text-5xl"
        className="mx-auto mb-10 max-w-3xl text-center"
      />

      <div className="grid grid-cols-1 border border-neutral-200 bg-white lg:grid-cols-[320px_1fr]">
        {/* Menu */}
        <nav className="border-b border-neutral-200 bg-[#f4f0eb] lg:border-b-0 lg:border-r">
          <p className="hidden px-8 pb-5 pt-8 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 lg:block">
            Product Information
          </p>
          <div className="grid auto-cols-fr grid-flow-col lg:grid-flow-row">
            {panels.map(({ value, label, icon: Icon }) => {
              const isActive = value === current.value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setActive(value)}
                  aria-pressed={isActive}
                  className={cn(
                    "group relative flex flex-col items-center justify-center gap-1.5 px-2 py-4 text-center text-xs font-medium transition-colors duration-300",
                    "sm:text-sm lg:flex-row lg:justify-between lg:gap-3 lg:border-t lg:border-neutral-200 lg:px-8 lg:py-6 lg:text-left lg:text-base",
                    // Red marker: bottom edge on mobile, left edge on desktop.
                    "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-[#e30613] after:transition-opacity",
                    "lg:after:inset-x-auto lg:after:inset-y-0 lg:after:left-0 lg:after:h-auto lg:after:w-1",
                    isActive
                      ? "bg-white text-neutral-900 after:opacity-100"
                      : "text-neutral-600 after:opacity-0 hover:bg-white hover:text-neutral-900",
                  )}
                >
                  <span className="flex flex-col items-center gap-1.5 lg:flex-row lg:gap-3">
                    <Icon
                      className={cn(
                        "h-5 w-5 shrink-0 transition-colors",
                        isActive
                          ? "text-[#e30613]"
                          : "text-neutral-400 group-hover:text-neutral-700",
                      )}
                      strokeWidth={1.7}
                    />
                    {label}
                  </span>
                  <span
                    className={cn(
                      "hidden h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 lg:flex",
                      isActive
                        ? "bg-[#e30613] text-white"
                        : "border border-neutral-300 text-neutral-500 group-hover:translate-x-1",
                    )}
                  >
                    <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Panel */}
        <div
          key={current.value}
          className="animate-in fade-in px-5 py-4 duration-300 sm:px-8 lg:max-h-[560px] lg:overflow-y-auto lg:px-10 [scrollbar-color:#d4d4d4_transparent] [scrollbar-width:thin]"
        >
          {current.content}
        </div>
      </div>
    </Section>
  );
}
