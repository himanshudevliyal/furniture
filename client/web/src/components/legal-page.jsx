import Link from "next/link";

import { BreadcrumbBanner } from "@/components/breadcrumb";
import { Section } from "@/components/layout/section";

// Shared layout for the Privacy Policy and Terms & Conditions pages.
// Each section body is a list of blocks: a string renders as a paragraph,
// { list: [...] } renders as a bulleted list.

function Block({ block }) {
  if (typeof block === "string") {
    return <p className="text-base leading-[1.8] text-neutral-700">{block}</p>;
  }

  return (
    <ul className="list-disc space-y-2 pl-5 text-base leading-[1.8] text-neutral-700 marker:text-neutral-400">
      {block.list.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function LegalPage({ title, href, updated, intro, sections }) {
  return (
    <>
      <BreadcrumbBanner
        backgroundImage="/img/corporate.jpg"
        title={title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: title, href },
        ]}
      />

      <Section className="bg-white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          {/* Contents */}
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-28">
              <p className="mb-4 text-sm font-medium uppercase tracking-wide text-neutral-500">
                On this page
              </p>
              <ol className="space-y-2.5 border-l border-gray-200">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px block border-l border-transparent pl-4 text-sm leading-snug text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900"
                    >
                      {i + 1}. {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="max-w-3xl">
            <p className="text-sm text-neutral-500">Last updated: {updated}</p>

            <div className="mt-6 space-y-4 border-b border-gray-200 pb-10">
              {intro.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>

            {sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                className="scroll-mt-28 border-b border-gray-200 py-10 last:border-b-0"
              >
                <h2 className="mb-5 font-display text-2xl font-medium text-neutral-900 sm:text-3xl">
                  {i + 1}. {s.heading}
                </h2>
                <div className="space-y-4">
                  {s.body.map((block, j) => (
                    <Block key={j} block={block} />
                  ))}
                </div>
              </section>
            ))}

            <div className="mt-6 bg-[#f4f0eb] p-8">
              <h2 className="mb-3 text-xl font-medium text-neutral-900">
                Questions?
              </h2>
              <p className="text-base leading-[1.8] text-neutral-700">
                Write to us at{" "}
                <a
                  href="mailto:sales@natrajfurniture.com"
                  className="font-medium text-neutral-900 underline underline-offset-4"
                >
                  sales@natrajfurniture.com
                </a>
                , call +91 9810438876, or visit our{" "}
                <Link
                  href="/contact"
                  className="font-medium text-neutral-900 underline underline-offset-4"
                >
                  contact page
                </Link>
                .
              </p>
            </div>
          </article>
        </div>
      </Section>
    </>
  );
}
