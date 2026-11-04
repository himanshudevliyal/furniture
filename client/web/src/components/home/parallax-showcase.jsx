"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { PARALLAX_DEFAULTS, ParallaxText, parallaxSectionClass } from "./parallax-content";

// Full-width banner. The image moves slower than the page while scrolling
// (parallax) and the text drifts slightly the other way. Props let the same
// section be reused with a different image, text, button and className.
export default function ParallaxShowcase({
  image = PARALLAX_DEFAULTS.image,
  title = PARALLAX_DEFAULTS.title,
  text = PARALLAX_DEFAULTS.text,
  label = PARALLAX_DEFAULTS.label,
  cta,
  className,
}) {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);

  return (
    <section ref={sectionRef} aria-label={label} className={cn(parallaxSectionClass, className)}>
      {/* Parallax image layer (taller than the section so it can move) */}
      <motion.div
        style={reduceMotion ? undefined : { y: imageY }}
        className="absolute inset-x-0 -top-[20%] h-[140%]"
      >
        <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>

      {/* Overlay for legibility */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      {/* Text */}
      <motion.div
        style={reduceMotion ? undefined : { y: textY }}
        className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white"
      >
        <ParallaxText title={title} text={text} cta={cta} />
      </motion.div>
    </section>
  );
}
