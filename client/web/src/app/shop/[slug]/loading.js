import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      {/* ---------------- Product detail skeleton ---------------- */}
      <div className="bg-[#FBF1E7]">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-0 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-5 w-full max-w-md" />
              <Skeleton className="h-5 w-2/3 max-w-md" />

              <div className="mt-6 flex items-center gap-4">
                <Skeleton className="h-12 w-32 rounded-full" />
                <Skeleton className="h-12 flex-1 rounded-full" />
              </div>
            </div>

            <Skeleton className="aspect-[4/3] w-full lg:aspect-square" />
          </div>
        </div>
      </div>

      {/* ---------------- Tabs skeleton ---------------- */}
      <div className="border-b bg-gray-100 py-3">
        <div className="container mx-auto flex max-w-7xl gap-3 overflow-hidden px-4 md:px-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-[150px] shrink-0 rounded-sm" />
          ))}
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-14 md:px-0 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="mt-4 flex flex-col gap-3 border-t pt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-full max-w-sm" />
              ))}
            </div>
          </div>
          <Skeleton className="aspect-[4/3] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
