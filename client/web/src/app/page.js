import BlogSection from "@/components/blog-section";
import ExclusiveProducts from "@/components/categories";
import HeroSection from "@/components/hero-section";
import {
  LazyIndustriesWeServe as IndustriesWeServe,
  LazyParallaxShowcase as ParallaxShowcase,
} from "@/components/home/lazy-motion-sections";
import Certifications from "@/components/our-certificate";
import OurClient from "@/components/our-client";
import FurnitureProductsShowcase from "@/components/project-section";
import { getFeaturedProjects } from "@/lib/projects";
import VideoTours from "@/components/home/video-tours";
import ProjectSupport from "@/components/home/project-support";
import StatsSection from "@/components/stats-section";
import TestimonialsMasonryMarquee from "@/components/testimonials-marquee";

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
      <ExclusiveProducts />
      {/* <FeaturedProducts /> */}

      {/* 3. Who it's for */}
      {/* <SpacesWeCaterTo /> */}
      <IndustriesWeServe />

      {/* 4. Brand statement (parallax break) */}
      <ParallaxShowcase />

      {/* 5. How we deliver + proof of work */}
      <ProjectSupport />
      <FurnitureProductsShowcase projects={getFeaturedProjects(10)} />
      <VideoTours />

      {/* 6. Trust */}
      <OurClient />
      <Certifications />
      {/* <Testimonials /> */}
      <TestimonialsMasonryMarquee />

      {/* 7. Content */}
      <BlogSection />
    </main>
  );
}
