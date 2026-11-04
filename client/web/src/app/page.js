
import BlogSection from "@/components/blog-section";
import FurnitureCategories from "@/components/home/furniture-categories";
import HeroSection from "@/components/hero-section";
import { LazyParallaxShowcase as ParallaxShowcase } from "@/components/home/lazy-motion-sections";
import IndustriesWeServe from "@/components/home/industries-we-serve";
import OurClient from "@/components/our-client";
import CaseCategories from "@/components/home/case-categories";
import VideoTours from "@/components/home/video-tours";
import { getProjectCategories } from "@/lib/projects";
import ProjectSupport from "@/components/home/project-support";
import WhyChooseUs from "@/components/home/why-choose-us";
import StatsSection from "@/components/stats-section";

export const metadata = {
  title: { absolute: "Natraj Office Furniture | Workstations, Seating & Storage" },
  description:
    "Modern office furniture, workstations, seating, storage, and customized workspace solutions by Natraj Furniture.",
  alternates: { canonical: "/" },
};


// Order: who we are → what we make → who it's for → how we deliver →
// proof of work → trust → stories & content.
export default function Home() {
  return (
    <main className="relative">
      {/* 1. Intro */}
      <HeroSection />
      <StatsSection />

      {/* 2. What we make */}
      <FurnitureCategories />
      {/* <FeaturedProducts /> */}

      {/* 3. Who it's for */}
      {/* <SpacesWeCaterTo /> */}
      <IndustriesWeServe />

      {/* 4. Brand statement (parallax break) */}
      <ParallaxShowcase />

      {/* 5. How we deliver + proof of work */}
      <WhyChooseUs />
      <ProjectSupport />
      <CaseCategories categories={getProjectCategories()} />
      <VideoTours />

      {/* 6. Trust */}
      <OurClient />
      <ParallaxShowcase
        image="/img/become-partner.webp"
        label="Become a partner"
        title="Build Better Workspaces Together"
        text="Let’s create spaces that inspire collaboration and growth for your team."
        cta={{ label: "Become a Partner", href: "/contact#enquiry" }}
        className="h-[75vh] min-h-[460px]"
      />

      {/* 7. Content */}
      <BlogSection />
    </main>
  );
}

