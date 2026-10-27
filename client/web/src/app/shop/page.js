import { Suspense } from "react";
import ProductFilter from "./_components/productFilter";
import { BreadcrumbBanner } from "@/components/breadcrumb";

export const metadata = {
  title: "Office Furniture Products",
  description:
    "Browse office workstations, desks and tables, seating, storage, partitions and more from Natraj Office Furniture.",
  alternates: { canonical: "/shop" },
};

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
