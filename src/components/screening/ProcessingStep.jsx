import { ArrowLeft, ArrowRight, Check, Circle, LoaderCircle, ScanSearch, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

const STATUS_ITEMS = [
  { id: "uploading", label: "Uploading", detail: "Preparing retinal images", Icon: Upload },
  { id: "analyzing", label: "Analyzing", detail: "Evaluating retinal features", Icon: ScanSearch },
  { id: "done", label: "Done", detail: "Analysis complete", Icon: Check },
]

export default function ProcessingStep({ status, onBack, onViewReport }) {
  const currentIndex = STATUS_ITEMS.findIndex((item) => item.id === status)

  return (
    <section aria-labelledby="processing-step-heading" className="space-y-6">
      <div>
        <p className="text-[11px] font-medium tracking-[0.18em] text-cyan">STEP 4</p>
        <h2 id="processing-step-heading" className="mt-2 text-2xl font-semibold tracking-tight">PROCESSING</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {status === "done" ? "Your screening is ready for review." : "Your images are ready. Analysis is in progress."}
        </p>
      </div>

      {status === "done" && (
        <div className="max-w-2xl rounded-card border border-border/70 bg-surface/30 p-5 sm:p-7" role="status" aria-live="polite">
          <div className="flex items-start gap-4">
            <Check className="mt-0.5 size-6 shrink-0 text-cyan" aria-hidden="true" />
            <div>
              <h3 className="text-lg font-semibold">ANALYSIS COMPLETE</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The frontend processing simulation is complete. Your screening is ready for review.
              </p>
            </div>
          </div>
        </div>
      )}

      <ol className="max-w-2xl divide-y divide-border/60 rounded-card border border-border/70 bg-surface/30" aria-label="Processing stages" aria-live="polite">
        {STATUS_ITEMS.map(({ id, label, detail, Icon }, index) => {
          const isCurrent = id === status
          const isComplete = index < currentIndex
          const isFuture = !isCurrent && !isComplete
          return (
            <li key={id} className="flex min-h-16 items-center gap-4 px-5">
              <span className={isCurrent || isComplete ? "text-cyan" : "text-muted-foreground/50"}>
                {isCurrent && id !== "done" ? <LoaderCircle className="size-5 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : isFuture ? <Circle className="size-5" aria-hidden="true" /> : <Icon className="size-5" aria-hidden="true" />}
              </span>
              <span className="min-w-0">
                <span className={isCurrent ? "block font-medium text-foreground" : isComplete ? "block text-muted-foreground" : "block text-muted-foreground/50"}>{label}</span>
                <span className={isFuture ? "mt-0.5 block text-xs text-muted-foreground/50" : "mt-0.5 block text-xs text-muted-foreground"}>{detail}</span>
              </span>
              {isComplete && <Check className="ml-auto size-4 text-cyan" aria-label={`${label} complete`} />}
            </li>
          )
        })}
      </ol>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {status === "done" ? (
          <Button type="button" variant="outline" size="lg" className="min-h-12 gap-2" onClick={onBack}>
            <ArrowLeft className="size-4" aria-hidden="true" /> Back
          </Button>
        ) : <span />}
        {status === "done" && (
          <Button type="button" size="lg" className="min-h-12 min-w-40 gap-2" onClick={onViewReport}>
            View Report <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        )}
      </div>
    </section>
  )
}