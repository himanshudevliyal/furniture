import { notFound } from "next/navigation";
import { BreadcrumbBanner } from "@/components/breadcrumb";
import BlogDetail from "./_components/blog-detail";
import BlogSection from "@/components/blog-section";
import { getImageUrl,stripHtml} from "../../../utils/blog-helpers";

// app/blogs/[slug]/page.jsx  (server component)

async function getBlog(slug) {
  const base = (process.env.NEXT_PUBLIC_API_URL ?? "")
    .trim()
    .replace(/\/+$/, "");

  const res = await fetch(`${base}/blogs/get-by-slug/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data?.data ?? null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Blog not found" };

  const title = blog.meta_title || blog.title;
  const description =
    blog.meta_description || stripHtml(blog.description).slice(0, 160);
  const image = blog.pictures?.[0] ? getImageUrl(blog.pictures[0]) : undefined;

  return {
    title,
    description,
    keywords: blog.meta_keywords || undefined,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/blog/${slug}`,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) notFound();

  return (
    <>
      <BreadcrumbBanner
        title="Blog"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: blog.title, href: `/blogs/${blog.slug}` },
        ]}
      />

      <BlogDetail blog={blog} />

      {/* Related blogs */}
      <BlogSection title="You may also like" subtitle="" excludeId={blog.id} />
    </>
  );
}