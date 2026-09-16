"use client";

import ClientLogoCard from "./client-logo-card";
import { ScrollVelocityContainer, ScrollVelocityRow } from "./ui/scroll-based-velocity";
import Heading from "./layout/heading";
const rowOne = [
  {
    title: "Amplifon",
    logo: "/img/logos/imgi_95_amplifon.jpg",
  },
  {
    title: "Bacardi",
    logo: "/img/logos/imgi_96_bacardi.jpg",
  },
  {
    title: "Blue Tokai",
    logo: "/img/logos/imgi_97_blue-tokai.jpg",
  },
  {
    title: "BNI Gurugram",
    logo: "/img/logos/imgi_98_bni-gurugram.jpg",
  },
  {
    title: "Canara HSBC Life Insurance",
    logo: "/img/logos/imgi_99_canara-hsbc-life-insurance.jpg",
  },
  {
    title: "Carlsberg",
    logo: "/img/logos/imgi_100_carlsberg.jpg",
  },
  {
    title: "CK Birla Hospital",
    logo: "/img/logos/imgi_101_ck-birla-hospital.jpg",
  },
];

const rowTwo = [
  {
    title: "Cushman",
    logo: "/img/logos/imgi_102_cushman.jpg",
  },
  {
    title: "Fortis",
    logo: "/img/logos/imgi_103_fortis.jpg",
  },
  {
    title: "Hero Cycles",
    logo: "/img/logos/imgi_104_hero-cycles.jpg",
  },
  {
    title: "IFFCO-MC",
    logo: "/img/logos/imgi_105_iffco-mc.jpg",
  },
  {
    title: "IndiGo",
    logo: "/img/logos/imgi_106_indigo.jpg",
  },
  {
    title: "IndiGo",
    logo: "/img/logos/imgi_106_indigo (1).jpg",
  },
  {
    title: "Indus Tower",
    logo: "/img/logos/imgi_107_indus-tower.jpg",
  },

  
];

export default function OurClient() {
  return (
    <section className="bg-neutral-100 py-20 sm:py-24">
      <div className="container mx-auto px-5 sm:px-8">

        <Heading
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
            baseVelocity={3}
            className="py-2"
          >
            {rowOne.map((client,index) => (
              <ClientLogoCard
                key={index}
                title={client.title}
                logo={client.logo}
              />
            ))}
          </ScrollVelocityRow>

          <ScrollVelocityRow
            baseVelocity={-3}
            gap={4}
            className="mt-4 py-2"
          >
            {rowTwo.map((client, index) => (
              <ClientLogoCard
                key={`${index}-row-two`}
                title={client.title}
                logo={client.logo}
              />
            ))}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>

      </div>
    </section>
  );
}