import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const STAGES = ["Patient", "Capture", "Quality", "Processing"]

export default function ScreeningProgress({ currentStep }) {
  return (
    <div className="space-y-3" aria-label={`Step ${currentStep} of 4`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
          Step {currentStep} of 4
        </p>
        <p className="text-xs text-muted-foreground">Screening workflow</p>
      </div>
      <ol className="grid grid-cols-4 gap-2">
        {STAGES.map((stage, index) => {
          const step = index + 1
          const isCurrent = step === currentStep
          const isComplete = step < currentStep

          return (
            <li key={stage} className="min-w-0">
              <div
                className={cn(
                  "flex min-h-12 items-center gap-2 rounded-control border-t-2 px-2 pt-2 text-xs transition-[background-color,border-color,color] duration-standard ease-clinical",
                  isCurrent
                    ? "border-primary bg-soft-teal text-foreground"
                    : isComplete
                      ? "border-cyan/60 text-muted-foreground"
                      : "border-border/70 text-muted-foreground/60"
                )}
              >
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold",
                    isCurrent || isComplete
                      ? "border-cyan text-cyan"
                      : "border-border/70"
                  )}
                >
                  {isComplete ? <Check className="size-3" aria-hidden="true" /> : step}
                </span>
                <span className="truncate">{stage}</span>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}