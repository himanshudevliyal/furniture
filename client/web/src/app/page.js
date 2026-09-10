import ExclusiveProducts from "@/components/categories";
import FeaturedProducts from "@/components/featured-products";
import HeroSection from "@/components/hero-section";
import IndustriesWeServe from "@/components/industries-we-serve";
import FurnitureProductsShowcase from "@/components/project-section";
import SpacesWeCaterTo from "@/components/spaces-we-cater-to";
import StatsSection from "@/components/stats-section";
import Testimonials from "@/components/testimonials";
import TestimonialsMasonryMarquee from "@/components/testimonials-marquee";


export default function Home() {
  return (
    <main className="relative">
       <HeroSection /> 
       <StatsSection /> 
     <IndustriesWeServe />
       <ExclusiveProducts/>
     {/* <FeaturedProducts />  */}
     <SpacesWeCaterTo/>
     <FurnitureProductsShowcase/>
     <Testimonials></Testimonials>
     <TestimonialsMasonryMarquee/>
    </main>
  );
}
