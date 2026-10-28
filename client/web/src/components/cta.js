"use client";

import { useEffect, useRef, useState } from "react";

import { Phone, ArrowUp } from "lucide-react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export const PHONE_NUMBER = "+919810438876";
export const WHATSAPP_URL = "https://wa.me/919810438876";

// Hide the mobile bar once the page is within this many px of the bottom.
const BOTTOM_OFFSET = 100;

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

export function WhatsappIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.44 9.43zm8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.79.72.7 5.81.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.62l6.02-1.58a11.33 11.33 0 0 0 5.42 1.38h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.03z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FloatingCta() {
  const [showMobileBar, setShowMobileBar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      const nearBottom =
        window.innerHeight + currentY >=
        document.documentElement.scrollHeight - BOTTOM_OFFSET;

      if (delta < 0) {
        // Scrolling up — bring the bar back.
        setShowMobileBar(true);
      } else if (delta > 0 && nearBottom) {
        // Scrolling down into the last 100px — hide it.
        setShowMobileBar(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* Desktop: floating buttons */}
      <div className="fixed right-6 bottom-6 z-50 hidden flex-col items-center gap-4 md:flex">
        <a
          href={`tel:${PHONE_NUMBER}`}
          aria-label="Call us"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e30613] text-white shadow-lg transition-transform hover:scale-110"
        >
          <Phone className="h-6 w-6" aria-hidden />
        </a>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform hover:scale-110"
        >
          <WhatsappIcon className="h-7 w-7" />
        </a>

        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#e30613] text-white shadow-lg transition-transform hover:scale-110"
        >
          <ArrowUp className="h-6 w-6" aria-hidden />
        </button>
      </div>

      {/* Mobile: bottom bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 flex bg-[#e30613] text-white shadow-[0_-2px_10px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-out md:hidden ${
          showMobileBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium"
        >
          <WhatsappIcon className="h-4 w-4" />
          Whatsapp
        </a>

        <span className="my-2 w-px bg-white/40" aria-hidden />

        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium"
        >
          <Phone className="h-4 w-4" aria-hidden />
          Call Us
        </a>
      </div>
    </>
  );
}


