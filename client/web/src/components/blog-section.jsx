import Link from "next/link";
import { getBlogs } from "@/utils/blog-api";
import { BLOG_ROUTE } from "@/utils/blog-helpers";
import BlogCard from "./blog-card";


export default async function BlogSection({
  limit = 20,
  title = "Latest from our blog",
  subtitle = "Ideas, tips and inspiration for better workspaces.",
  excludeId,
}) {
  const blogs = (await getBlogs())
    .filter((b) => b.id !== excludeId)
    .slice(0, limit);

  if (blogs.length === 0) return null;

  return (
    <section className="bg-[#f0ece4] px-4 py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#6b655a]">
              Blog
            </p>
            <h2 className="text-2xl text-[#3a352f] lg:text-3xl">{title}</h2>
            {subtitle && <p className="mt-2 text-[#5c564c]">{subtitle}</p>}
          </div>
          <Link
            href={BLOG_ROUTE}
            className="inline-flex items-center gap-2 rounded-sm border border-[#3a352f] px-5 py-2.5 text-sm text-[#3a352f] transition-colors hover:bg-[#3a352f] hover:text-[#f7f5f1]"
          >
            View all blogs
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}