import Image from "next/image";
import {
  ArrowRight,
  GraduationCap,
  HeartHandshake,
  TrendingUp,
  Users,
} from "lucide-react";

import { BreadcrumbBanner } from "@/components/breadcrumb";
import Heading from "@/components/layout/heading";
import { Section } from "@/components/layout/section";
import { getActiveJobs } from "@/utils/career-api";
import CareersSection from "./_components/careers-section";

// app/careers/page.js (server component)

export const metadata = {
  title: "Careers",
  description:
    "Explore current job openings at Natraj Office Furniture. Submit your CV and we will contact you as soon as we have a relevant opening.",
  alternates: { canonical: "/careers" },
};

// Same facts used on the home and about pages.
const facts = [
  { value: "1989", label: "Building workspaces since" },
  { value: "1000+", label: "Workspaces delivered" },
  { value: "2", label: "Locations: Delhi & Faridabad" },
];

const reasons = [
  {
    icon: TrendingUp,
    title: "Grow With Us",
    text: "Real ownership from day one and a clear path to take on bigger roles as the business grows.",
  },
  {
    icon: GraduationCap,
    title: "Learn the Craft",
    text: "Understand how quality furniture is designed, manufactured and installed, not just how it is sold.",
  },
  {
    icon: Users,
    title: "Great Team",
    text: "Work alongside experienced designers, craftsmen and project managers who help each other succeed.",
  },
  {
    icon: HeartHandshake,
    title: "Stability & Care",
    text: "A company built over decades, with timely pay, a safe workplace and people who look out for you.",
  },
];

const arrowButton =
  "group inline-flex items-center gap-3 rounded-md bg-black py-2.5 pl-5 pr-2.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-neutral-800";

export default async function CareersPage() {
  const jobs = await getActiveJobs();

  return (
    <>
      <BreadcrumbBanner
        backgroundImage="/img/careers/careers-banner.png"
        title="Careers"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
        ]}
      />

      {/* Intro — same split layout as the About page */}
      <Section className="bg-[#f4f0eb]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-80 overflow-hidden sm:min-h-105">
            <Image
              src="/img/corporate.jpg"
              alt="Executive office furnished by Natraj Office Furniture"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex items-center px-2 py-12 sm:px-10 lg:px-16 lg:py-16 xl:px-20">
            <div className="w-full">
              <Heading
                eyebrow="CAREERS"
                heading="BUILD YOUR CAREER WITH NATRAJ"
                subheading="Behind every workstation, chair and office we deliver is a team of people who care about doing the job well. We are always looking for talented people to join them."
                headingClassName="text-2xl sm:text-3xl lg:text-4xl font-normal! leading-[1.05]!"
                subheadingClassName="text-base sm:text-lg leading-[1.7]"
                className="text-left!"
              />

              <p className="text-base leading-[1.7] sm:text-lg">
                Whether you are in sales, design, production, installation or
                accounts, you will find work here that you can be proud of.
              </p>

              <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-[#e2dbcd] py-6">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="sr-only">{f.label}</dt>
                    <dd className="text-3xl font-medium leading-none tracking-tight text-neutral-900 sm:text-4xl">
                      {f.value}
                    </dd>
                    <dd className="mt-2 text-xs leading-snug text-neutral-600 sm:text-sm">
                      {f.label}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="#openings" className={arrowButton}>
                  View Openings
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-700 transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
                  </span>
                </a>
                <a
                  href="#apply"
                  className="text-[15px] font-semibold text-neutral-900 underline decoration-neutral-400 underline-offset-[6px] transition-colors hover:decoration-neutral-900"
                >
                  Submit your CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Why join — same card language as "Our Approach" on About */}
      <Section className="bg-white">
        <Heading
          eyebrow="WHY JOIN US"
          heading="A PLACE TO DO YOUR BEST WORK"
          subheading="We believe good furniture is made by people who are trusted, supported and given room to grow."
          eyebrowClassName="justify-center"
          headingClassName="text-3xl sm:text-4xl lg:text-5xl"
          className="mx-auto max-w-4xl text-center"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group border border-gray-200 p-8 text-center transition-colors duration-300 hover:border-neutral-400"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f4f0eb] transition-colors duration-300 group-hover:bg-[#ebe4d8]">
                <Icon size={30} strokeWidth={1.5} aria-hidden />
              </div>
              <h3 className="mb-4 text-2xl font-medium">{title}</h3>
              <p className="text-base leading-7 text-neutral-700">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <CareersSection jobs={jobs} />
    </>
  );
}
