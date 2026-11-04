import Image from "next/image";
import { cn } from "@/lib/utils";
import { PARALLAX_DEFAULTS, ParallaxText, parallaxSectionClass } from "./parallax-content";

// Same markup as parallax-showcase.jsx, without the scroll movement. Rendered
// first (and for SEO); the motion version replaces it near the viewport.
export function ParallaxStatic({
  image = PARALLAX_DEFAULTS.image,
  title = PARALLAX_DEFAULTS.title,
  text = PARALLAX_DEFAULTS.text,
  label = PARALLAX_DEFAULTS.label,
  cta,
  className,
}) {
  return (
    <section aria-label={label} className={cn(parallaxSectionClass, className)}>
      <div className="absolute inset-x-0 -top-[20%] h-[140%]">
        <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
      </div>

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <ParallaxText title={title} text={text} cta={cta} />
      </div>
    </section>
  );
}
