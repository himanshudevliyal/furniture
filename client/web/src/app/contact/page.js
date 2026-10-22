import { BreadcrumbBanner } from "@/components/breadcrumb";
import ContactForm from "@/components/form/contact-us";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact Natraj Office Furniture for sales enquiries, export orders, after-sales service or vendor partnerships. Visit our Okhla, New Delhi experience centre.",
  alternates: { canonical: "/contact" },
};

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4168.576030413097!2d77.2772822722426!3d28.529479233657067!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1f027a4e285%3A0xc427c7545c446ce9!2sNatraj%20Office%20Workstation%20Furniture-%20Furniture%20Store%20Experience%20Centre!5e0!3m2!1sen!2sin!4v1790148661935!5m2!1sen!2sin";

const MAP_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent(
    "Natraj Office Workstation Furniture Experience Centre, Okhla Industrial Estate Phase I, New Delhi"
  );

const offices = [
  {
    city: "New Delhi",
    title: "Experience Centre",
    address:
      "Plot No C 40, DDA Sheds, Okhla Industrial Estate, Phase I, New Delhi 110020",
    phones: ["+91 9810418877", "+91 9810438876"],
    email: "sales@natrajfurniture.com",
  },
  {
    city: "Faridabad",
    title: "Works",
    address:
      "A-7, 12/6 Street No 3, Gurukul Industrial Estate, Faridabad, Haryana 121003",
    phones: ["+91 9810438876", "+91 9810418877"],
    email: "sales@natrajfurniture.com",
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

const PinIcon = () => (
  <Icon>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Icon>
);

const PhoneIcon = () => (
  <Icon>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </Icon>
);

const MailIcon = () => (
  <Icon>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Icon>
);

const ClockIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Icon>
);

const IconBadge = ({ children }) => (
  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e30613]/10 text-[#e30613]">
    {children}
  </span>
);

export default function ContactPage() {
  return (
    <>
      <BreadcrumbBanner
        backgroundImage ="/img/projects/imgi_5_Desks_Banner_2020.jpg"
        title="Contact Us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section className=" px-4 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {/* Intro */}
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#e30613]">
              Get in touch
            </p>
            <h2 className="text-3xl leading-tight text-[#3a352f] lg:text-4xl">
              Let&apos;s talk about your space
            </h2>
            <p className="mt-4 text-[#5c564c]">
              Whether it&apos;s a sales enquiry, after-sales support or a
              partnership, send us a message and our team will get back to you
              within one working day.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-10">
            {/* Contact Form */}
            <div className="rounded-md border-t-4 border-[#e30613] bg-[#f7f5f1] p-6 shadow-sm ring-1 ring-[#e3ded4] sm:p-8 lg:p-10">
              <ContactForm />
            </div>

            {/* Office Cards */}
            <div className="flex flex-col gap-6">
              {offices.map((office) => (
                <article
                  key={office.city}
                  className="rounded-md border-t-4 border-[#e30613] bg-[#f7f5f1] p-6 shadow-sm ring-1 ring-[#e3ded4] transition-all hover:-translate-y-0.5 hover:shadow-lg hover:ring-[#e30613]/40 sm:p-7"
                >
                  <div className="mb-5 flex items-baseline justify-between gap-3 border-b border-[#e3ded4] pb-4">
                    <h3 className="text-lg uppercase tracking-wider text-[#3a352f]">
                      {office.city}
                    </h3>
                    <span className="rounded-full bg-[#e30613] px-3 py-1 text-xs font-medium text-white">
                      {office.title}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-4 text-sm">
                    <li className="flex gap-3">
                      <IconBadge>
                        <PinIcon />
                      </IconBadge>
                      <p className="leading-relaxed text-[#5c564c]">
                        {office.address}
                      </p>
                    </li>

                    <li className="flex gap-3">
                      <IconBadge>
                        <PhoneIcon />
                      </IconBadge>
                      <div className="flex flex-col gap-1">
                        {office.phones.map((phone) => (
                          <a
                            key={phone}
                            href={`tel:${phone.replace(/\s/g, "")}`}
                            className="text-[#5c564c] transition-colors hover:text-[#e30613]"
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
                        href={`mailto:${office.email}`}
                        className="self-center break-all text-[#5c564c] transition-colors hover:text-[#e30613]"
                      >
                        {office.email}
                      </a>
                    </li>
                  </ul>
                </article>
              ))}

              {/* Hours */}
              <div className="flex items-center gap-4 rounded-md bg-gradient-to-r from-[#e30613] to-[#a8040e] p-6 text-white shadow-md">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <ClockIcon />
                </span>
                <div>
                  <p className="text-sm font-medium">Working Hours</p>
                  <p className="text-sm text-white/85">
                    Mon – Sat · 10:00 AM – 7:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-16">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#e30613]">
                  Visit us
                </p>
                <h2 className="text-2xl text-[#3a352f] lg:text-3xl">
                  Our Experience Centre
                </h2>
              </div>
              <a
                href={MAP_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-[#3a352f] px-5 py-2.5 text-sm text-[#f7f5f1] transition-colors hover:bg-[#4a453d]"
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

              {/* Floating address card */}
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm">
                <div className="pointer-events-auto rounded-md border-l-4 border-[#e30613] bg-[#f7f5f1]/95 p-4 shadow-lg backdrop-blur">
                  <p className="text-xs uppercase tracking-widest text-[#6b655a]">
                    New Delhi · Experience Centre
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#3a352f]">
                    {offices[0].address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}