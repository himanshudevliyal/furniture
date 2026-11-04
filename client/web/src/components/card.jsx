import Image from "next/image";

import { cn } from "@/lib/utils";

// fit: the photo is always shown whole (never cropped), with a blurred copy
// of it filling any spare space. Phones use a 4:3 frame, sm+ a 500px frame.
// Without it the photo covers the card (homepage projects carousel).
export default function Card({ product, fit = false }) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl sm:h-[500px]",
        fit ? "aspect-[4/3] sm:aspect-auto" : "h-[420px]",
      )}
    >
      {/* Blurred copy fills the frame behind the photo, so the photo itself
          can be shown whole without empty bars. */}
      {fit && (
        <Image
          src={product.image}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="scale-110 object-cover blur-2xl brightness-95"
        />
      )}
      <Image
        src={product.image}
        alt={`${product?.title} — ${product?.subtitle}`}
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        className={fit ? "object-contain" : "object-cover"}
      />
{product?.title && (
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
      />
)}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <h3 className="type-subtitle text-white">
          {product?.title}
        </h3>
        <p className="mt-1.5 type-body text-white/90">
          {product?.subtitle}
        </p>
      </div>
    </div>
  );
}
