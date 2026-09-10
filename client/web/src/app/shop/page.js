import FeaturedProducts from "@/components/featured-products";
import ProductDetail from "./_components/ProductDetail";
import FurnitureProductsShowcase from "./_components/productsimgs";
import ProductTabs from "./_components/ProductTabs";

export default function ProductPage() {
  return<>
    <ProductDetail />
    <ProductTabs />
    <FurnitureProductsShowcase></FurnitureProductsShowcase>
 <FeaturedProducts /> 
    
  </>;
}
