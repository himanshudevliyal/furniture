"use client";

import { useState } from "react";
import Heading from "@/components/layout/heading";
import { Section } from "@/components/layout/section";
import JobList from "./job-list";
import CareerForm from "./career-form";

// Shares the selected job between the openings list and the CV form.
export default function CareersSection({ jobs = [] }) {
  const [selectedJobId, setSelectedJobId] = useState("general");

  const handleApply = (jobId) => {
    setSelectedJobId(jobId);
    document
      .getElementById("apply")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Section id="openings" className="scroll-mt-24 bg-[#F7F4EF] sm:py-20">
        <Heading
          eyebrow="OPEN POSITIONS"
          heading="CURRENT OPENINGS"
          subheading={
            jobs.length
              ? "Find a role that fits you and apply in a couple of minutes."
              : "There are no open positions right now, but we are always happy to hear from talented people."
          }
          eyebrowClassName="justify-center"
          headingClassName="text-3xl sm:text-4xl lg:text-5xl"
          className="mx-auto max-w-3xl text-center"
        />

        <div className="mt-12">
          <JobList jobs={jobs} onApply={handleApply} />
        </div>
      </Section>

      <Section id="apply" className="scroll-mt-24 bg-white sm:py-20">
        <CareerForm
          jobs={jobs}
          selectedJobId={selectedJobId}
          onSelectedJobChange={setSelectedJobId}
        />
      </Section>
    </>
  );
}
