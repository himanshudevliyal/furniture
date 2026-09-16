import Image from "next/image";

export default function CategoriesCard({ product }) {
  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-2xl sm:h-[370px] lg:h-[420px]">
      <Image
        width={500}
        height={500}
        src={`${process.env.NEXT_PUBLIC_FILE_BASE}/${product.pictures[0]}`}
        alt={product.title.replace("\n", " ")}
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute inset-0 flex h-full flex-col justify-end px-7 pb-5 sm:px-9">
        <h3 className="mt-3 line-clamp-2 whitespace-pre-line text-2xl font-bold leading-[1.15] text-white">
          {product.title}
        </h3>

        <p className="mt-3 text-sm text-white/90">
          {product.subtitle}
        </p>
      </div>
    </div>
  );
}
