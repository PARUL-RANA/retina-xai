import { cn } from "@/lib/utils"

export default function DashboardStats({ stats }) {
  return (
    <section aria-label="Screening summary">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <li
            key={stat.id}
            className={cn(
              "rounded-2xl border px-4 py-4 transition-[border-color,background-color,transform] duration-200 ease-in-out hover:-translate-y-px",
              stat.id === "pending-sync" && "border-[#E5D4B7] bg-[#FCF8F0] hover:border-[#D9B977]",
              stat.id === "refer" && "border-[#E5C8C8] bg-[#FDF7F6] hover:border-[#DFA4A4]",
              stat.id === "today" && "border-[#C9DCD5] bg-[#F9FBF8] hover:border-[#9EC9BD]"
            )}
          >
            <p className="text-[10px] font-semibold tracking-[0.18em] text-[#587270] uppercase">
              {stat.label}
            </p>
            <p className="mt-2 flex items-baseline gap-2">
              <span className="text-[2rem] font-semibold tracking-tight text-[#173B3A] tabular-nums">
                {stat.value}
              </span>
              <span className="text-sm text-[#587270]">
                {stat.description}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
