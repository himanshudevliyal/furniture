import Image from "next/image";
import Heading from "./layout/heading";

// Shared by the static (first paint) and animated (motion) versions of the
// "Industries We Serve" section. No motion code in this file.

const industries = [
  "Pharmaceutical",
  "Information Technology",
  "Marketing & Advertising",
  "Textile",
  "Banking & Finance",
  "Gems and Jewellery",
  "Insurance",
  "Architecture & Interior",
  "Real Estate",
  "Construction",
  "Automobile",
  "Auto Components",
  "FMCG",
  "Retail & E-Commerce",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Agriculture",
  "Food & Beverages",
  "Roads & Highways",
  "Telecom",
  "Tourism & Hospitality",
  "MSME",
  "Media and Entertainment",
];

// Existing images already in /public — reused cyclically, no new assets needed
const images = [
  "/img/corporate.jpg",
  "/img/hero.png",
  "/img/hospitality.jpg",
  "/img/residential.jpg",
  "/img/retail.jpg",
  "/demo/imgi_16_h2-cate06.jpg",
  "/demo/imgi_32_h2-brand03.jpg",
  "/demo/imgi_33_h2-brand04.jpg",
  "/demo/imgi_34_h2-brand05.jpg",
  "/demo/imgi_35_h2-brand06.jpg",
  "/demo/imgi_36_h2-brand01.jpg",
  "/demo/imgi_37_h2-brand02.jpg",
  "/demo/imgi_228_slider-2-banner-2.jpg",
];

const industryCards = industries.map((title, index) => ({
  title,
  image: images[index % images.length],
}));

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
