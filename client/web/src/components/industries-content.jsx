import Image from "next/image";
import Heading from "./layout/heading";

// Shared by the static (first paint) and animated (motion) versions of the
// "Industries We Serve" section. No motion code in this file.

// One photo per industry in /public/img/industries (CC0 / public domain,
// sources listed in /public/img/industries/SOURCES.md).
const img = (slug) => `/img/industries/${slug}.webp`;

const industryCards = [
  { title: "Pharmaceutical", image: img("pharmaceutical") },
  { title: "Information Technology", image: img("information-technology") },
  { title: "Marketing & Advertising", image: img("marketing-advertising") },
  { title: "Textile", image: img("textile") },
  { title: "Banking & Finance", image: img("banking-finance") },
  // No suitable free photo found yet — keeps the earlier image.
  { title: "Gems and Jewellery", image: "/demo/imgi_16_h2-cate06.jpg" },
  { title: "Insurance", image: img("insurance") },
  { title: "Architecture & Interior", image: img("architecture-interior") },
  { title: "Real Estate", image: img("real-estate") },
  { title: "Construction", image: img("construction") },
  { title: "Automobile", image: img("automobile") },
  { title: "Auto Components", image: img("auto-components") },
  { title: "FMCG", image: img("fmcg") },
  { title: "Retail & E-Commerce", image: img("retail-e-commerce") },
  { title: "Healthcare", image: img("healthcare") },
  { title: "Education", image: img("education") },
  { title: "Manufacturing", image: img("manufacturing") },
  { title: "Agriculture", image: img("agriculture") },
  { title: "Food & Beverages", image: img("food-beverages") },
  { title: "Roads & Highways", image: img("roads-highways") },
  { title: "Telecom", image: img("telecom") },
  { title: "Tourism & Hospitality", image: img("tourism-hospitality") },
  { title: "MSME", image: img("msme") },
  { title: "Media and Entertainment", image: img("media-entertainment") },
];

export const rowOne = industryCards.filter((_, i) => i % 2 === 0);
export const rowTwo = industryCards.filter((_, i) => i % 2 === 1);

export const marqueeMask =
  "[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]";

// Card — same visual language as the other image cards (overlay + bold title)
export function IndustryCard({ title, image }) {
  return (
    <div className="relative h-56 w-72 shrink-0 overflow-hidden rounded-[20px] ">
      <Image
        src={image}
        alt={`${title} industry`}
        fill
        sizes="288px"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="text-lg font-semibold leading-snug text-white">
          {title}
        </h3>
      </div>
    </div>
  );
}

export function IndustriesShell({ children }) {
  return (
    <section
      aria-label="Industries we serve"
      className="w-full bg-[#F7F4EF] py-16 sm:py-20"
    >
      <Heading
        heading="Industries We Serve"
        eyebrow="Industries"
        subheading="Trusted across sectors — built for the way each industry actually works."
        eyebrowClassName="justify-center"
        headingClassName="text-3xl sm:text-4xl lg:text-5xl"
        className="mx-auto max-w-5xl text-center"
      />
      {children}
    </section>
  );
}

// Static rows rendered before the animated marquee loads. Same card sizes and
// row spacing, so swapping to the animated version doesn't move anything.
export function IndustriesStatic() {
  return (
    <IndustriesShell>
      <div className={`mt-12 ${marqueeMask}`}>
        {[rowOne, rowTwo].map((row, r) => (
          <div
            key={r}
            className={`flex gap-4 overflow-hidden py-2 ${r ? "mt-4" : ""}`}
          >
            {row.map((card) => (
              <IndustryCard key={card.title} {...card} />
            ))}
          </div>
        ))}
      </div>
    </IndustriesShell>
  );
}
