import Image from "next/image";
import { ExternalLink } from "lucide-react";

import { Section } from "@/components/layout/section";
import Heading from "@/components/layout/heading";
import { certificates } from "@/lib/certificates";

// Full certificate images (rendered from the PDFs). Click opens the PDF.
export default function CertificatesGallery() {
  const items = certificates.filter((c) => c.image && c.pdf);

  return (
    <Section className="bg-[#f4f0eb]">
      <Heading
        eyebrow="Our Certifications"
        heading="Certified for Quality, Safety & Sustainability"
        subheading="Independently audited management systems and product compliance. Click any certificate to view the original PDF."
        eyebrowClassName="justify-center"
        headingClassName="text-3xl sm:text-4xl"
        className="mx-auto mb-10 max-w-3xl text-center"
      />

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((cert) => (
          <li key={cert.slug}>
            <a
              href={cert.pdf}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${cert.title} certificate (PDF)`}
              className="group flex h-full flex-col overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[1/1.414] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={cert.image}
                  alt={`${cert.title} certificate — Natraj Modular Office Systems`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col gap-1 border-t border-neutral-100 p-4">
                <p className="text-sm font-semibold text-neutral-900">
                  {cert.title}
                </p>
                <p className="text-xs text-neutral-500">{cert.description}</p>
                <p className="mt-2 text-[11px] text-neutral-500">
                  No. {cert.number} · Valid till {cert.validTill}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#e30613]">
                  View PDF
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
