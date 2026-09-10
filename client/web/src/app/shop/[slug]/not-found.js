import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold text-neutral-900">
        Product not found
      </h1>
      <p className="max-w-md text-neutral-500">
        We couldn&apos;t find the product you&apos;re looking for. It may
        have been removed, or the link is incorrect.
      </p>
      <Link
        href="/shop"
        className="rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
      >
        Back to shop
      </Link>
    </div>
  );
}
