"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Heading from "@/components/layout/heading";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

// Product FAQs as an accordion (first one open), plus FAQPage structured
// data so the questions can show up in search results.

export default function ProductFaqs({ product }) {
  const faqs = (product?.faqs ?? []).filter((f) => f?.question && f?.answer);
  const [open, setOpen] = useState(0);

  if (!faqs.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <Section className="bg-white">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[360px_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Heading
            eyebrow="FAQS"
            heading="Frequently Asked Questions"
            subheading={`Common questions about ${product?.title || "this product"}. Can't find what you're looking for? Our team is happy to help.`}
            eyebrowClassName="text-[#e30613]"
            headingClassName="text-3xl sm:text-4xl"
          />
          <Link
            href="/contact"
            className="group mt-2 inline-flex h-11 items-center gap-2 bg-neutral-900 px-6 text-sm font-medium text-white transition-colors hover:bg-[#e30613]"
          >
            Ask a Question
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="border-t border-neutral-200">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Collapsible
                key={`${faq.question}-${i}`}
                open={isOpen}
                onOpenChange={(next) => setOpen(next ? i : null)}
                className="border-b border-neutral-200"
              >
                <CollapsibleTrigger className="group flex w-full items-start gap-4 py-6 text-left">
                  <span
                    className={cn(
                      "mt-0.5 text-sm font-medium transition-colors",
                      isOpen ? "text-[#e30613]" : "text-neutral-400",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-lg font-medium text-neutral-900 transition-colors group-hover:text-neutral-600">
                    {faq.question}
                  </span>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                      isOpen
                        ? "rotate-45 border-[#e30613] bg-[#e30613] text-white"
                        : "border-neutral-300 text-neutral-600 group-hover:border-neutral-900",
                    )}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <p className="whitespace-pre-line pb-6 pl-9 pr-12 text-base leading-relaxed text-neutral-600">
                    {faq.answer}
                  </p>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </Section>
  );
}
