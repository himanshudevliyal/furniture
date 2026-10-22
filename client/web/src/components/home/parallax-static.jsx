import Image from "next/image";

// Same markup as parallax-showcase.jsx, without the scroll movement. Rendered
// first (and for SEO); the motion version replaces it near the viewport.
export function ParallaxStatic() {
  return (
    <section
      aria-label="Sustainable spaces"
      className="relative h-screen min-h-[420px] w-full overflow-hidden bg-neutral-900"
    >
      <div className="absolute inset-x-0 -top-[20%] h-[140%]">
        <Image
          src="/img/sustainable.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <h2 className="mx-auto max-w-4xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          Sustainable Spaces for a Thriving Planet
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 sm:text-lg lg:text-xl">
          Bringing nature to work, leaving the wild untouched.
        </p>
      </div>
    </section>
  );
}
