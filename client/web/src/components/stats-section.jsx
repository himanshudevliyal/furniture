const stats = [
  { value: "60%", label: "Returning customers" },
  { value: "35+", label: "Homes transformed" },
  { value: "8", label: "Years in service" },
  { value: "250+", label: "Spaces completed" },
  { value: "77", label: "Milestones reached" },
  { value: "24", label: "Honors received" },
];

export default function StatsSection() {
  return (
    <section className="w-full bg-gray-100 px-6 py-20 md:px-14 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4 md:gap-x-10 lg:gap-y-20">
        <div className="col-span-2">
          <h2 className="text-3xl font-medium tracking-tight text-neutral-900 md:text-6xl">
            Abode by the numbers
          </h2>
          <p className="mt-4 max-w-xs    leading-relaxed text-neutral-400  text-xl">
            See how Abode&rsquo;s results and impact set us apart in home
            design.
          </p>
        </div>

        {stats.slice(0, 2).map((stat) => (
          <div className="  flex justify-end  flex-col w-full" key={stat.label}>
            <p className="font-sans  text-6xl font-medium leading-none tracking-tight text-neutral-900 sm:text-7xl lg:text-8xl">
              {stat.value}
            </p>
            <p className="mt-4 text-[15px] text-neutral-900">{stat.label}</p>
          </div>
        ))}

        {stats.slice(2).map((stat) => (
          <div key={stat.label}>
            <p className="font-sans text-6xl font-medium leading-none tracking-tight text-neutral-900 sm:text-7xl lg:text-8xl">
              {stat.value}
            </p>
            <p className="mt-4 text-[15px] text-neutral-900">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
