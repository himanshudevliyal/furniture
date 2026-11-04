import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Shared by parallax-showcase.jsx (motion) and parallax-static.jsx.
// Pass a different image/title/text/cta and a className for each use.
export const PARALLAX_DEFAULTS = {
  image: "/img/sustainable.png",
  title: "Sustainable Spaces for a Thriving Planet",
  text: "Bringing nature to work, leaving the wild untouched.",
  label: "Sustainable spaces",
};

export const parallaxSectionClass =
  "relative h-screen min-h-[420px] w-full overflow-hidden bg-neutral-900";

export function ParallaxText({ title, text, cta }) {
  return (
    <>
      <h2 className="mx-auto max-w-4xl type-statement">{title}</h2>
      {text && (
        <p className="mx-auto mt-4 max-w-2xl type-statement-text text-white/85">{text}</p>
      )}
      {cta && (
        <Link
          href={cta.href}
          className="group relative mt-8 inline-flex h-11 items-center gap-2.5 overflow-hidden rounded-full border border-white/70 px-6 text-sm font-medium text-white transition-[border-color,box-shadow,transform] duration-300 hover:border-[#E87717] hover:shadow-[0_6px_20px_rgba(232,119,23,0.4)] active:scale-95"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 origin-left scale-x-0 bg-[#E87717] transition-transform duration-300 ease-out group-hover:scale-x-100 group-active:bg-[#C9620E]"
          />
          <span className="relative">{cta.label}</span>
          <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white text-neutral-900 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#E87717]">
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-45" strokeWidth={2.25} />
          </span>
        </Link>
      )}
    </>
  );
}
