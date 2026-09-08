import { ArrowLeft, ArrowRight, Check, CircleX, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

const EYES = [
  { key: "leftEye", label: "LEFT EYE" },
  { key: "rightEye", label: "RIGHT EYE" },
]

export default function QualityStep({ quality, onBack, onContinue, onCaptureAgain }) {
  const failedEye = EYES.find(({ key }) => quality[key]?.status === "not_usable")
  const isUsable = !failedEye

  return (
    <section aria-labelledby="quality-step-heading" className="space-y-6">
      <div>
        <p className="text-[11px] font-medium tracking-[0.18em] text-cyan">STEP 3</p>
        <h2 id="quality-step-heading" className="mt-2 text-2xl font-semibold tracking-tight">IMAGE QUALITY</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Confirm that both retinal images are usable before analysis.
        </p>
      </div>

      <div className="max-w-2xl rounded-card border border-border/70 bg-surface/30 p-5 sm:p-7" role="status" aria-live="polite">
        <div className="flex items-start gap-4">
          {isUsable ? (
            <Check className="mt-0.5 size-6 shrink-0 text-cyan" aria-hidden="true" />
          ) : (
            <CircleX className="mt-0.5 size-6 shrink-0 text-destructive" aria-hidden="true" />
          )}
          <div className="min-w-0">
            <h3 className="text-lg font-semibold">{isUsable ? "IMAGE USABLE" : "IMAGE NOT USABLE"}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {isUsable
                ? "Both retinal images meet the minimum quality required for analysis."
                : `${failedEye.label} needs to be captured again.`}
            </p>
          </div>
        </div>

        <ul className="mt-6 divide-y divide-border/60 border-t border-border/60" aria-label="Eye image quality status">
          {EYES.map(({ key, label }) => {
            const eyeIsUsable = quality[key]?.status === "usable"
            return (
              <li key={key} className="flex min-h-14 items-center justify-between gap-4 rounded-control px-3 py-3 even:bg-background/20">
                <span className="text-sm font-medium tracking-wide">{label}</span>
                <span className="flex items-center gap-2 text-sm">
                  {eyeIsUsable ? (
                    <Check className="size-4 text-cyan" aria-hidden="true" />
                  ) : (
                    <CircleX className="size-4 text-destructive" aria-hidden="true" />
                  )}
                  <span className={eyeIsUsable ? "text-muted-foreground" : "text-destructive"}>
                    {eyeIsUsable ? "Usable" : "Not usable"}
                  </span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" variant="outline" size="lg" className="min-h-12 gap-2" onClick={onBack}>
          <ArrowLeft className="size-4" aria-hidden="true" /> Back
        </Button>
        {isUsable ? (
          <Button type="button" size="lg" className="min-h-12 min-w-36 gap-2" onClick={onContinue}>
            Continue <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button type="button" size="lg" className="min-h-12 gap-2" onClick={() => onCaptureAgain(failedEye.key)}>
            <RotateCcw className="size-4" aria-hidden="true" /> Capture Again
          </Button>
        )}
      </div>
    </section>
  )
}
