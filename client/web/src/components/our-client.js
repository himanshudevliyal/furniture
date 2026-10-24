"use client";

import ClientLogoCard from "./client-logo-card";
import { ScrollVelocityContainer, ScrollVelocityRow } from "./ui/scroll-based-velocity";
import Heading from "./layout/heading";
import { clientRows } from "@/lib/clients";
// All client logos come from lib/clients.js (files in /public/img/clients).
const [rowOne, rowTwo] = clientRows;

export default function OurClient() {
  return (
    <section className="bg-neutral-100 py-20 sm:py-24">
      <div className="container mx-auto px-5 sm:px-8">

        <Heading
        eyebrow="Clients"
          heading="Trusted by Our Clients"
          subheading="Behind every project is a partnership built on trust, quality, reliability, and commitment."
          eyebrowClassName="justify-center"
          headingClassName="text-3xl sm:text-4xl lg:text-5xl "
          className="max-w-5xl mx-auto text-center"
        />

        <ScrollVelocityContainer
          className="mt-12 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
        >
          <ScrollVelocityRow
            baseVelocity={1.5}
            className="py-2"
          >
            {rowOne.map((client,index) => (

              <div className="last:mr-4" key={client.logo}>
              <ClientLogoCard
               
                title={client.name}
                logo={client.logo}
              />
              </div>
            ))}

          </ScrollVelocityRow>

          <ScrollVelocityRow
            baseVelocity={-1.5}
            gap={4}
            className="mt-4 py-2"
          >
            {rowTwo.map((client, index) => (
                            <div className="last:mr-4" key={client.logo}>

          <ClientLogoCard
               
                title={client.name}
                logo={client.logo}
              />
</div>            ))}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>

      </div>
    </section>
  );
}