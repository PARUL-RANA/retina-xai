import RecentScreeningRow from "@/components/phc-home/RecentScreeningRow"

export default function RecentScreenings({ screenings }) {
  return (
    <section aria-labelledby="recent-screenings-heading" className="space-y-3">
      <h2
        id="recent-screenings-heading"
        className="text-[10px] font-semibold tracking-[0.2em] text-[#587270] uppercase"
      >
        Recent Screenings
      </h2>

      <ul className="overflow-hidden rounded-2xl border border-[#C9DCD5] bg-[#F9FBF8] shadow-[0_8px_20px_rgba(23,59,58,0.04)]">
        {screenings.map((screening) => (
          <RecentScreeningRow key={screening.id} screening={screening} />
        ))}
      </ul>
    </section>
  )
}
