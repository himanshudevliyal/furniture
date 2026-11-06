import Image from "next/image";

import { BreadcrumbBanner } from "@/components/breadcrumb";
import { LocationCards, LocationsMap } from "@/components/locations";
import Heading from "@/components/layout/heading";
import { Section } from "@/components/layout/section";

export const metadata = {
  title: "Showroom",
  description:
    "Visit the Natraj Office Furniture Experience Centre in Okhla Industrial Estate, New Delhi, and see our workstations, seating and storage in person.",
  alternates: { canonical: "/showroom" },
};

const PHOTOS = [
  { src: "/img/showroom/showroom-entrance.webp", alt: "Natraj Experience Centre entrance and reception" },
  { src: "/img/showroom/showroom-workstations.webp", alt: "Workstation display at the Natraj Experience Centre" },
];

export default function ShowroomPage() {
  return (
    <>
      <BreadcrumbBanner
        backgroundImage="/img/showroom/showroom-entrance.webp"
        title="Showroom"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Showroom", href: "/showroom" },
        ]}
      />

      <Section className="bg-white">
        <Heading
          eyebrow="EXPERIENCE CENTRE"
          heading="See It, Sit On It, Choose It"
          subheading="Our Experience Centre in Okhla, New Delhi displays complete workstations, executive desks, storage and seating, set up the way they work in a real office. Compare finishes, try the chairs and plan your space with our team."
          eyebrowClassName="justify-center"
          className="mx-auto max-w-4xl text-center"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {PHOTOS.map((photo) => (
            <div key={photo.src} className="relative aspect-[3/2] overflow-hidden rounded-sm">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Locations — same cards as the Contact page */}
      <Section className="bg-[#f4f0eb]">
        <Heading
          eyebrow="VISIT US"
          heading="Our Locations"
          subheading="Book a visit to the Experience Centre, or see where your furniture is made."
          eyebrowClassName="justify-center"
          className="mx-auto mb-12 max-w-3xl text-center"
        />
        <LocationCards />
      </Section>

      <Section className="bg-white">
        <LocationsMap />
      </Section>
    </>
  );
}
