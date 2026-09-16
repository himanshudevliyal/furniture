import Image from "next/image";

export default function Card({ product }) {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl sm:h-[500px]">
      <Image
        src={product.image}
        alt={`${product?.title} — ${product?.subtitle}`}
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        className="object-cover"
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
