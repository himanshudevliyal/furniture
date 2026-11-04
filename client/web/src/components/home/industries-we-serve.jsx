import Image from "next/image";
import Heading from "@/components/layout/heading";

// Homepage "Industries We Serve": a fixed grid of custom SVG line icons
// (no slider). Icons live in /public/img/industries/icons.
const INDUSTRIES = [
  ["Pharmaceutical", "pharmaceutical"],
  ["Information Technology", "information-technology"],
  ["Marketing & Advertising", "marketing-advertising"],
  ["Textile", "textile"],
  ["Banking & Finance", "banking-finance"],
  ["Architecture & Interior", "architecture-interior"],
  ["Real Estate", "real-estate"],
  ["Construction", "construction"],
  ["Automobile", "automobile"],
  ["Retail & E-Commerce", "retail-e-commerce"],
  ["Healthcare", "healthcare"],
  ["Education", "education"],
  ["Telecom", "telecom"],
  ["Tourism & Hospitality", "tourism-hospitality"],
  ["Media & Entertainment", "media-entertainment"],
];

export default function IndustriesWeServe() {
  return (
    <section aria-label="Industries we serve" className="w-full bg-[#f5f5f5] py-16 sm:py-20">
      <div className="container mx-auto max-w-6xl px-4 md:px-0">
        <Heading
          heading="Industries We Serve"
          eyebrow="Industries"
          subheading="Workspaces we have planned, built and installed across sectors."
          eyebrowClassName="justify-center"
          className="mx-auto max-w-3xl text-center"
        />

        {/* Hairline grid: 1px gaps over a border-coloured background. */}
        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 sm:grid-cols-3 md:grid-cols-5 lg:mt-14">
          {INDUSTRIES.map(([title, slug]) => (
            <li
              key={slug}
              className="group relative flex flex-col items-center justify-center bg-white px-3 py-8 text-center transition-colors duration-300 hover:bg-[#fffaf5] sm:py-10"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f5f5] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#E87717]/10">
                <Image
                  src={`/img/industries/icons/${slug}.svg`}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
              </span>
              <span className="mt-4 max-w-[150px] text-[13px] font-medium leading-snug text-neutral-700 transition-colors duration-300 group-hover:text-neutral-900 sm:text-sm">
                {title}
              </span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0.5 origin-center scale-x-0 bg-[#E87717] transition-transform duration-300 group-hover:scale-x-100"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
