import { useState } from "react"
import { AlertTriangle, FileDown, Send, ShieldAlert } from "lucide-react"
import { jsPDF } from "jspdf"
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
  const [isGenerating, setIsGenerating] = useState(false)

  function showNotice(message) {
    setNotice(message)
  }

  function sanitizeFileName(value) {
    const safeValue = String(value ?? "patient").trim()
    return safeValue.replace(/[^a-zA-Z0-9_-]+/g, "_").replace(/^_+|_+$/g, "") || "patient"
  }

  async function loadImageDataUrl(src) {
    if (!src) return null

    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const maxWidth = 420
        const maxHeight = 280
        const ratio = Math.min(maxWidth / img.width, maxHeight / img.height, 1)
        canvas.width = Math.max(1, Math.round(img.width * ratio))
        canvas.height = Math.max(1, Math.round(img.height * ratio))
        const context = canvas.getContext("2d")

        if (!context) {
          resolve(null)
          return
        }

        context.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL("image/jpeg", 0.92))
      }
      img.onerror = () => resolve(null)
      img.crossOrigin = "anonymous"
      img.src = src
    })
  }

  async function handleExportReport() {
    if (isGenerating) return

    setIsGenerating(true)
    setNotice("Generating...")

    try {
      const doc = new jsPDF({ unit: "mm", format: "a4" })
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const margin = 14
      const primaryColor = [23, 59, 58]
      const accentColor = [22, 90, 86]
      const mutedColor = [88, 114, 112]
      const softFill = [226, 240, 237]
      const panelFill = [249, 251, 248]

      doc.setFillColor(...softFill)
      doc.rect(0, 0, pageWidth, 38, "F")
      doc.setTextColor(...primaryColor)
      doc.setFont("helvetica", "bold")
      doc.setFontSize(18)
      doc.text("RETINA-XAI", margin, 18)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(9)
      doc.text("Explainable Retinal Intelligence", margin, 25)
      doc.setFont("helvetica", "bold")
      doc.setFontSize(13)
      doc.text("DIABETIC RETINOPATHY SCREENING REPORT", margin, 33)

      doc.setTextColor(...primaryColor)
      doc.setFont("helvetica", "bold")
      doc.setFontSize(11)
      doc.text("PATIENT INFORMATION", margin, 52)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      doc.text(`Patient ID: ${report.patientId}`, margin, 60)
      doc.text(`Screening Date: ${report.date}`, margin, 67)

      doc.setDrawColor(...accentColor)
      doc.setFillColor(...panelFill)
      doc.roundedRect(margin, 76, pageWidth - margin * 2, 44, 3, 3, "FD")
      doc.setTextColor(...primaryColor)
      doc.setFont("helvetica", "bold")
      doc.setFontSize(11)
      doc.text("SCREENING RESULT", margin + 4, 86)
      doc.setFont("helvetica", "bold")
      doc.setFontSize(16)
      doc.text(report.severity.label, margin + 4, 97)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      doc.text(`Level: ${report.severity.level}`, margin + 4, 104)
      doc.text(`Status: ${report.referable ? "REFERABLE" : "NOT REFERABLE"}`, margin + 4, 111)
      doc.text(`Confidence: ${report.confidence}%`, margin + 4, 118)

      doc.setTextColor(...primaryColor)
      doc.setFont("helvetica", "bold")
      doc.setFontSize(11)
      doc.text("FINDINGS / LESION SUMMARY", margin, 132)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      const lesionRows = [
        ["Microaneurysms", String(report.lesions.microaneurysms)],
        ["Hemorrhages", String(report.lesions.hemorrhages)],
        ["Hard exudates", String(report.lesions.hardExudates)],
      ]
      let lesionY = 140
      lesionRows.forEach(([label, value]) => {
        doc.setDrawColor(201, 214, 213)
        doc.line(margin, lesionY, pageWidth - margin, lesionY)
        doc.text(label, margin, lesionY + 6)
        doc.text(value, pageWidth - margin - 18, lesionY + 6, { align: "right" })
        lesionY += 11
      })

      doc.setTextColor(...primaryColor)
      doc.setFont("helvetica", "bold")
      doc.setFontSize(11)
      doc.text("RETINAL IMAGE", margin, 190)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      const imageSource = report.images.original

      if (imageSource) {
        const base64Image = await loadImageDataUrl(imageSource)
        if (base64Image) {
          const imageX = margin
          const imageY = 198
          const imageWidth = pageWidth - margin * 2
          const imageHeight = 70
          doc.setDrawColor(201, 214, 213)
          doc.roundedRect(imageX, imageY, imageWidth, imageHeight, 3, 3, "S")
          doc.addImage(base64Image, "JPEG", imageX + 4, imageY + 4, imageWidth - 8, imageHeight - 8)
        } else {
          doc.text("Image preview unavailable.", margin, 205)
        }
      } else {
        doc.text("Image preview unavailable.", margin, 205)
      }

      doc.setTextColor(...primaryColor)
      doc.setFont("helvetica", "bold")
      doc.setFontSize(11)
      doc.text("ASSESSMENT NOTICE", margin, 282)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(9)
      doc.text("AI screening assessment — not a confirmed diagnosis.", margin, 289)
      doc.text("This report is intended to support screening and referral decisions. Clinical confirmation should be performed by an appropriately qualified healthcare professional.", margin, 295, { maxWidth: pageWidth - margin * 2 })

      doc.setDrawColor(201, 214, 213)
      doc.line(margin, 308, pageWidth - margin, 308)
      doc.setTextColor(...mutedColor)
      doc.setFontSize(8)
      doc.text("RETINA-XAI", margin, 314)
      doc.text("AI-assisted screening decision support.", margin + 50, 314)
      doc.text("Prototype report — clinical confirmation required.", margin, 319)

      const safeFileName = `${sanitizeFileName(report.patientId)}.pdf`
      doc.save(`RETINA-XAI_Report_${safeFileName}`)
      setNotice("Report downloaded.")
    } catch (error) {
      console.error("[REPORT EXPORT ERROR]", error)
      setNotice("Unable to generate the report. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6 pb-4 sm:space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3 rounded-[1.5rem] border border-[#C9DCD5] bg-[#E2F0ED] px-4 py-4 sm:px-5">
        <div>
          <p className="text-[11px] font-medium tracking-[0.18em] text-[#185B56] uppercase">REPORT</p>
          <h1 className="mt-2 text-xl font-semibold tracking-tight text-[#173B3A] sm:text-2xl">
            Patient {report.patientId} <span className="text-[#587270]">·</span>{" "}
            <time dateTime="2026-09-07" className="text-[#587270]">{report.date}</time>
          </h1>
        </div>
        <p className="text-xs font-medium tracking-[0.16em] text-[#587270] uppercase">Original</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:items-start">
        <section aria-labelledby="retinal-image-heading" className="min-w-0">
          <div className="overflow-hidden rounded-[1.5rem] border border-[#C9DCD5] bg-[#E2F0ED]">
            <div className="flex min-h-[300px] items-center justify-center bg-[#F9FBF8] px-6 py-10 text-center sm:min-h-[440px]">
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
          <section aria-labelledby="result-heading" className="rounded-[1.25rem] border border-[#C9DCD5] bg-[#F9FBF8] p-5 sm:p-6">
            <p className="text-[11px] font-medium tracking-[0.18em] text-[#185B56] uppercase">SCREENING RESULT</p>
            <h2 id="result-heading" className="mt-3 text-xl font-semibold uppercase tracking-wide sm:text-2xl">
              {report.severity.label} <span className="text-muted-foreground">· Level {report.severity.level}</span>
            </h2>
            <p className="mt-4 border-l-2 border-cyan/60 pl-3 text-sm leading-relaxed text-muted-foreground">
              {report.assessmentType}<br />
              <span className="text-foreground">{report.disclaimer}</span>
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-xl border border-[#C9DCD5] bg-[#EEF5F3] p-4">
                <p className="text-[10px] font-medium tracking-[0.16em] text-[#587270] uppercase">STATUS</p>
                <p className="mt-2 flex items-center gap-2 text-sm font-medium text-[#173B3A]">
                  <AlertTriangle className="size-4 text-[#C85F5F]" aria-hidden="true" />
                  <span>{report.referable ? "REFERABLE" : "NOT REFERABLE"}</span>
                </p>
              </div>
              <div className="rounded-xl border border-[#C9DCD5] bg-[#EEF5F3] p-4">
                <p className="text-[10px] font-medium tracking-[0.16em] text-[#587270] uppercase">CONFIDENCE</p>
                <p className="mt-2 text-lg font-semibold tabular-nums text-[#173B3A]">{report.confidence}%</p>
              </div>
            </div>
          </section>

          <section aria-labelledby="lesion-summary-heading" className="rounded-[1.25rem] border border-[#C9DCD5] bg-[#F9FBF8] p-5 sm:p-6">
            <h2 id="lesion-summary-heading" className="text-[11px] font-medium tracking-[0.18em] text-[#185B56] uppercase">LESION SUMMARY</h2>
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
          <Button type="button" variant="outline" size="lg" className="min-h-12 gap-2" onClick={handleExportReport} disabled={isGenerating}>
            <FileDown className="size-4" aria-hidden="true" /> {isGenerating ? "Generating..." : "Export"}
          </Button>
          <Button type="button" variant="outline" size="lg" className="min-h-12 gap-2" onClick={() => showNotice("Review workflow will be connected in the next phase.")}>
            <Send className="size-4" aria-hidden="true" /> Send for Review
          </Button>
        </div>
      </div>
    </div>
  )
}
