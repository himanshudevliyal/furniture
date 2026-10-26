"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  ListChecks,
  ClipboardList,
  ChevronDown,
  Check,
  Info,
} from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";

// API returns relative storage paths like "public/images/xxx.png".
// Trim guards against accidental leading/trailing spaces or slashes in .env.
function resolveImage(path) {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path.trim();

  const base = (process.env.NEXT_PUBLIC_FILE_BASE ?? "")
    .trim()
    .replace(/\/+$/, "");
  const clean = String(path).trim().replace(/^\/+/, "");
  return `${base}/${clean}`;
}

const tabs = [
  { value: "overview", label: "Overview", icon: LayoutGrid },
  { value: "details", label: "Details", icon: ListChecks },
  { value: "specifications", label: "Specifications", icon: ClipboardList },
  { value: "other-details", label: "Other Details", icon: Info },
];

function EmptyState({ label }) {
  return (
    <p className="px-4 py-16 text-center text-lg text-muted-foreground lg:px-8">
      {label}
    </p>
  );
}

// Styling for rich-text HTML (TinyMCE output) rendered via
// dangerouslySetInnerHTML in the Other Details tab. Purely Tailwind
// Typography ("prose") classes — no inline classes are baked into the
// stored HTML itself.
const richTextClass = cn(
  "prose prose-neutral max-w-2xl",
  "prose-p:text-lg prose-p:text-muted-foreground",
  "prose-strong:text-foreground prose-strong:font-medium",
  "prose-ul:text-lg prose-li:text-muted-foreground"
);

