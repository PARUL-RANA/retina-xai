import { Check, RefreshCw, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

const STATUS_META = {
  complete: {
    Icon: Check,
    className: "text-[#3F8F68]",
  },
  review: {
    Icon: RefreshCw,
    className: "text-[#C58A3A]",
  },
  synced: {
    Icon: Upload,
    className: "text-[#3F8F68]",
  },
}

export default function RecentScreeningRow({ screening }) {
  const meta = STATUS_META[screening.status] ?? STATUS_META.complete
  const Icon = meta.Icon

  return (
    <li>
      <div
        className={cn(
          "grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 border border-transparent px-4 py-4 transition-[border-color,background-color] duration-200 ease-in-out sm:px-5",
          "hover:border-[#C9DCD5] hover:bg-[#E2F0ED]",
          "focus-within:border-[#C9DCD5] focus-within:bg-[#E2F0ED]",
          "not-last:border-b not-last:border-b-[#DCE8E3]"
        )}
      >
        <p className="min-w-0 truncate font-semibold tracking-wide text-[#173B3A]">
          {screening.id}
        </p>

        <p
          className={cn(
            "inline-flex min-w-[6.5rem] items-center gap-1.5 text-sm font-medium",
            meta.className
          )}
        >
          <Icon className="size-3.5 shrink-0" aria-hidden="true" strokeWidth={2.25} />
          <span>{screening.statusLabel}</span>
          <span className="sr-only">status</span>
        </p>

        <p className="min-w-[4.5rem] text-right text-sm font-medium text-[#587270] tabular-nums">
          {screening.level}
        </p>
      </div>
    </li>
  )
}
