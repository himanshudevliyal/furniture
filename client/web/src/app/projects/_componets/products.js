"use client";

import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import Card from "@/components/card";
import { Section } from "@/components/layout/section";
import { projectImages } from "./data";

export default function ProjectsGrid() {
  useEffect(() => {
    Fancybox.bind("[data-fancybox='projects']", {
      groupAll: true,
      animated: true,
      showClass: "f-fadeIn",
      hideClass: "f-fadeOut",
      Thumbs: {
        autoStart: false,
      },
    });

    return () => {
      Fancybox.unbind("[data-fancybox='projects']");
      Fancybox.close();
    };
  }, []);

  return (
    <Section >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projectImages.map((product, index) => (
            <div key={product.image || index}>
              <a
                href={product.image}
                data-fancybox="projects"
              data-caption={`${product.title} - ${product.subtitle}`}
                className="block"
              >
                <Card product={product} />
              </a>
            </div>
          ))}
        </div>
    </Section>
  );
}