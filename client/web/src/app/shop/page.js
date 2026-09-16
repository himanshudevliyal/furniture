import { Suspense } from "react";
import ProductFilter from "./_components/productFilter";
import { BreadcrumbBanner } from "@/components/breadcrumb";

export default function SearchPage(params) {
  return (
    <>

     <BreadcrumbBanner
            title="Shop"
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Contact", href: "/shop" },
            ]}
          />
    
      <Suspense fallback="Loading...">
        <ProductFilter></ProductFilter>
      </Suspense>
    </>
  );
}
