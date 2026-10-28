import { BreadcrumbBanner } from "@/components/breadcrumb";
import { getFeaturedProjects, getProjectCategories } from "@/lib/projects";
import FurnitureProductsShowcase from "@/components/project-section";
import VideoTours from "@/components/home/video-tours";
import ProjectsGrid from "./_componets/products";

export const metadata = {
  title: "Our Projects",
  description:
    "Office furniture projects delivered by Natraj Office Furniture for corporate offices, institutions and commercial spaces.",
  alternates: { canonical: "/projects" },
};

export default function OurProjects() {
  return (
    <>
      <BreadcrumbBanner
        backgroundImage="/img/projects/workstation/workstation-013.jpg"
        title="Our Projects"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
        ]}
      />

      {/* Featured projects carousel + video walkthroughs (moved here from
          the homepage). */}
      <FurnitureProductsShowcase projects={getFeaturedProjects(10)} />
      <ProjectsGrid categories={getProjectCategories()} />
      <VideoTours />
    </>
  );
}
