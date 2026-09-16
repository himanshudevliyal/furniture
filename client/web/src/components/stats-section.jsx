const stats = [
  { value: "25+", label: "Years of Experience" },
  { value: "1000+", label: "Workspaces Delivered" },
  { value: "50+", label: "Furniture Solutions" },
  { value: "100%", label: "Customization Support" },
  { value: "B2B", label: "Workspace Solutions" },
{ value: "Complete", label: "Project Support" },];

export default function StatsSection() {
  return (
    <section className="w-full bg-gray-100 px-6 py-20 md:px-14 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4 md:gap-x-10 lg:gap-y-20">
        <div className="col-span-2">
  <h2 className="text-3xl font-medium tracking-tight text-neutral-900 md:text-4xl">
    Natraj by the numbers
  </h2>

  <p className="mt-4  leading-relaxed text-neutral-400 text-xl">
    Built around quality, customization and complete furniture solutions for
    modern professional workspaces.
  </p>
</div>

    {stats.slice(0, 2).map((stat) => (
  <div
    className="flex w-full flex-col justify-end"
    key={stat.label}
  >
    <p className="font-sans text-4xl font-medium leading-none tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
      {stat.value}
    </p>
    <p className="mt-3 text-sm text-neutral-900">
      {stat.label}
    </p>
  </div>
))}

{stats.slice(2).map((stat) => (
  <div key={stat.label}>
    <p className="font-sans text-4xl font-medium leading-none tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
      {stat.value}
    </p>
    <p className="mt-3 text-sm text-neutral-900">
      {stat.label}
    </p>
  </div>
))}
      </div>
    </section>
  );
}
