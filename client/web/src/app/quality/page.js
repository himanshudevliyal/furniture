import Image from "next/image";

import { BreadcrumbBanner } from "@/components/breadcrumb";
import CertificatesGallery from "@/components/certificates-gallery";
import { Section } from "@/components/layout/section";
import { certificates } from "@/lib/certificates";

export const metadata = {
  title: "Quality & Certifications",
  description:
    "Natraj Office Furniture quality and certifications: ISO 9001, ISO 14001, ISO 45001 and ISO 50001 certified, with BIFMA and GREENGUARD compliant products.",
  alternates: { canonical: "/quality" },
};

const STRIP_LOGOS = { greenguard: "/img/certificate/greenguard-mark.png" };

// Text block with an optional wide image under it.
function QualityBlock({ title, children, image, imageAlt, width, height, className = "" }) {
  return (
    <Section className={className}>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-medium uppercase tracking-wide text-neutral-900 sm:text-4xl">
          {title}
        </h2>
        <div className="mt-5 space-y-3 text-base leading-relaxed text-neutral-600 sm:text-lg">
          {children}
        </div>
      </div>
      {image && (
        <Image
          src={image}
          alt={imageAlt}
          width={width}
          height={height}
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="mx-auto mt-10 h-auto w-full max-w-6xl"
        />
      )}
    </Section>
  );
}

export default function QualityPage() {
  return (
    <>
      <BreadcrumbBanner
        backgroundImage="/img/banners/quality.webp"
        title="Our Quality"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Quality", href: "/quality" },
        ]}
      />

      {/* Certifications */}
      <CertificatesGallery />

      {/* Materials */}
      <QualityBlock
        title="Materials"
        image="/img/quality/materials.webp"
        imageAlt="Raw materials: wood-grain boards, laminates, steel, edge banding and fabrics"
        width={1600}
        height={591}
        className="bg-white"
      >
        <p>
          At Natraj, quality starts with the raw materials. Boards, laminates, steel,
          fabrics, mechanisms and hardware are sourced to specification from trusted
          suppliers.
        </p>
        <p>
          Every incoming batch is checked before it reaches production, so only
          materials that meet our standards go into your furniture.
        </p>
      </QualityBlock>

      {/* Production quality control */}
      <QualityBlock
        title="Production Quality Control"
        image="/img/quality/production-qc.webp"
        imageAlt="Quality control stages: IQC raw material, IPQC first article inspection, employee self-inspection and on-site checks, FQC pre-assembly, OQC/QA finished product inspection"
        width={1920}
        height={664}
        className="bg-[#f4f0eb]"
      >
        <p>
          Quality is checked at every stage, not only at the end. Raw materials are
          inspected on arrival (IQC), the first piece of every batch is approved and
          checks continue on the production line (IPQC), products are pre-assembled
          (FQC), and every finished order gets a final inspection before dispatch
          (OQC/QA).
        </p>
      </QualityBlock>

      {/* After-sales service */}
      <QualityBlock title="After-Sales Service" className="bg-white">
        <p>
          Please do not hesitate to contact your account manager if there are any
          quality issues. Our team responds quickly and takes action to put things
          right.
        </p>
      </QualityBlock>

      {/* Certification marks strip: our own certificates only. GREENGUARD's
          logo file has a solid white background, so it uses a transparent copy. */}
      <section className="bg-linear-to-r from-black via-[#1c1c1c] to-[#4d4d4d] py-14 text-white">
        <ul className="container mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 sm:grid-cols-4 lg:grid-cols-7">
          {certificates.map((cert) => (
            <li key={cert.slug} className="flex flex-col items-center text-center">
              <Image
                src={STRIP_LOGOS[cert.slug] ?? cert.logo}
                alt={cert.title}
                width={160}
                height={80}
                className="h-14 w-auto object-contain brightness-0 invert"
              />
              <p className="mt-3 text-sm font-medium">{cert.title}</p>
              {cert.description && (
                <p className="mt-0.5 text-xs text-white/60">{cert.description}</p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
