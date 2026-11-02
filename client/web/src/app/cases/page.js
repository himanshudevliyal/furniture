import { BreadcrumbBanner } from "@/components/breadcrumb";
import { getProjectCategories } from "@/lib/projects";
import VideoTours from "@/components/home/video-tours";
import ProjectsGrid from "./_componets/products";

export const metadata = {
  title: "Our Cases",
  description:
    "Office furniture projects delivered by Natraj Office Furniture for corporate offices, institutions and commercial spaces.",
  alternates: { canonical: "/cases" },
};

// `?category=<slug>` (from the homepage case cards) opens that tab.
export default async function OurCases({ searchParams }) {
  const { category } = await searchParams;
  const categories = getProjectCategories();
  const initialCategory = categories.some((c) => c.slug === category) ? category : undefined;

  return (
    <>
      <BreadcrumbBanner
        backgroundImage="/img/projects/workstation/workstation-013.jpg"
        title="Our Cases"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cases", href: "/cases" },
        ]}
      />

      <ProjectsGrid
        key={initialCategory ?? "all"}
        categories={categories}
        initialCategory={initialCategory}
      />
      <VideoTours />
    </>
  );
}