export default function ProductTabs({ product }) {
  const [featuresOpen, setFeaturesOpen] = useState(true);

  const hero = product?.hero ?? {};
  const overview = product?.overview ?? {};
  const details = product?.details ?? {};
  const specifications = product?.specifications ?? [];
  // Rich-text HTML from the dashboard's TinyMCE editor — the product's
  // main long-form write-up. Rendered in the "Other Details" tab.
  const otherDetailsContent = product?.content ?? null;

  const fallbackImage = resolveImage(hero.images?.[0]) ?? "/img/products.png";
  const overviewImage = resolveImage(overview.image);
  console.log(overviewImage)

  const overviewDescriptions = (overview.descriptions ?? []).filter(Boolean);
  const overviewFeatures = overview.features?.list?.filter(Boolean) ?? [];
  const detailsBanner = resolveImage(details.banner?.image) ?? fallbackImage;

  return (
    <Tabs defaultValue="overview" className="    mx-auto  w-full">
      {/* ---------------- Tab bar ---------------- */}
      <div className="  z-10 border-b bg-gray-100">
      <div className="max-w-7xl w-full mx-auto">
        <TabsList
          className="
            grid!
            w-full
            grid-cols-2
            gap-2
            rounded-none
            px-4
            py-3
            sm:grid-cols-4
            lg:flex!
            lg:justify-start!
            lg:gap-0
            lg:px-3!
            lg:py-2
            h-auto!
          "
        >
          {tabs.map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className={cn(
                `
                flex
                h-auto!
                flex-col
                items-center
                justify-center
                gap-1.5
                rounded-none
                border-0!
                shadow-none!
                font-medium
                px-1
                py-2.5
                text-xs
                lg:flex-none
                lg:shrink-0
                lg:flex-row
                lg:gap-2.5
                lg:px-6
                lg:py-3
                lg:text-lg

                text-neutral-600
           bg-transparent         
                transition-all
                duration-200
                `,
                `
                data-[state=active]:bg-black
                data-[state=active]:text-white
                data-[state=active]:font-medium
                data-[state=active]:shadow-sm
                data-[state=active]:ring-0
                `
              )}
            >
              <Icon
                className="h-5 w-5 shrink-0 text-current"
                strokeWidth={1.7}
              />
              <span className="whitespace-nowrap">{label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        </div>
      </div>

      <Section className="py-0">
        {/* ---------------- Overview ---------------- */}
        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 gap-10 px-4 py-10 lg:grid-cols-2 lg:px-8 lg:py-14">
            <div className="flex flex-col gap-6">
              {overview.heading && (
                <h2 className="text-4xl font-semibold tracking-tight">
                  {overview.heading}
                </h2>
              )}

              {overviewDescriptions.map((paragraph, i) => (
                <p
                  key={i}
                  className="max-w-prose text-lg text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}

              {overviewFeatures.length > 0 && (
                <Collapsible
                  open={featuresOpen}
                  onOpenChange={setFeaturesOpen}
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between border-t py-4 text-left">
                    <span className="text-2xl font-semibold">
                      {overview.features?.heading || "Features & Options"}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-6 w-6 shrink-0 transition-transform",
                        featuresOpen && "rotate-180"
                      )}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <ul className="">
                      {overviewFeatures.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 mb-2 text-lg text-muted-foreground"
                        >
                          <Check className="mt-1 h-5 w-5 shrink-0 text-foreground" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
{overviewImage&&
            <div className="relative w-full rounded-lg  lg:aspect-auto ">
              <Image
                src={overviewImage}
                alt={overview.heading || product?.title || "Product overview"}
                width={500}
                height={500}
              
                className="  md:sticky md:top-30  w-full  object-contain"
              />
            </div>
}
          </div>
        </TabsContent>

        {/* ---------------- Details ---------------- */}
        <TabsContent value="details" className="mt-0">
          {details.banner?.image && (
            <div className="relative aspect-[21/9] w-full overflow-hidden bg-muted">
              <Image
                src={detailsBanner}
                alt="Product banner"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          )}

          {details.sections?.length ? (
            <div className="flex flex-col gap-16 px-4 py-14 lg:px-8 lg:py-20">
              {details.sections.map((section, i) => {
                const sectionImage = resolveImage(section.image);
                const bullets = section.features?.list?.filter(Boolean) ?? [];
                const descriptions = (section.descriptions ?? []).filter(
                  Boolean
                );

                return (
                  <div
                    key={section.heading || i}
                    className={cn(
                      "grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16",
                      i % 2 === 1 && "lg:[&>*:first-child]:order-2"
                    )}
                  >
                    <div className="flex flex-col gap-4">
                      {section.heading && (
                        <h3 className="text-4xl font-semibold tracking-tight">
                          {section.heading}
                        </h3>
                      )}
                      {descriptions.map((paragraph, j) => (
                        <p
                          key={j}
                          className="max-w-prose text-lg text-muted-foreground leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                      {section.has_features && bullets.length > 0 && (
                        <ul className="mt-2 flex flex-col gap-2 border-t pt-4">
                          {bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-2 text-lg"
                            >
                              <Check className="mt-1 h-5 w-5 shrink-0 text-foreground" />
                              <span className="text-foreground/80">{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {sectionImage && (
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={sectionImage}
                          alt={section.heading || "Product detail"}
                          fill
                          sizes="(min-width: 1024px) 45vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState label="No additional details for this product yet." />
          )}
        </TabsContent>

        {/* ---------------- Specifications ---------------- */}
        <TabsContent value="specifications" className="mt-0">
          <div className="px-4 py-10 lg:px-8">
        

            {specifications.length ? (
                 <> <h2 className="mb-8 text-4xl font-semibold tracking-tight">
              Specifications
            </h2>
              <Table className="max-w-2xl overflow-hidden rounded-lg border">
                <TableBody>
                  {specifications.map(({ label, value }, i) => (
                    <TableRow
                      key={label || i}
                      className={i % 2 === 1 ? "bg-muted/30" : undefined}
                    >
                      <TableCell className="w-1/3 bg-muted/50 text-lg font-medium">
                        {label}
                      </TableCell>
                      <TableCell className="text-lg text-muted-foreground">
                        {value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </>
            ) : (
              <EmptyState label="No specifications listed for this product yet." />
            )}
          </div>
        </TabsContent>

        {/* ---------------- Other Details ---------------- */}
        <TabsContent value="other-details" className="mt-0">
          <div className="px-4 py-10 lg:px-8">
         

            {otherDetailsContent ? (
 <>  <h2 className="mb-8 text-4xl font-semibold tracking-tight">
              Other Details
            </h2>

              <div
                className="product-content"

                dangerouslySetInnerHTML={{ __html: otherDetailsContent }}
              /> </>
            ) : (
              <EmptyState label="No other details available for this product yet." />
            )}
           
          </div>
        </TabsContent>

      </Section>
    </Tabs>
  );
}