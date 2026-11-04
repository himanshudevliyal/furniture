import Image from "next/image";
import { Factory, Map, Monitor, PackageCheck } from "lucide-react";

// Homepage "Why Choose Us": four project steps, each a white card with a
// photo at the bottom. Cards 2 and 4 sit lower on large screens.
const STEPS = [
  {
    icon: Map,
    title: "CAD Space Planning",
    text: "We plan work and meeting areas in CAD and check that the furniture fits.",
    image: "/img/why-choose/space-planning.webp",
    alt: "Planned office layout",
  },
  {
    icon: Monitor,
    title: "Furniture & 3D Visuals",
    text: "We match furniture to each area and show you the overall look in 3D.",
    image: "/img/why-choose/3d-visuals.webp",
    alt: "3D render of an open-plan office",
  },
  {
    icon: Factory,
    title: "In-House Manufacturing",
    text: "Our factory produces your office furniture and checks its quality before shipping.",
    image: "/img/why-choose/manufacturing.webp",
    alt: "Workstation frames being assembled at the Natraj works",
  },
  {
    icon: PackageCheck,
    title: "Project Delivery Support",
    text: "We help with packaging, delivery and installation for your project.",
    image: "/img/why-choose/delivery.webp",
    alt: "Workstations installed at a client office",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#f5f5f5] py-16 sm:py-20">
      <div className="container mx-auto max-w-7xl px-4 md:px-0">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold uppercase tracking-wide text-neutral-800 sm:text-4xl">
            Why Choose Us
          </h2>
          <p className="mt-4 text-sm text-neutral-600 sm:text-base">
            From space planning to delivery, Natraj supports every stage of your office furniture
            project.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:items-start lg:gap-5">
          {STEPS.map(({ icon: Icon, title, text, image, alt }, i) => (
            <li
              key={title}
              className={`group flex flex-col overflow-hidden rounded-lg bg-white transition-shadow duration-300 hover:shadow-lg ${
                i % 2 === 1 ? "lg:mt-6" : ""
              }`}
            >
              <div className="px-5 pb-6 pt-7">
                <Icon className="h-7 w-7 text-neutral-700" strokeWidth={1.5} aria-hidden />
                <h3 className="mt-4 text-base font-medium text-neutral-800">
                  <span className="mr-1.5 font-semibold">{String(i + 1).padStart(2, "0")}</span>
                  {title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-neutral-500">{text}</p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
