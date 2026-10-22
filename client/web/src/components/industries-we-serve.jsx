"use client";

import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import {
  IndustriesShell,
  IndustryCard,
  marqueeMask,
  rowOne,
  rowTwo,
} from "./industries-content";

// Animated (motion) version. Loaded lazily by industries-section.jsx.
export default function IndustriesWeServe() {
  return (
    <IndustriesShell>
      <ScrollVelocityContainer className={`mt-12 ${marqueeMask}`}>
        <ScrollVelocityRow baseVelocity={3} className="py-2">
          {rowOne.map((card) => (
            <div key={card.title} className="last:mr-4">
              <IndustryCard {...card} />
            </div>
          ))}
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={-3} gap={4} className="mt-4 py-2">
          {rowTwo.map((card, index) => (
            <div key={`${index}-row-two`} className="last:mr-4">
              <IndustryCard {...card} />
            </div>
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </IndustriesShell>
  );
}
