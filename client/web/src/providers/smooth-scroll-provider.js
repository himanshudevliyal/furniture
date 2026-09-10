"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // adjust speed
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease-out expo
      smoothWheel: true,
      smoothTouch: false, // optional: disable on touch devices
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
