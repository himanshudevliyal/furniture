"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ClientLogoCard({
  title,
  logo,
  className = "",
}) {
  return (
    <div
      className={cn(
        "group flex h-[125px] w-[220px] shrink-0 items-center justify-center rounded-xl bg-white px-8 py-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:h-[135px] sm:w-[240px]",
        className,
      )}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        {/* Always black & white, so mono and colour logos look uniform. */}
        <Image
          src={logo}
          alt={title}
          width={180}
          height={80}
          className="h-auto max-h-[75px] w-auto max-w-[175px] object-contain grayscale"
        />
      </div>
    </div>
  );
}