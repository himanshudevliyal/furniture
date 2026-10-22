"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  Clock,
  IndianRupee,
  MapPin,
  Users,
} from "lucide-react";

const ALL = "All";

function Meta({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 text-[15px] text-neutral-700">
      <Icon className="h-4 w-4 text-neutral-500" strokeWidth={1.75} aria-hidden />
      {children}
    </span>
  );
}

function JobCard({ job, onApply }) {
  const [open, setOpen] = useState(false);
  const panelId = `job-panel-${job.id}`;

  return (
    <article
      className={`border bg-white transition-colors duration-300 ${
        open ? "border-neutral-400" : "border-gray-200 hover:border-neutral-400"
      }`}
    >
      <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          {(job.department || job.job_type) && (
            <div className="mb-3 flex flex-wrap gap-2">
              {job.department && (
                <span className="rounded-full bg-[#f4f0eb] px-3 py-1 text-xs font-semibold tracking-wide text-neutral-800">
                  {job.department}
                </span>
              )}
              {job.job_type && (
                <span className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold tracking-wide text-neutral-700">
                  {job.job_type}
                </span>
              )}
            </div>
          )}

          <h3 className="text-2xl font-medium leading-snug text-neutral-900 lg:text-3xl">
            {job.title}
          </h3>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {job.location && <Meta icon={MapPin}>{job.location}</Meta>}
            {job.experience && <Meta icon={Clock}>{job.experience}</Meta>}
            {job.openings && (
              <Meta icon={Users}>
                {job.openings} {job.openings > 1 ? "Openings" : "Opening"}
              </Meta>
            )}
            {job.salary && <Meta icon={IndianRupee}>{job.salary}</Meta>}
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          {job.description && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              className="inline-flex items-center gap-2 rounded-md border border-neutral-300 px-5 py-3 text-[15px] font-semibold text-neutral-900 transition-colors duration-300 hover:border-neutral-900"
            >
              {open ? "Hide Details" : "View Details"}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
          )}
          <button
            type="button"
            onClick={() => onApply(job.id)}
            className="group inline-flex items-center gap-3 rounded-md bg-black py-2.5 pl-5 pr-2.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-neutral-800"
          >
            Apply Now
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-700 transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
            </span>
          </button>
        </div>
      </div>

      {job.description && (
        <div
          id={panelId}
          className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden" inert={!open}>
            <div className="border-t border-gray-200 px-6 py-8 sm:px-8">
              <div
                className="max-w-3xl text-base leading-[1.75] text-neutral-700 [&_a]:font-medium [&_a]:text-neutral-900 [&_a]:underline [&_h1]:mt-7 [&_h1]:text-xl [&_h1]:font-medium [&_h1]:text-neutral-900 [&_h2]:mt-7 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-neutral-900 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-neutral-900 [&_li]:mt-1.5 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mt-3 [&_strong]:font-semibold [&_strong]:text-neutral-900 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&>*:first-child]:mt-0"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
              <button
                type="button"
                onClick={() => onApply(job.id)}
                className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-neutral-900 underline decoration-neutral-400 underline-offset-[6px] transition-colors hover:decoration-neutral-900"
              >
                Apply for this role
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default function JobList({ jobs, onApply }) {
  const [department, setDepartment] = useState(ALL);

  const departments = useMemo(() => {
    const set = new Set(jobs.map((j) => j.department).filter(Boolean));
    return set.size > 1 ? [ALL, ...set] : [];
  }, [jobs]);

  const visibleJobs =
    department === ALL ? jobs : jobs.filter((j) => j.department === department);

  if (!jobs.length) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center border border-gray-200 bg-white px-6 py-14 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f4f0eb]">
          <BriefcaseBusiness size={30} strokeWidth={1.5} aria-hidden />
        </div>
        <h3 className="text-2xl font-medium">No openings right now</h3>
        <p className="mt-3 max-w-md text-base leading-7 text-neutral-700">
          Send us your CV anyway. We will get in touch as soon as a matching
          role opens up.
        </p>
        <button
          type="button"
          onClick={() => onApply("general")}
          className="group mt-7 inline-flex items-center gap-3 rounded-md bg-black py-2.5 pl-5 pr-2.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-neutral-800"
        >
          Submit Your CV
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-700 transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
          </span>
        </button>
      </div>
    );
  }

  return (
    <>
      {departments.length > 0 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2" role="tablist">
          {departments.map((d) => (
            <button
              key={d}
              type="button"
              role="tab"
              aria-selected={department === d}
              onClick={() => setDepartment(d)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                department === d
                  ? "bg-black text-white"
                  : "border border-gray-200 bg-white text-neutral-700 hover:border-neutral-400"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-5">
        {visibleJobs.map((job) => (
          <JobCard key={job.id} job={job} onApply={onApply} />
        ))}
      </div>
    </>
  );
}
