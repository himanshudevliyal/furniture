import { BreadcrumbBanner } from "@/components/breadcrumb";
import BlogList from "./_components/blog-list";
import { getBlogs } from "@/utils/blog-api";
import { BLOG_ROUTE } from "@/utils/blog-helpers";

// app/blog/page.jsx  (server component — "use client" NAHI lagana)

export const metadata = {
  title: "Blog",
  description: "Ideas, tips and inspiration for better workspaces.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <>
      <BreadcrumbBanner
        title="Blogs"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: BLOG_ROUTE },
        ]}
      />

      <section className="bg-[#f0ece4] px-4 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <BlogList blogs={blogs} />
        </div>
      </section>
    </>
  );
}