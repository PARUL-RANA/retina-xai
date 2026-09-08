import { Check, RefreshCw, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

const STATUS_META = {
  complete: {
    Icon: Check,
    className: "text-cyan",
  },
  review: {
    Icon: RefreshCw,
    className: "text-violet",
  },
  synced: {
    Icon: Upload,
    className: "text-muted-foreground",
  },
}

export default function RecentScreeningRow({ screening }) {
  const meta = STATUS_META[screening.status] ?? STATUS_META.complete
  const Icon = meta.Icon

  return (
    <li>
      <div
        className={cn(
          "grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 border border-transparent px-4 py-4 transition-[background-color,border-color] duration-fast",
          "hover:border-border/50 hover:bg-muted/30",
          "focus-within:border-border/50 focus-within:bg-muted/30"
        )}
      >
        <p className="min-w-0 truncate font-medium tracking-wide text-foreground">
          {screening.id}
        </p>

        <p
          className={cn(
            "inline-flex min-w-[6.5rem] items-center gap-1.5 text-sm",
            meta.className
          )}
        >
          <Icon className="size-3.5 shrink-0" aria-hidden="true" strokeWidth={2.25} />
          <span>{screening.statusLabel}</span>
          <span className="sr-only">status</span>
        </p>

        <p className="min-w-[4.5rem] text-right text-sm text-muted-foreground tabular-nums">
          {screening.level}
        </p>
      </div>
    </li>
  )
}
