import { Circle, Square, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Connectivity status UI — mock only for Step 1.
 * Pass `status` from a future connectivity store/hook.
 *
 * @param {"ONLINE" | "OFFLINE" | "SYNCING"} status
 */
const STATUS_CONFIG = {
  ONLINE: {
    label: "Online",
    Icon: Circle,
    className: "text-status-success",
    iconClassName: "fill-status-success text-status-success",
  },
  OFFLINE: {
    label: "Offline",
    Icon: Square,
    className: "text-muted-foreground",
    iconClassName: "text-muted-foreground",
  },
  SYNCING: {
    label: "Syncing",
    Icon: RefreshCw,
    className: "text-status-warning",
    iconClassName: "text-status-warning animate-spin",
  },
}

export default function ConnectivityIndicator({
  status = "ONLINE",
  className,
  compact = false,
}) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.ONLINE
  const Icon = config.Icon

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Connectivity: ${config.label}`}
      className={cn(
        "inline-flex items-center gap-2 text-xs tracking-wide",
        config.className,
        className
      )}
    >
      <Icon
        className={cn("size-3 shrink-0", config.iconClassName)}
        aria-hidden="true"
        strokeWidth={status === "ONLINE" ? 0 : 2}
      />
      <span className={cn(compact && "sr-only sm:not-sr-only")}>{config.label}</span>
    </div>
  )
}
