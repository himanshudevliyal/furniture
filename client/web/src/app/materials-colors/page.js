import Image from "next/image";
import { ChevronDown, Download } from "lucide-react";

import { BreadcrumbBanner } from "@/components/breadcrumb";
import Heading from "@/components/layout/heading";
import { Section } from "@/components/layout/section";
import { materialGroups, SWATCH_PDF } from "@/lib/materials";
import { absoluteFileUrl } from "@/lib/site";

export const metadata = {
  title: "Materials & Colors",
  description:
    "Melamine, metal and fabric finishes available on Natraj Office Furniture workstations, desks, storage and seating.",
  alternates: { canonical: "/materials-colors" },
};

export default function MaterialsColorsPage() {
  return (
    <>
      <BreadcrumbBanner
        backgroundImage="/img/materials-page/materials.webp"
        title="Materials & Colors"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Materials & Colors", href: "/materials-colors" },
        ]}
      />

      <Section className="bg-white">
        <Heading
          eyebrow="FINISHES"
          heading="Materials & Colors"
          subheading="Choose the finish for your workspace. Every shade below is available across our workstations, desks, storage and panels."
          eyebrowClassName="justify-center"
          className="mx-auto max-w-4xl text-center"
        />

        <div className="mt-6 flex justify-center">
          <a
            href={absoluteFileUrl(SWATCH_PDF)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-[#E87717] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#C9620E]"
          >
            <Download className="h-4 w-4" aria-hidden />
            Download Color Swatch (PDF)
          </a>
        </div>

        {/* Each finish group is a collapsible dropdown; the first starts open */}
        {materialGroups.map((group, index) => (
          <details key={group.key} open={index === 0} className="group/acc mt-10 first-of-type:mt-14">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 border-b border-neutral-200 pb-3 [&::-webkit-details-marker]:hidden">
              <div>
                <h2 className="text-2xl font-medium text-neutral-900">{group.heading}</h2>
                <p className="mt-1 text-sm text-neutral-500">{group.text}</p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition-colors group-hover/acc:border-[#E87717] group-hover/acc:text-[#E87717]">
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open/acc:rotate-180" aria-hidden />
              </span>
            </summary>

            <ul className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {group.items.map((item) => (
                <li key={item.image}>
                  {/* Thumbnail in the grid; click opens the full-size swatch */}
                  <a
                    href={item.full}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-square overflow-hidden rounded-sm ring-1 ring-neutral-200"
                  >
                    <Image
                      src={item.image}
                      alt={`${item.title} ${group.heading}`}
                      fill
                      sizes="(min-width: 1024px) 12vw, (min-width: 640px) 20vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </a>
                  <p className="mt-2 text-xs leading-snug text-neutral-700 sm:text-sm">
                    {item.title}
                  </p>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </Section>
    </>
  );
}
