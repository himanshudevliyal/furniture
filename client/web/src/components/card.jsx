import Image from "next/image";

import { cn } from "@/lib/utils";

// fitOnMobile: on phones every card is the same 4:3 frame and the photo is
// shown whole (never cropped), with a blurred copy of it filling any spare
// space. Desktop (sm+) stays a 500px cover image.
export default function Card({ product, fitOnMobile = false }) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl sm:h-[500px]",
        fitOnMobile ? "aspect-[4/3] sm:aspect-auto" : "h-[420px]",
      )}
    >
      {/* Mobile only: blurred copy fills the frame behind the photo, so the
          photo itself can be shown whole without empty bars. */}
      {fitOnMobile && (
        <Image
          src={product.image}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="scale-110 object-cover blur-2xl brightness-95 sm:hidden"
        />
      )}
      <Image
        src={product.image}
        alt={`${product?.title} — ${product?.subtitle}`}
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        className={fitOnMobile ? "object-contain sm:object-cover" : "object-cover"}
      />
{product?.title && (
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
      />
)}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <h3 className="text-3xl font-bold text-white sm:text-4xl">
          {product?.title}
        </h3>
        <p className="mt-1.5 text-sm text-white/90 sm:text-base">
          {product?.subtitle}
        </p>
      </div>
    </div>
  );
}
