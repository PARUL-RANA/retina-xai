import { useState } from "react"
import { AlertTriangle, FileDown, Send, ShieldAlert } from "lucide-react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { getMockReport } from "@/data/reportMockData"
import { getScreeningSession } from "@/data/screeningSession"

const LESION_ROWS = [
  ["Microaneurysms", "microaneurysms"],
  ["Hemorrhages", "hemorrhages"],
  ["Hard exudates", "hardExudates"],
]

export default function ReportScreen() {
  const { patientId = "Unknown" } = useParams()
  const safePatientId = patientId && patientId !== "undefined" ? patientId : "Unknown"
  const session = getScreeningSession()
  const sessionPatientId = session?.patient?.patientId
  const sessionMatchesRoute = sessionPatientId === safePatientId
  const sessionImage = sessionMatchesRoute
    ? session.capture?.leftEye?.image?.url ?? session.capture?.rightEye?.image?.url ?? null
    : null
  const report = {
    ...getMockReport(safePatientId),
    images: { original: sessionImage },
  }
  const [notice, setNotice] = useState("")

  function showNotice(message) {
    setNotice(message)
  }

  return (
    <div className="space-y-6 pb-4 sm:space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium tracking-[0.18em] text-cyan">REPORT</p>
          <h1 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
            Patient {report.patientId} <span className="text-muted-foreground">·</span>{" "}
            <time dateTime="2026-09-07" className="text-muted-foreground">{report.date}</time>
          </h1>
        </div>
        <p className="text-xs text-muted-foreground">Original</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:items-start">
        <section aria-labelledby="retinal-image-heading" className="min-w-0">
          <div className="overflow-hidden rounded-xl border border-border/70 bg-surface-secondary">
            <div className="flex min-h-[300px] items-center justify-center px-6 py-10 text-center sm:min-h-[440px]">
              {report.images.original ? (
                <img src={report.images.original} alt={`Original retinal image for patient ${report.patientId}`} className="image-appear max-h-[520px] w-full object-contain" />
              ) : (
                <div>
                  <p id="retinal-image-heading" className="flex items-center justify-center gap-2 text-sm font-medium tracking-[0.12em] text-muted-foreground">
                    <ShieldAlert className="size-4" aria-hidden="true" /> RETINAL IMAGE
                  </p>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    Image preview unavailable in prototype mode.
                  </p>
                </div>
              )}
            </div>
            <div className="border-t border-border/60 px-4 py-3">
              <p className="text-xs font-medium tracking-[0.16em] text-cyan">ORIGINAL</p>
            </div>
          </div>
        </section>

        <div className="space-y-5">
          <section aria-labelledby="result-heading" className="rounded-xl border border-border/70 bg-surface/30 p-5 sm:p-6">
            <p className="text-[11px] font-medium tracking-[0.18em] text-cyan">SCREENING RESULT</p>
            <h2 id="result-heading" className="mt-3 text-xl font-semibold uppercase tracking-wide sm:text-2xl">
              {report.severity.label} <span className="text-muted-foreground">· Level {report.severity.level}</span>
            </h2>
            <p className="mt-4 border-l-2 border-cyan/60 pl-3 text-sm leading-relaxed text-muted-foreground">
              {report.assessmentType}<br />
              <span className="text-foreground">{report.disclaimer}</span>
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-lg border border-border/60 bg-background/40 p-4">
                <p className="text-[10px] font-medium tracking-[0.16em] text-muted-foreground">STATUS</p>
                <p className="mt-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <AlertTriangle className="size-4 text-cyan" aria-hidden="true" />
                  <span>{report.referable ? "REFERABLE" : "NOT REFERABLE"}</span>
                </p>
              </div>
              <div className="rounded-lg border border-border/60 bg-background/40 p-4">
                <p className="text-[10px] font-medium tracking-[0.16em] text-muted-foreground">CONFIDENCE</p>
                <p className="mt-2 text-lg font-semibold tabular-nums">{report.confidence}%</p>
              </div>
            </div>
          </section>

          <section aria-labelledby="lesion-summary-heading" className="rounded-xl border border-border/70 bg-surface/30 p-5 sm:p-6">
            <h2 id="lesion-summary-heading" className="text-[11px] font-medium tracking-[0.18em] text-cyan">LESION SUMMARY</h2>
            <p className="mt-2 text-xs text-muted-foreground">Mock backend evidence for this prototype report.</p>
            <dl className="mt-5 divide-y divide-border/60">
              {LESION_ROWS.map(([label, key]) => (
                <div key={key} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="font-semibold tabular-nums text-foreground">{report.lesions[key]}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>

      <div className="-mt-2 flex flex-col gap-3 border-t border-border/60 pt-5 sm:-mt-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="min-h-6 text-sm text-muted-foreground" role="status" aria-live="polite">{notice}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="button" variant="outline" size="lg" className="min-h-12 gap-2" onClick={() => showNotice("Export is not yet connected.")}>
            <FileDown className="size-4" aria-hidden="true" /> Export
          </Button>
          <Button type="button" variant="outline" size="lg" className="min-h-12 gap-2" onClick={() => showNotice("Review workflow will be connected in the next phase.")}>
            <Send className="size-4" aria-hidden="true" /> Send for Review
          </Button>
        </div>
      </div>
    </div>
  )
}
