import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

import { BreadcrumbBanner } from "@/components/breadcrumb";
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

      <Section className="bg-[#f4f0eb]">
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-medium text-neutral-900 sm:text-3xl">
              Visit the Experience Centre
            </h2>
            <p className="mt-4 flex gap-3 text-neutral-700">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#E87717]" aria-hidden />
              Plot No. C-40, Okhla Industrial Estate Phase I, New Delhi 110020
            </p>
            <p className="mt-3 flex gap-3 text-neutral-700">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-[#E87717]" aria-hidden />
              <span>
                <a href="tel:+919810418877" className="hover:text-[#E87717]">
                  +91 9810418877
                </a>
                {" · "}
                <a href="tel:+919810438876" className="hover:text-[#E87717]">
                  +91 9810438876
                </a>
              </span>
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-sm bg-[#E87717] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#C9620E]"
          >
            Book a Visit
          </Link>
        </div>
      </Section>
    </>
  );
}
