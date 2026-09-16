"use client";

import Image from "next/image";
import Link from "next/link";

export function BreadcrumbBanner({
  title,
  breadcrumbs = [],
  backgroundImage = "/hero-bg.png",
  height = "h-[400px] ",
}) {
  return (
    <section className={`relative ${height} overflow-hidden`}>
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt={title}
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex flex-wrap items-center justify-center gap-2 text-sm md:text-base"
        >
          {breadcrumbs.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2"
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}

              {index !== breadcrumbs.length - 1 && (
                <span className="text-white/60">•</span>
              )}
            </div>
          ))}
        </nav>

        {/* Title */}
        <h1 className="text-3xl font-bold md:text-5xl lg:text-4xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
