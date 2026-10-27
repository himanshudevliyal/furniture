"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  ListChecks,
  ClipboardList,
  ChevronDown,
  Check,
  Info,
  Sparkles,
  HelpCircle,
  Images,
  LayoutList,
  FolderOpen,
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

// Same look for the real tabs and the Features / FAQs jump links.
const tabItemClass = cn(
  "flex h-auto! shrink-0 flex-col items-center justify-center gap-1.5 rounded-none border-0! px-3 py-2.5 text-xs font-medium shadow-none!",
  "bg-transparent text-neutral-600 transition-colors duration-200 hover:text-black",
  "lg:flex-row lg:gap-2 lg:px-3 lg:py-2.5 lg:text-[15px] xl:px-4"
);

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

export default function ProductTabs({ product, children }) {
  const [featuresOpen, setFeaturesOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const panelTopRef = useRef(null);
  const barRef = useRef(null);

  // Tab bar is sticky, so it can be clicked from far down the page (e.g. while
  // reading FAQs). In that case bring the newly opened tab into view.
  const changeTab = (value) => {
    setActiveTab(value);
    const el = panelTopRef.current;
    const barBottom = barRef.current?.getBoundingClientRect().bottom ?? 0;
    if (el && el.getBoundingClientRect().top < barBottom) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Only link to sections that actually render for this product.
  const hasFeatures = (product?.features?.items ?? []).some((item) => item?.title);
  const hasGallery = (product?.gallery?.images ?? []).some(Boolean);
  // Related products load on the client, so link whenever the product has a category.
  const hasRelated = Boolean(product?.sub_category_id || product?.category_id);
  const hasFaqs = (product?.faqs ?? []).some((f) => f?.question && f?.answer);
  const jumpLinks = [
    hasFeatures && { href: "#product-features", label: "Features", icon: Sparkles },
    hasGallery && { href: "#product-applications", label: "Applications", icon: Images },
    // Customization section always renders (it has its own empty states).
    { href: "#product-resources", label: "Resources", icon: FolderOpen },
    hasRelated && { href: "#product-related", label: "Related Products", icon: LayoutList },
    hasFaqs && { href: "#product-faqs", label: "FAQs", icon: HelpCircle },
  ].filter(Boolean);
  const jumpHrefs = jumpLinks.map((l) => l.href).join(",");

  // Scroll-spy: while Features / FAQs sits under the sticky bar, highlight its
  // link instead of the tab. Anywhere else, the open tab stays highlighted.
  const [activeJump, setActiveJump] = useState(null);
  useEffect(() => {
    if (!jumpHrefs) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const barBottom = barRef.current?.getBoundingClientRect().bottom ?? 0;
      const current = jumpHrefs.split(",").find((href) => {
        const rect = document.querySelector(href)?.getBoundingClientRect();
        // +8 px so a section that just scrolled into place counts as active.
        return rect && rect.top <= barBottom + 8 && rect.bottom > barBottom + 8;
      });
      setActiveJump(current ?? null);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [jumpHrefs]);

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
    <Tabs
      value={activeTab}
      onValueChange={changeTab}
      className="mx-auto w-full gap-0"
    >
      {/* ---------------- Tab bar (sticky, just below the site header) ---------------- */}
      <div ref={barRef} className="sticky top-[68px] z-40 border-b bg-gray-100 md:top-[80px]">
        <div className="mx-auto flex w-full max-w-7xl overflow-x-auto px-2 py-2 [scrollbar-width:none] lg:px-3">
          <TabsList className="h-auto! w-auto! shrink-0 justify-start! gap-0 rounded-none bg-transparent p-0">
            {tabs.map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className={cn(
                  tabItemClass,
                  // Base TabsTrigger also whitens the open tab, so override it
                  // explicitly while a Features / FAQs link is the active one.
                  activeJump
                    ? "data-active:bg-transparent data-active:text-neutral-600"
                    : "data-active:bg-white data-active:text-black"
                )}
              >
                <Icon className="h-5 w-5 shrink-0 text-current lg:h-4 lg:w-4" strokeWidth={1.7} />
                <span className="whitespace-nowrap">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Features / FAQs stay in their own place on the page — these
              just scroll down to them. */}
          {jumpLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              aria-current={activeJump === href ? "location" : undefined}
              className={cn(tabItemClass, activeJump === href && "bg-white text-black")}
              onClick={(e) => {
                const target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                history.replaceState(null, "", href);
              }}
            >
              <Icon className="h-5 w-5 shrink-0 text-current lg:h-4 lg:w-4" strokeWidth={1.7} />
              <span className="whitespace-nowrap">{label}</span>
            </a>
          ))}
        </div>
      </div>

      <div ref={panelTopRef} className="scroll-mt-[140px] md:scroll-mt-[150px]" />
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
              <>
                <div className="mb-8 flex flex-wrap items-end justify-between gap-2">
                  <h2 className="text-4xl font-semibold tracking-tight">
                    Specifications
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {specifications.length} technical details
                  </p>
                </div>

                {/* Spec sheet: two columns on desktop, label left / value right. */}
                <dl className="grid grid-cols-1 border-t border-neutral-200 md:grid-cols-2 md:gap-x-12">
                  {specifications.map(({ label, value }, i) => (
                    <div
                      key={label || i}
                      className="flex items-baseline justify-between gap-6 border-b border-neutral-200 py-4"
                    >
                      <dt className="text-base text-muted-foreground">{label}</dt>
                      <dd className="text-right text-base font-medium text-neutral-900">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
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

      {/* Rest of the product page (Features … FAQs) — rendered inside the
          Tabs wrapper so the tab bar stays sticky while scrolling through it. */}
      <div>{children}</div>
    </Tabs>
  );
}