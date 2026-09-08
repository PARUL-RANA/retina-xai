import RecentScreeningRow from "@/components/phc-home/RecentScreeningRow"

export default function RecentScreenings({ screenings }) {
  return (
    <section aria-labelledby="recent-screenings-heading">
      <h2
        id="recent-screenings-heading"
        className="text-[11px] font-medium tracking-[0.18em] text-foreground"
      >
        RECENT SCREENINGS
      </h2>

      <ul className="mt-3 divide-y divide-border/50 rounded-card border border-border/60 bg-surface/20">
        {screenings.map((screening) => (
          <RecentScreeningRow key={screening.id} screening={screening} />
        ))}
      </ul>
    </section>
  )
}
