export default function DashboardStats({ stats }) {
  return (
    <section aria-label="Screening summary">
      <ul className="grid grid-cols-1 divide-y divide-border/60 border-y border-border/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
          <li
            key={stat.id}
            className="px-1 py-4 first:pt-4 last:pb-4 sm:px-5 sm:py-3"
          >
            <p className="text-[10px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
              {stat.label}
            </p>
            <p className="mt-1.5 flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">
                {stat.description}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
