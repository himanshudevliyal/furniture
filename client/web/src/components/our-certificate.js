"use client";

import Image from "next/image";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import Heading from "./layout/heading";
import { certificates } from "@/lib/certificates";

// ---------------------------------------------------------------------------
// Certificate Card — opens the certificate PDF in a new tab when available
// ---------------------------------------------------------------------------

function CertificateCard({ logo, title, pdf }) {
  const content = (
    <>
      <div className="relative h-[110px] w-[200px]">
        <Image
          src={logo}
          alt={`${title} certification`}
          fill
          sizes="200px"
          className="object-contain"
        />
      </div>
      <span className="text-xs font-medium tracking-wide text-neutral-600">
        {title}
        {pdf && <span className="ml-1 text-[#e30613]">· View</span>}
      </span>
    </>
  );

  const className =
    "flex shrink-0 flex-col items-center justify-center gap-3 overflow-hidden rounded-[20px] border bg-white px-6 py-5";

  if (!pdf) return <div className={className}>{content}</div>;

  return (
    <a
      href={pdf}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${title} certificate (PDF)`}
      className={`${className} transition-all duration-300 hover:-translate-y-1 hover:border-[#e30613]/40 hover:shadow-md`}
    >
      {content}
    </a>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export default function Certifications() {
  return (
    <section
      aria-labelledby="certifications-heading"
      className="w-full bg-[#F7F4EF] py-16 sm:py-20 lg:py-24"
    >
      <Heading
        heading="Certifications & Standards"
        eyebrow="Our Certifications"
        subheading="Built to meet recognised quality, safety and performance standards."
        eyebrowClassName="justify-center"
        headingClassName="text-3xl sm:text-4xl lg:text-5xl"
        className="mx-auto max-w-5xl text-center"
      />

      <ScrollVelocityContainer className="mt-12 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <ScrollVelocityRow
          baseVelocity={3}
          gap={5}
          className="py-4"
        >
          {certificates.map((certificate) => (
            <div
              key={certificate.slug}
              className="last:mr-5"
            >
              <CertificateCard {...certificate} />
            </div>
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </section>
  );
}