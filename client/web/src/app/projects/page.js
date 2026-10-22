import { BreadcrumbBanner } from "@/components/breadcrumb";
import ProjectsGrid from "./_componets/products";

export const metadata = {
  title: "Our Projects",
  description:
    "Office furniture projects delivered by Natraj Office Furniture for corporate offices, institutions and commercial spaces.",
  alternates: { canonical: "/projects" },
};

export default function OurProjects(params) {
    return(
        <>

   <BreadcrumbBanner
        title="Projects"
        breadcrumbs={[
          { label: "Projects", href: "/" },
          { label: "project", href: "/project" },
        ]}
      />


            <ProjectsGrid></ProjectsGrid>
        </>
    )
}