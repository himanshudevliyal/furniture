import { MapPin } from "lucide-react";

import { BreadcrumbBanner } from "@/components/breadcrumb";
import Heading from "@/components/layout/heading";
import { Section } from "@/components/layout/section";

export const metadata = {
  title: "Workshop",
  description:
    "Natraj Office Furniture manufactures workstations, desks and storage at its own works in Faridabad, Haryana.",
  alternates: { canonical: "/workshop" },
};

const WORKS = [
  {
    title: "Works",
    address: "Plot No. 7A, 12/6 Gurukul Industrial Estate, Faridabad, Haryana 121003",
  },
  {
    title: "Works 2",
    address: "Plot No. 92B, DLF Industrial Estate, Faridabad 121010",
  },
];

const STEPS = [
  {
    title: "Design & Planning",
    text: "Every order starts with a layout and specification agreed with you, from single desks to full floor plans.",
  },
  {
    title: "Panel Processing",
    text: "Boards are cut, edge-banded and drilled to size for desk tops, panels and storage units.",
  },
  {
    title: "Metal Fabrication",
    text: "Frames, legs, pedestals and steel storage are cut, formed, welded and powder-coated in-house.",
  },
  {
    title: "Assembly & Quality Check",
    text: "Components are fitted and checked against the drawing before packing.",
  },
  {
    title: "Delivery & Installation",
    text: "Our own team delivers and installs on site, then hands over a finished workspace.",
  },
];

export default function WorkshopPage() {
  return (
    <>
      <BreadcrumbBanner
        backgroundImage="/img/banners/workshop.webp"
        title="Workshop"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Workshop", href: "/workshop" },
        ]}
      />

      <Section className="bg-white">
        <Heading
          eyebrow="MANUFACTURING"
          heading="Made in Our Own Works"
          subheading="We build our furniture at our own works in Faridabad, so we control the material, the finish and the delivery date of every order."
          eyebrowClassName="justify-center"
          className="mx-auto max-w-4xl text-center"
        />

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <li key={step.title} className="rounded-sm border border-neutral-200 p-5">
              <span className="text-sm font-medium text-[#E87717]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-lg font-medium text-neutral-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-[#f4f0eb]">
        <h2 className="text-center text-2xl font-medium text-neutral-900 sm:text-3xl">
          Our Works
        </h2>
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
          {WORKS.map((works) => (
            <div key={works.title} className="flex gap-3 rounded-sm bg-white p-6 shadow-sm">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#E87717]" aria-hidden />
              <div>
                <p className="font-medium text-neutral-900">{works.title}</p>
                <p className="mt-1 text-sm text-neutral-600">{works.address}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
