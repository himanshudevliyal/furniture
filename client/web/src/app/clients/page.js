import { BreadcrumbBanner } from "@/components/breadcrumb";
import Image from "next/image";
import Heading from "@/components/layout/heading";
import { Section } from "@/components/layout/section";
import { clients } from "@/lib/clients";

export const metadata = {
  title: "Our Clients",
  description:
    "Brands and institutions that trust Natraj Office Furniture with their workspaces — from Samsung, Ford and Flipkart to hospitals, schools and the Indian Armed Forces.",
  alternates: { canonical: "/clients" },
};

export default function ClientsPage() {
  return (
    <>
      <BreadcrumbBanner
        backgroundImage="/img/projects/meeting/meeting-03.jpg"
        title="Our Clients"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Clients", href: "/clients" },
        ]}
      />

      <Section className="bg-neutral-100 sm:py-20">
        <Heading
          eyebrow="OUR CLIENTS"
          heading="TRUSTED BY LEADING BRANDS"
          subheading={`${clients.length}+ organisations across IT, healthcare, retail, travel, manufacturing and defence have furnished their workspaces with us.`}
          eyebrowClassName="justify-center"
          className="mx-auto max-w-4xl text-center"
        />

        {/* Logo wall: white cells split by hairlines (1px gap over a grey
            background), black & white logos. */}
        <ul className="mt-12 grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {clients.map((client) => (
            <li
              key={client.logo}
              className="flex h-[120px] items-center justify-center bg-white px-5 transition-colors duration-300 hover:bg-neutral-50 sm:h-[160px] lg:h-[190px] lg:px-6"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={180}
                height={80}
                className="h-auto max-h-[60px] w-auto max-w-full object-contain grayscale contrast-125 sm:max-h-[70px]"
              />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
