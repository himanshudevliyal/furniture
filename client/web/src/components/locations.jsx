import Image from "next/image";
import Link from "next/link";

// Shared by /contact and /showroom: office data, showroom-style location
// cards and the Experience Centre map. Edit addresses / photos here only.

export const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4168.576030413097!2d77.2772822722426!3d28.529479233657067!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1f027a4e285%3A0xc427c7545c446ce9!2sNatraj%20Office%20Workstation%20Furniture-%20Furniture%20Store%20Experience%20Centre!5e0!3m2!1sen!2sin!4v1790148661935!5m2!1sen!2sin";

export const directions = (q) =>
  "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(q);

export const WORKING_HOURS = "Mon – Sat · 10:00 AM – 7:30 PM";

// `position` picks the visible part of the photo.
export const OFFICES = [
  {
    city: "New Delhi",
    title: "Experience Centre",
    name: "Natraj Experience Centre",
    image: "/img/showroom/showroom-entrance.webp",
    position: "object-center",
    text: "See complete workstations, executive desks, storage and seating set up the way they work in a real office.",
    address: "Plot No. C-40, Okhla Industrial Estate Phase I, New Delhi 110020",
    phones: ["+91 9810418877", "+91 9810438876"],
    email: "sales@natrajfurniture.com",
    mapQuery:
      "Natraj Office Workstation Furniture Experience Centre, Okhla Industrial Estate Phase I, New Delhi",
  },
  {
    city: "Faridabad",
    title: "Works",
    name: "Natraj Works",
    image: "/img/banners/workshop.webp",
    position: "object-left",
    text: "Our manufacturing unit, where panels, desks and storage are cut, finished and assembled.",
    address: "Plot No. 7A, 12/6 Gurukul Industrial Estate, Faridabad, Haryana 121003",
    phones: ["+91 9810438876", "+91 9810418877"],
    email: "sales@natrajfurniture.com",
    mapQuery: "Plot No. 7A, 12/6 Gurukul Industrial Estate, Faridabad, Haryana 121003",
  },
  {
    city: "Faridabad",
    title: "Works 2",
    name: "Natraj Works 2",
    image: "/img/banners/workshop.webp",
    position: "object-right",
    text: "Our second production unit for large and custom projects.",
    address: "Plot No. 92B, DLF Industrial Estate, Faridabad 121010",
    phones: ["+91 9810438876", "+91 9810418877"],
    email: "sales@natrajfurniture.com",
    mapQuery: "Plot No. 92B, DLF Industrial Estate, Faridabad 121010",
  },
];

// ---------------------------------------------------------------------------
// Small inline icons (no extra dependency)
// ---------------------------------------------------------------------------
const Icon = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const PinIcon = () => (
  <Icon>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Icon>
);

export const PhoneIcon = () => (
  <Icon>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </Icon>
);

export const MailIcon = () => (
  <Icon>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Icon>
);

export const ClockIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Icon>
);

export const IconBadge = ({ children }) => (
  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E87717]/10 text-[#E87717]">
    {children}
  </span>
);

const PhoneLinks = ({ phones }) => (
  <div className="flex flex-col gap-1 self-center">
    {phones.map((phone) => (
      <a
        key={phone}
        href={`tel:${phone.replace(/\s/g, "")}`}
        className="text-[#5c564c] transition-colors hover:text-[#E87717]"
      >
        {phone}
      </a>
    ))}
  </div>
);

// Showroom-style cards: photo, address, phone, hours, Book + Directions.
export function LocationCards() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {OFFICES.map((office) => (
        <article
          key={office.title}
          className="group flex flex-col overflow-hidden rounded-md bg-[#f7f5f1] ring-1 ring-[#e3ded4] transition-shadow hover:shadow-lg"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={office.image}
              alt={`${office.name}, ${office.city}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className={`object-cover transition-transform duration-500 group-hover:scale-105 ${office.position}`}
            />
            <span className="absolute left-4 top-4 rounded-full bg-[#E87717] px-3 py-1 text-xs font-medium text-white">
              {office.title}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <p className="type-eyebrow text-[#6b655a]">{office.city}</p>
            <h3 className="mt-1 type-heading text-[#3a352f]">{office.name}</h3>
            <p className="mt-2 text-sm text-[#5c564c]">{office.text}</p>

            <ul className="mt-5 flex flex-col gap-3 border-t border-[#e3ded4] pt-5 text-sm">
              <li className="flex gap-3">
                <IconBadge>
                  <PinIcon />
                </IconBadge>
                <p className="text-[#5c564c]">{office.address}</p>
              </li>
              <li className="flex gap-3">
                <IconBadge>
                  <PhoneIcon />
                </IconBadge>
                <PhoneLinks phones={office.phones} />
              </li>
              <li className="flex gap-3">
                <IconBadge>
                  <ClockIcon />
                </IconBadge>
                <p className="self-center text-[#5c564c]">{WORKING_HOURS}</p>
              </li>
            </ul>

            <div className="mt-auto flex flex-wrap gap-3 pt-6">
              <Link
                href="/book-your-slot"
                className="inline-flex items-center justify-center rounded-full bg-[#E87717] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#C9620E]"
              >
                Book a Showroom Visit
              </Link>
              <a
                href={directions(office.mapQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#3a352f] px-5 py-2.5 text-sm font-medium text-[#3a352f] transition-colors hover:bg-[#3a352f] hover:text-white"
              >
                Get Directions
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

// Experience Centre map with a floating address card.
export function LocationsMap() {
  const hq = OFFICES[0];
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 type-eyebrow text-[#E87717]">Find us</p>
          <h2 className="type-subtitle text-[#3a352f]">Our Experience Centre</h2>
        </div>
        <a
          href={directions(hq.mapQuery)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#3a352f] px-5 py-2.5 text-sm text-[#f7f5f1] transition-colors hover:bg-[#4a453d]"
        >
          Get Directions
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </a>
      </div>

      <div className="relative overflow-hidden rounded-md shadow-sm ring-1 ring-[#e3ded4]">
        <div className="relative h-[360px] w-full sm:h-[450px]">
          <iframe
            title="Natraj Furniture Experience Centre location"
            src={MAP_EMBED_URL}
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <div className="pointer-events-none absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm">
          <div className="pointer-events-auto rounded-md border-l-4 border-[#E87717] bg-[#f7f5f1]/95 p-4 shadow-lg backdrop-blur">
            <p className="type-eyebrow text-[#6b655a]">
              {hq.city} · {hq.title}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[#3a352f]">{hq.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
