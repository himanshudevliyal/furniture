"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  ListChecks,
  Boxes,
  Box,
  DownloadCloud,
  ClipboardList,
  ChevronDown,
  FileArchive,
  FileText,
  Download,
  Check,
  Info,
} from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
  { value: "materials", label: "Materials", icon: Boxes },
  { value: "specifications", label: "Specifications", icon: ClipboardList },
  { value: "other-details", label: "Other Details", icon: Info },
  { value: "3d-models", label: "3D Models", icon: Box },
  { value: "downloads", label: "Downloads", icon: DownloadCloud },
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
  const materials = product?.materials ?? {};
  const specifications = product?.specifications ?? [];
  const models3d = product?.models_3d ?? [];
  const downloads = product?.downloads ?? [];
  // Rich-text HTML from the dashboard's TinyMCE editor — the product's
  // main long-form write-up. Rendered in the "Other Details" tab.
  const otherDetailsContent = product?.content ?? null;

  const fallbackImage = resolveImage(hero.images?.[0]) ?? "/img/products.png";

  const overviewDescriptions = (overview.descriptions ?? []).filter(Boolean);
  const overviewFeatures = overview.features?.list?.filter(Boolean) ?? [];
  const detailsBanner = resolveImage(details.banner?.image) ?? fallbackImage;

  return (
    <Tabs defaultValue="overview" className="w-full">
      {/* ---------------- Tab bar ---------------- */}
      <div className="sticky top-[95px] z-10 border-b bg-gray-100 py-3">
        <TabsList
          className="
            scrollbar-none
            h-auto
            w-full
            justify-start
            gap-2
            overflow-x-auto
            rounded-none
            border-b
            border-neutral-200
            bg-gray-50
            px-4
            py-2
            sm:justify-center
            lg:gap-3
            lg:px-8
          "
        >
          {tabs.map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className={cn(
                `
                h-20
                flex
                min-w-[150px]
                shrink-0
                items-center
                justify-center
                gap-2.5
                rounded-sm
                border-0
                bg-gray-50
                px-5
                py-4
                text-lg
                font-normal
                text-neutral-600
                shadow-none
                transition-all
                duration-200
                hover:bg-gray-100
                hover:text-neutral-900
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

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted lg:aspect-auto">
              <Image
                src={fallbackImage}
                alt={overview.heading || product?.title || "Product overview"}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
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

        {/* ---------------- Materials ---------------- */}
        <TabsContent value="materials" className="mt-0">
          {materials.sections?.length ? (
            <div className="flex flex-col gap-12 px-4 py-10 lg:px-8">
              {materials.sections.map((section, i) => (
                <div key={section.heading || i}>
                  {section.heading && (
                    <h2 className="mb-8 text-4xl font-semibold tracking-tight">
                      {section.heading}
                    </h2>
                  )}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
                    {(section.items ?? []).map((item, j) => {
                      const itemImage = resolveImage(item.image);
                      return (
                        <button
                          key={item.title || j}
                          type="button"
                          className="group flex flex-col gap-2 text-left"
                        >
                          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border bg-muted transition group-hover:border-foreground">
                            {itemImage && (
                              <Image
                                src={itemImage}
                                alt={item.title || "Material"}
                                fill
                                sizes="200px"
                                className="object-cover"
                              />
                            )}
                          </div>
                          <span className="text-lg text-muted-foreground group-hover:text-foreground">
                            {item.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState label="No materials listed for this product yet." />
          )}
        </TabsContent>

        {/* ---------------- Specifications ---------------- */}
        <TabsContent value="specifications" className="mt-0">
          <div className="px-4 py-10 lg:px-8">
            <h2 className="mb-8 text-4xl font-semibold tracking-tight">
              Specifications
            </h2>

            {specifications.length ? (
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
            ) : (
              <EmptyState label="No specifications listed for this product yet." />
            )}
          </div>
        </TabsContent>

        {/* ---------------- Other Details ---------------- */}
        <TabsContent value="other-details" className="mt-0">
          <div className="px-4 py-10 lg:px-8">
            <h2 className="mb-8 text-4xl font-semibold tracking-tight">
              Other Details
            </h2>

            {otherDetailsContent ? (
              <div
                className="product-content"

                dangerouslySetInnerHTML={{ __html: otherDetailsContent }}
              />
            ) : (
              <EmptyState label="No other details available for this product yet." />
            )}
          </div>
        </TabsContent>

        {/* ---------------- 3D Models ---------------- */}
        <TabsContent value="3d-models" className="mt-0">
          {models3d.length ? (
            <div className="flex flex-col divide-y px-4 lg:px-8">
              {models3d.map((model, i) => (
                <div
                  key={model.title || i}
                  className="flex flex-col items-center gap-4 py-12 text-center"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <FileArchive className="h-9 w-9 text-muted-foreground" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-semibold">
                      {model.title || "3D Model"}
                    </h2>
                    {model.fileType && (
                      <p className="text-lg uppercase text-muted-foreground">
                        {model.fileType} file
                      </p>
                    )}
                  </div>
                  <Button
                    asChild
                    size="lg"
                    className="
                      h-11
                      rounded-md
                      bg-black
                      px-6
                      text-sm
                      font-medium
                      text-white
                      shadow-none
                      hover:bg-neutral-800
                    "
                  >
                    <a className="flex" href={resolveImage(model.file)} download>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState label="No 3D models available for this product yet." />
          )}
        </TabsContent>

        {/* ---------------- Downloads ---------------- */}
        <TabsContent value="downloads" className="mt-0">
          {downloads.length ? (
            <div className="flex flex-col divide-y px-4 lg:px-8">
              {downloads.map((file, i) => (
                <div
                  key={file.title || i}
                  className="flex flex-col items-center gap-4 py-12 text-center"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <FileText className="h-9 w-9 text-muted-foreground" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-semibold">
                      {file.title || "Download"}
                    </h2>
                    {file.fileType && (
                      <p className="text-lg uppercase text-muted-foreground">
                        {file.fileType} file
                      </p>
                    )}
                  </div>

                  <Button
                    asChild
                    className="
                      h-11
                      w-auto
                      shrink-0
                      rounded-md
                      bg-black
                      px-6
                      flex
                      text-sm
                      font-medium
                      text-white
                      shadow-none
                      hover:bg-neutral-800
                    "
                  >
                    <a href={resolveImage(file.file)} className="flex" download>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState label="No downloads available for this product yet." />
          )}
        </TabsContent>
      </Section>
    </Tabs>
  );
}