import Image from "next/image";
import Link from "next/link";

import ContactForm from "@/components/form/contact-us";
import {
  ClockIcon,
  IconBadge,
  LocationCards,
  LocationsMap,
  MailIcon,
  OFFICES,
  PhoneIcon,
  WORKING_HOURS,
} from "@/components/locations";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact Natraj Office Furniture for sales enquiries, export orders, after-sales service or vendor partnerships. Visit our Okhla, New Delhi experience centre.",
  alternates: { canonical: "/contact" },
};

// Hero photo — replace with the final showroom photo (keep the subject on the right).
const HERO_IMAGE = "/img/contact/contact-hero.webp";

export default function ContactPage() {
  const hq = OFFICES[0];
  return (
    <>
      {/* Hero — photo on the right, white fade on the left for the text */}
      <section className="relative isolate overflow-hidden bg-white">
        <Image
          src={HERO_IMAGE}
          alt="Natraj Experience Centre"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[78%_center]"
        />
        {/* White fade on the left so the text reads over the window/plant */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/90 via-white/60 to-white/10 md:from-white/80 md:via-white/35 md:via-35% md:to-transparent md:to-60%" />

        <div className="mx-auto flex min-h-[420px] max-w-7xl flex-col justify-center px-4 py-16 sm:min-h-[480px] lg:min-h-[560px] lg:px-10">
          <p className="type-eyebrow text-[#E87717]">
            Try it out in person at our Experience Centre
          </p>
          <h1 className="mt-3 max-w-xl type-display text-neutral-900">
            Visit Our Showroom
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3 md:mt-8">
            <Link
              href="/book-your-slot"
              className="inline-flex items-center gap-2 rounded-full border border-[#E87717] bg-[#E87717] px-5 py-3 type-button text-white transition-colors hover:border-[#C9620E] hover:bg-[#C9620E] md:px-6"
            >
              Book Now
            </Link>
            <a
              href="#enquiry"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-900 px-5 py-3 type-button text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white md:px-6"
            >
              Send an Enquiry
            </a>
          </div>
        </div>
      </section>

      {/* Locations — showroom-style cards */}
      <section className="px-4 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 type-eyebrow text-[#E87717]">Visit us</p>
            <h2 className="type-title text-[#3a352f]">Visit our showroom</h2>
            <p className="mt-4 text-[#5c564c]">
              Walk through complete office setups, compare finishes and try
              the chairs before you decide. Book a visit and our team will be
              ready for you.
            </p>
          </div>
          <LocationCards />
        </div>
      </section>

      {/* Enquiry form + quick contact (sticky on desktop) */}
      <section className="bg-[#FBF1E7] px-4 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-10">
            <div
              id="enquiry"
              className="scroll-mt-24 rounded-md border-t-4 border-[#E87717] bg-white p-6 shadow-sm ring-1 ring-[#e3ded4] sm:p-8 lg:p-10"
            >
              <p className="mb-3 type-eyebrow text-[#E87717]">Get in touch</p>
              <h2 className="mb-6 type-subtitle text-[#3a352f]">
                Let&apos;s talk about your space
              </h2>
              <ContactForm />
            </div>

            {/* Sticks below the navbar while the form scrolls */}
            <div className="flex flex-col gap-6 lg:sticky lg:top-24">
              <div className="rounded-md bg-white p-6 shadow-sm ring-1 ring-[#e3ded4] sm:p-7">
                <h3 className="type-heading text-[#3a352f]">Prefer to talk?</h3>
                <p className="mt-2 text-sm text-[#5c564c]">
                  Sales enquiries, after-sales support or partnerships — our
                  team replies within one working day.
                </p>
                <ul className="mt-5 flex flex-col gap-4 text-sm">
                  <li className="flex gap-3">
                    <IconBadge>
                      <PhoneIcon />
                    </IconBadge>
                    <div className="flex flex-col gap-1 self-center">
                      {hq.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="text-[#5c564c] transition-colors hover:text-[#E87717]"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <IconBadge>
                      <MailIcon />
                    </IconBadge>
                    <a
                      href={`mailto:${hq.email}`}
                      className="self-center break-all text-[#5c564c] transition-colors hover:text-[#E87717]"
                    >
                      {hq.email}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-4 rounded-md bg-gradient-to-r from-[#E87717] to-[#B5560A] p-6 text-white shadow-md">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <ClockIcon />
                </span>
                <div>
                  <p className="text-sm font-medium">Working Hours</p>
                  <p className="text-sm text-white/85">{WORKING_HOURS}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="px-4 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <LocationsMap />
        </div>
      </section>
    </>
  );
}
