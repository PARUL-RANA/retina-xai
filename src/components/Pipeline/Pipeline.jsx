import { motion } from "motion/react"
import {
  Camera,
  ScanSearch,
  Sparkles,
  CircleDot,
  Crosshair,
  Gauge,
  Layers,
  Stethoscope,
} from "lucide-react"

const STAGES = [
  { label: "IMAGE CAPTURE", icon: Camera },
  { label: "QUALITY ASSESSMENT", icon: ScanSearch },
  { label: "ENHANCEMENT", icon: Sparkles },
  { label: "RETINAL SEGMENTATION", icon: CircleDot },
  { label: "LESION DETECTION", icon: Crosshair },
  { label: "DR GRADING", icon: Gauge },
  { label: "GRAD-CAM", icon: Layers },
  { label: "CLINICIAN REVIEW", icon: Stethoscope },
]

export default function Pipeline() {
  return (
    <section id="technology" className="scroll-mt-20 border-b border-border/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-[11px] font-medium tracking-[0.22em] text-violet">
            TECHNOLOGY PREVIEW
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            FROM IMAGE TO CLINICAL EVIDENCE
          </h2>
          <p className="mt-4 text-muted-foreground">
            A clinical pipeline designed for screening environments — visual overview only.
          </p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((stage, index) => {
            const Icon = stage.icon
            return (
              <motion.article
                key={stage.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                whileHover={{ y: -3 }}
                className="group glass rounded-xl p-4 transition-colors hover:border-cyan/30"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.18em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon className="size-4 text-cyan/80 transition-colors group-hover:text-cyan" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-medium tracking-wide text-foreground">
                  {stage.label}
                </h3>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
