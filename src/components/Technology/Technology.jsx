import { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "motion/react"

/**
 * Visual placeholders only — not real medical analysis.
 * Replace with backend-driven values when the analysis API is connected.
 */
const ANALYSIS_PLACEHOLDER = {
  label: "AI ANALYSIS",
  status: "ONLINE",
  confidence: "94.2%",
  evidence: "DETECTED",
}

const FEATURES = [
  {
    title: "EXPLAINABLE",
    body: "Understand what influenced the AI prediction.",
  },
  {
    title: "CLINICAL",
    body: "Designed around clinically relevant retinal evidence.",
  },
  {
    title: "HUMAN-IN-THE-LOOP",
    body: "AI supports screening decisions without replacing clinical judgment.",
  },
]

const DETECTION_POINTS = [
  { x: "32%", y: "38%" },
  { x: "58%", y: "44%" },
  { x: "44%", y: "62%" },
  { x: "68%", y: "56%" },
]

function AnalysisVisual({ progress }) {
  const scanY = useTransform(progress, [0.15, 0.55], ["8%", "88%"])
  const overlayOpacity = useTransform(progress, [0.1, 0.35], [0, 1])
  const heatmapOpacity = useTransform(progress, [0.35, 0.6], [0, 0.85])
  const linesOpacity = useTransform(progress, [0.45, 0.7], [0, 1])
  const pointsOpacity = useTransform(progress, [0.25, 0.5], [0, 1])
  const frameOpacity = useTransform(progress, [0, 0.2], [0.55, 1])
  const frameY = useTransform(progress, [0, 0.25], [28, 0])

  return (
    <motion.div
      style={{ opacity: frameOpacity, y: frameY }}
      className="relative overflow-hidden rounded-2xl border border-border/70 bg-surface-secondary shadow-subtle"
    >
      <div className="relative aspect-[5/4] w-full sm:aspect-[4/3]">
        <div
          className="absolute inset-0"
          style={{
            background: "var(--surface-secondary)",
          }}
        />

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 320"
          fill="none"
          aria-hidden="true"
        >
          <ellipse
            cx="192"
            cy="148"
            rx="118"
            ry="112"
            stroke="oklch(0.78 0.12 195 / 0.22)"
            strokeWidth="1"
          />
          <path
            d="M128 78 C158 118, 168 158, 162 228"
            stroke="oklch(0.78 0.12 195 / 0.35)"
            strokeWidth="1.1"
          />
          <path
            d="M258 82 C230 128, 220 168, 228 230"
            stroke="oklch(0.62 0.16 290 / 0.32)"
            strokeWidth="1.1"
          />
          <path
            d="M168 100 C188 140, 198 170, 205 210"
            stroke="oklch(0.78 0.12 195 / 0.2)"
            strokeWidth="0.8"
          />
          <circle
            cx="236"
            cy="138"
            r="16"
            stroke="oklch(0.85 0.08 85 / 0.35)"
            fill="oklch(0.7 0.1 75 / 0.12)"
          />
        </svg>

        <motion.div
          style={{ opacity: heatmapOpacity }}
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div
            className="absolute left-[28%] top-[34%] size-[22%] rounded-full blur-2xl"
            style={{ background: "oklch(0.7 0.16 25 / 0.35)" }}
          />
          <div
            className="absolute left-[52%] top-[48%] size-[18%] rounded-full blur-2xl"
            style={{ background: "oklch(0.78 0.12 195 / 0.28)" }}
          />
          <div
            className="absolute left-[40%] top-[55%] size-[14%] rounded-full blur-xl"
            style={{ background: "oklch(0.85 0.12 90 / 0.22)" }}
          />
        </motion.div>

        <motion.svg
          style={{ opacity: linesOpacity }}
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 400 320"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M128 120 L72 72"
            stroke="oklch(0.78 0.12 195 / 0.45)"
            strokeWidth="0.8"
          />
          <path
            d="M232 150 L320 88"
            stroke="oklch(0.62 0.16 290 / 0.4)"
            strokeWidth="0.8"
          />
          <path
            d="M176 198 L96 250"
            stroke="oklch(0.78 0.12 195 / 0.35)"
            strokeWidth="0.8"
          />
          <circle cx="72" cy="72" r="2.5" fill="oklch(0.78 0.12 195 / 0.7)" />
          <circle cx="320" cy="88" r="2.5" fill="oklch(0.62 0.16 290 / 0.7)" />
          <circle cx="96" cy="250" r="2.5" fill="oklch(0.78 0.12 195 / 0.55)" />
        </motion.svg>

        <motion.div
          style={{ opacity: pointsOpacity }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          {DETECTION_POINTS.map((point) => (
            <span
              key={`${point.x}-${point.y}`}
              className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_10px_oklch(0.78_0.12_195_/0.65)]"
              style={{ left: point.x, top: point.y }}
            />
          ))}
        </motion.div>

        <motion.div
          style={{ top: scanY, opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-x-[8%] h-px bg-gradient-to-r from-transparent via-cyan/70 to-transparent shadow-[0_0_12px_oklch(0.78_0.12_195_/0.5)]"
          aria-hidden="true"
        />
        <motion.div
          style={{ top: scanY, opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-x-[8%] h-10 -translate-y-1/2 bg-gradient-to-b from-cyan/10 to-transparent"
          aria-hidden="true"
        />

        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute left-3 top-3 rounded-md border border-border/70 bg-background px-2.5 py-1.5 sm:left-4 sm:top-4"
        >
          <p className="text-[9px] tracking-[0.16em] text-muted-foreground">
            {ANALYSIS_PLACEHOLDER.label}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[10px] font-medium tracking-[0.14em] text-cyan">
            <span className="size-1.5 rounded-full bg-cyan shadow-[0_0_6px_oklch(0.78_0.12_195_/0.8)]" />
            {ANALYSIS_PLACEHOLDER.status}
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: linesOpacity }}
          className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 sm:bottom-4 sm:left-4 sm:right-auto"
        >
          <div className="rounded-md border border-border/70 bg-background px-2.5 py-1.5">
            <p className="text-[9px] tracking-[0.14em] text-muted-foreground">CONFIDENCE</p>
            <p className="mt-0.5 text-[11px] font-medium tracking-wide text-cyan">
              {ANALYSIS_PLACEHOLDER.confidence}
            </p>
          </div>
          <div className="rounded-md border border-border/70 bg-background px-2.5 py-1.5">
            <p className="text-[9px] tracking-[0.14em] text-muted-foreground">EVIDENCE</p>
            <p className="mt-0.5 text-[11px] font-medium tracking-wide text-foreground">
              {ANALYSIS_PLACEHOLDER.evidence}
            </p>
          </div>
        </motion.div>

        <p className="absolute right-3 top-3 text-[9px] tracking-[0.14em] text-muted-foreground/70 sm:right-4 sm:top-4">
          VISUAL PREVIEW
        </p>
      </div>
    </motion.div>
  )
}

export default function Technology() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const textY = useTransform(scrollYProgress, [0.1, 0.35], [22, 0])
  const textOpacity = useTransform(scrollYProgress, [0.08, 0.28], [0.35, 1])
  const inView = useInView(sectionRef, { once: true, margin: "-12% 0px" })

  return (
    <section
      ref={sectionRef}
      id="technology"
      className="scroll-mt-20 overflow-x-clip border-b border-border/60 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:gap-12 sm:px-6 md:grid-cols-2 md:gap-10 lg:gap-20 lg:px-8">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="order-1 min-w-0">
          <p className="mb-4 text-[11px] font-medium tracking-[0.22em] text-violet">
            TECHNOLOGY
          </p>

          <h2 className="max-w-md text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            INTELLIGENCE
            <br />
            YOU CAN SEE.
          </h2>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            RETINA-XAI brings explainable artificial intelligence to diabetic
            retinopathy screening, turning retinal images into interpretable clinical
            evidence.
          </p>

          <a
            href="#explainable-ai"
            className="mt-8 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-cyan transition-colors hover:text-cyan/80"
          >
            EXPLORE THE TECHNOLOGY
            <span aria-hidden="true">→</span>
          </a>

          <ul className="mt-10 space-y-5 border-t border-border/50 pt-8">
            {FEATURES.map((feature, index) => (
              <motion.li
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{
                  duration: 0.45,
                  delay: 0.35 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <p className="text-[11px] font-medium tracking-[0.18em] text-cyan">
                  {feature.title}
                </p>
                <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {feature.body}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <div className="order-2 min-w-0">
          <AnalysisVisual progress={scrollYProgress} />
        </div>
      </div>
    </section>
  )
}
