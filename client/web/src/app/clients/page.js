import { BreadcrumbBanner } from "@/components/breadcrumb";
import ClientLogoCard from "@/components/client-logo-card";
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
          headingClassName="text-3xl sm:text-4xl lg:text-5xl"
          className="mx-auto max-w-4xl text-center"
        />

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {clients.map((client) => (
            <li key={client.logo}>
              <ClientLogoCard
                title={client.name}
                logo={client.logo}
                className="h-[100px] w-full px-5 py-4 sm:h-[120px] sm:w-full sm:px-6"
              />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
