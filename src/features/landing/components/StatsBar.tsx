import { stats } from "../data";

export function StatsBar() {
  return (
    <section className="border-y border-white/5">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/5 md:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-1 px-6 py-6 text-center"
          >
            <span className="font-display text-xl font-semibold tracking-wide">
              {stat.value}
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
