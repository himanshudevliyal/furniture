
import { BreadcrumbBanner } from "@/components/breadcrumb";
import ContactForm from "@/components/form/contact-us";

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

export default function ContactPage() {
  return (
    <>
      <BreadcrumbBanner
        title="Contact Us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section className="bg-[#f0ece4] py-16 px-4 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10">
          {/* Contact Form */}
          <div className="bg-[#f7f5f1] rounded-md p-8 lg:p-10">
         <ContactForm></ContactForm>
          </div>

          {/* Office Locations */}
          <div className="flex flex-col gap-10 px-2">
            {offices.map((office) => (
              <div key={office.city}>
                <h3 className="uppercase tracking-wide text-[#3a352f] text-lg mb-1">
                  {office.city}
                </h3>

                <p className="text-[#3a352f] font-medium mb-2">
                  {office.title}
                </p>

                <p className="text-[#5c564c] mb-2">
                  {office.address}
                </p>

                <div className="flex flex-col gap-1 mb-2">
                  {office.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="text-[#5c564c] hover:text-[#3a352f] transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>

                <a
                  href={`mailto:${office.email}`}
                  className="text-[#5c564c] hover:text-[#3a352f] transition-colors"
                >
                  {office.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}