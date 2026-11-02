import Image from "next/image";
import { ChevronDown, Download } from "lucide-react";

import { BreadcrumbBanner } from "@/components/breadcrumb";
import Heading from "@/components/layout/heading";
import { Section } from "@/components/layout/section";
import { resourceGroups } from "@/lib/resources";
import { absoluteFileUrl } from "@/lib/site";

export const metadata = {
  title: "Resources",
  description:
    "Download Natraj Office Furniture catalogues, photo books, installation guides and the color swatch.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <BreadcrumbBanner
        backgroundImage="/img/banners/resources.webp"
        title="Resources"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
        ]}
      />

      <Section className="bg-white">
        <Heading
          eyebrow="DOWNLOADS"
          heading="Resources"
          subheading="Catalogues, photo books, installation guides and finishes, ready to download."
          eyebrowClassName="justify-center"
          className="mx-auto max-w-4xl text-center"
        />

        {/* Each group is a collapsible dropdown; the first starts open */}
        {resourceGroups.map((group, index) => (
          <details
            key={group.heading}
            open={index === 0}
            className="group/acc mt-10 first-of-type:mt-14"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 border-b border-neutral-200 pb-3 [&::-webkit-details-marker]:hidden">
              <h2 className="text-2xl font-medium text-neutral-900">
                {group.heading}
                <span className="ml-2 text-base font-normal text-neutral-400">
                  ({group.items.length})
                </span>
              </h2>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition-colors group-hover/acc:border-[#E87717] group-hover/acc:text-[#E87717]">
                <ChevronDown
                  className="h-4 w-4 transition-transform duration-300 group-open/acc:rotate-180"
                  aria-hidden
                />
              </span>
            </summary>

            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {group.items.map((item) => (
                <li key={item.file}>
                  <a
                    href={absoluteFileUrl(item.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#f4f4f4] ring-1 ring-neutral-200 transition-shadow duration-300 group-hover:shadow-lg">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute bottom-2 right-2 rounded-sm bg-[#E87717] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-white shadow">
                        PDF
                      </span>
                    </div>

                    <h3 className="mt-3 text-[15px] font-medium leading-snug text-neutral-900 transition-colors group-hover:text-[#E87717] sm:text-base">
                      {item.title}
                    </h3>
                    <span className="mt-1.5 flex items-center gap-1.5 text-sm text-neutral-500">
                      <Download
                        className="h-4 w-4 transition-colors group-hover:text-[#E87717]"
                        aria-hidden
                      />
                      Download
                      <span className="text-neutral-300">·</span>
                      {item.size}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </Section>
    </>
  );
}
