import { Square } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Offline banner — UI only. Show when connectivityState === "OFFLINE".
 * Does not detect network or sync; pendingCount comes from app state later.
 */
export default function OfflineBanner({
  pendingCount = 0,
  className,
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "rounded-xl border border-border/70 bg-muted/40 px-4 py-4 sm:px-5",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Square
          className="mt-0.5 size-3.5 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p className="text-[11px] font-medium tracking-[0.16em] text-foreground">
            OFFLINE
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {pendingCount} {pendingCount === 1 ? "case" : "cases"} waiting to sync
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Your screening data is safely stored on this device and will sync
            automatically when connection returns.
          </p>
        </div>
      </div>
    </div>
  )
}
