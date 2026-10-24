import Image from "next/image";
import {
  BadgeCheck,
  FileText,
  PencilRuler,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";

import { Section } from "@/components/layout/section";
import Heading from "@/components/layout/heading";

const services = [
  { icon: Zap, label: "Fast quotation to BOQ or layout" },
  { icon: FileText, label: "Professional product proposal" },
  { icon: PencilRuler, label: "Space planning and renderings" },
  { icon: BadgeCheck, label: "Certifications" },
  { icon: Truck, label: "Committed lead time" },
  { icon: Wrench, label: "Reliable after-sale services" },
];

export default function ProjectSupport() {
  return (
    <Section className="bg-white">
      <Heading
        heading="Project Support from Brief to Production"
        subheading="Our skilled project team provides various services from bidding stage to launch"
        className="mx-auto mb-10 max-w-3xl text-center"
        headingClassName="text-3xl sm:text-4xl lg:text-5xl"
        subheadingClassName="text-neutral-500"
      />

      <div className="overflow-hidden rounded-sm">
        <div className="relative aspect-[16/7] w-full sm:aspect-[16/5]">
          <Image
            src="/img/project-support.png"
            alt="Open-plan office with workstations, storage, lounge seating and meeting rooms"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>

        <ul className="grid grid-cols-2 bg-[#EFEAE0] sm:grid-cols-3 lg:grid-cols-6">
          {services.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="group flex flex-col items-center gap-3 border-b border-r border-[#e2dbcd] px-4 py-7 text-center transition-colors hover:bg-[#e8e1d4] lg:border-b-0 lg:last:border-r-0"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#9a6b2f] shadow-sm ring-1 ring-[#e2dbcd] transition-transform duration-300 group-hover:-translate-y-1">
                <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="text-sm font-medium leading-snug text-[#3a352f]">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
