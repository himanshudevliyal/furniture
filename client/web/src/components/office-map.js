"use client";

import { useState } from "react";

// Place at: components/contact/office-map.jsx
export default function OfficeMap({ offices }) {
  const [active, setActive] = useState(0);
  const office = offices[active];
  const query = encodeURIComponent(office.mapQuery || office.address);

  return (
    <div className="overflow-hidden rounded-md bg-[#f7f5f1] shadow-sm ring-1 ring-[#e3ded4]">
      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e3ded4] px-5 py-4 sm:px-8">
        <div className="flex gap-2" role="tablist" aria-label="Office locations">
          {offices.map((o, i) => (
            <button
              key={o.city}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2 text-sm transition-colors ${
                active === i
                  ? "bg-[#3a352f] text-[#f7f5f1]"
                  : "bg-[#eeece7] text-[#5c564c] hover:bg-[#e3ded4]"
              }`}
            >
              {o.city}
              <span className="hidden sm:inline"> · {o.title}</span>
            </button>
          ))}
        </div>

        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${query}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#3a352f] underline-offset-4 hover:underline"
        >
          Get Directions
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </a>
      </div>

      {/* Map */}
      <div className="relative h-[360px] w-full sm:h-[440px]">
        <iframe
          key={office.city}
          title={`Map of ${office.city} ${office.title}`}
          src={`https://www.google.com/maps?q=${query}&output=embed`}
          className="absolute inset-0 h-full w-full border-0 grayscale-[30%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />

        {/* Floating address card */}
        <div className="pointer-events-none absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm">
          <div className="pointer-events-auto rounded-md bg-[#f7f5f1]/95 p-4 shadow-lg backdrop-blur">
            <p className="text-xs uppercase tracking-widest text-[#6b655a]">
              {office.title}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[#3a352f]">
              {office.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}