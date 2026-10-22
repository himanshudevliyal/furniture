"use client";

import ClientLogoCard from "./client-logo-card";
import { ScrollVelocityContainer, ScrollVelocityRow } from "./ui/scroll-based-velocity";
import Heading from "./layout/heading";
// Client logos (black & white), split across two marquee rows.
const rowOne = [
  { title: "Emoha", logo: "/img/clients/emoha.svg" },
  { title: "Underneat", logo: "/img/clients/underneat.svg" },
  { title: "GRIP", logo: "/img/clients/grip.svg" },
  { title: "Hike", logo: "/img/clients/hike.svg" },
  { title: "ECS", logo: "/img/clients/ecs.svg" },
  { title: "EZ Labs", logo: "/img/clients/ezlabs.svg" },
  { title: "First Bridge Business School", logo: "/img/clients/first-bridge.svg" },
  { title: "UnifyCloud", logo: "/img/clients/unifycloud.svg" },
  { title: "Univest", logo: "/img/clients/univest.svg" },
  { title: "rebootXP", logo: "/img/clients/rebootxp.svg" },
  { title: "PR Pundit Havas Red", logo: "/img/clients/pr-pundit-havas-red.svg" },
  { title: "iEnergizer", logo: "/img/clients/ienergizer.svg" },
  { title: "Ocrolus", logo: "/img/clients/ocrolus.svg" },
  { title: "CarDekho", logo: "/img/clients/cardekho.svg" },
  { title: "MR.DIY", logo: "/img/clients/mr-diy.svg" },
  { title: "Sandvik", logo: "/img/clients/sandvik.svg" },
  { title: "SpiceJet", logo: "/img/clients/spicejet.svg" },
  { title: "MobiKwik", logo: "/img/clients/mobikwik.svg" },
  { title: "Samsung", logo: "/img/clients/samsung.svg" },
  { title: "Tractebel Engie", logo: "/img/clients/tractebel.svg" },
  { title: "Stanza Living", logo: "/img/clients/stanza-living.svg" },
  { title: "Hashtag Orange", logo: "/img/clients/hashtag-orange.svg" },
];

const rowTwo = [
  { title: "Manipal Fintech", logo: "/img/clients/manipal-fintech.svg" },
  { title: "Shachihata", logo: "/img/clients/shachihata.svg" },
  { title: "Lumenci", logo: "/img/clients/lumenci.svg" },
  { title: "Bupa", logo: "/img/clients/bupa.svg" },
  { title: "Apollo 24|7", logo: "/img/clients/apollo-247.svg" },
  { title: "Pallia Trans Logistics", logo: "/img/clients/pallia-trans-logistics.svg" },
  { title: "G4S", logo: "/img/clients/g4s.svg" },
  { title: "Clix", logo: "/img/clients/clix.svg" },
  { title: "Mila Beauté", logo: "/img/clients/mila-beaute.svg" },
  { title: "Hippo Stores", logo: "/img/clients/hippo-stores.svg" },
  { title: "Goibibo", logo: "/img/clients/goibibo.svg" },
  { title: "McCann", logo: "/img/clients/mccann.svg" },
  { title: "Mercer", logo: "/img/clients/mercer.svg" },
  { title: "Eastman", logo: "/img/clients/eastman.svg" },
  { title: "tbo.com", logo: "/img/clients/tbo-com.svg" },
  { title: "DBMCI One", logo: "/img/clients/dbmci-one.svg" },
  { title: "enrichlabs.ai", logo: "/img/clients/enrichlabs.svg" },
  { title: "Thales", logo: "/img/clients/thales.svg" },
  { title: "FuelBuddy", logo: "/img/clients/fuelbuddy.svg" },
  { title: "3i Infotech", logo: "/img/clients/3i-infotech.svg" },
  { title: "Acenet", logo: "/img/clients/acenet.svg" },
  { title: "Mahindra Logistics", logo: "/img/clients/mahindra-logistics.svg" },
];

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
            baseVelocity={3}
            className="py-2"
          >
            {rowOne.map((client,index) => (

              <div className="last:mr-4"  key={index}>
              <ClientLogoCard
               
                title={client.title}
                logo={client.logo}
              />
              </div>
            ))}

          </ScrollVelocityRow>

          <ScrollVelocityRow
            baseVelocity={-3}
            gap={4}
            className="mt-4 py-2"
          >
            {rowTwo.map((client, index) => (
                            <div className="last:mr-4"   key={`${index}-row-two`}>

          <ClientLogoCard
               
                title={client.title}
                logo={client.logo}
              />
</div>            ))}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>

      </div>
    </section>
  );
}