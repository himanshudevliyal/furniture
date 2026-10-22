"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

// Full-width brand statement. The image moves slower than the page while
// scrolling (parallax) and the text drifts slightly the other way.
export default function ParallaxShowcase() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);

  return (
    <section
      ref={sectionRef}
      aria-label="Sustainable spaces"
      className="relative h-screen min-h-[420px] w-full overflow-hidden bg-neutral-900"
    >
      {/* Parallax image layer (taller than the section so it can move) */}
      <motion.div
        style={reduceMotion ? undefined : { y: imageY }}
        className="absolute inset-x-0 -top-[20%] h-[140%]"
      >
        <Image
          src="/img/sustainable.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Overlay for legibility */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      {/* Text */}
      <motion.div
        style={reduceMotion ? undefined : { y: textY }}
        className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white"
      >
        <h2 className="mx-auto max-w-4xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          Sustainable Spaces for a Thriving Planet
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 sm:text-lg lg:text-xl">
          Bringing nature to work, leaving the wild untouched.
        </p>
      </motion.div>
    </section>
  );
}
