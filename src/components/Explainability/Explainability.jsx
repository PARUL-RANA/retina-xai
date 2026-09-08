import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"

const EVIDENCE = [
  { count: 7, label: "Microaneurysms" },
  { count: 3, label: "Hemorrhages" },
  { count: 5, label: "Exudates" },
]

export default function Explainability() {
  return (
    <section id="explainable-ai" className="scroll-mt-20 border-b border-border/60 py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="glass relative aspect-[4/3] overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-surface-secondary" />
          <svg
            className="absolute inset-0 h-full w-full opacity-60"
            viewBox="0 0 400 300"
            fill="none"
            aria-hidden="true"
          >
            <ellipse cx="200" cy="150" rx="120" ry="110" stroke="oklch(0.78 0.12 195 / 0.35)" />
            <path d="M140 90 C170 130, 180 170, 175 220" stroke="oklch(0.78 0.12 195 / 0.4)" strokeWidth="1.2" />
            <path d="M260 95 C235 140, 225 175, 230 225" stroke="oklch(0.62 0.16 290 / 0.4)" strokeWidth="1.2" />
            <circle cx="230" cy="145" r="14" stroke="oklch(0.85 0.08 85 / 0.5)" fill="oklch(0.7 0.1 75 / 0.15)" />
            <circle cx="165" cy="170" r="4" fill="oklch(0.78 0.12 195 / 0.55)" />
            <circle cx="190" cy="195" r="3" fill="oklch(0.7 0.15 25 / 0.55)" />
            <circle cx="210" cy="175" r="3.5" fill="oklch(0.85 0.12 90 / 0.45)" />
            <rect x="150" y="130" width="70" height="55" rx="4" stroke="oklch(0.62 0.16 290 / 0.45)" strokeDasharray="4 3" />
          </svg>
          <div className="absolute left-4 top-4 rounded-md border border-border/70 bg-background px-2.5 py-1 text-[10px] tracking-[0.16em] text-muted-foreground">
            DEMO FUNDUS VIEW
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <p className="mb-3 text-[11px] font-medium tracking-[0.22em] text-cyan">
            EXPLAINABILITY PREVIEW
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            WHY DID THE AI MAKE THIS DECISION?
          </h2>
          <p className="mt-3 inline-flex rounded-md border border-violet/30 bg-violet/10 px-2.5 py-1 text-[10px] font-medium tracking-[0.16em] text-violet">
            DEMO DATA — NOT A REAL PREDICTION
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="glass rounded-xl p-4">
              <dt className="text-[10px] tracking-[0.14em] text-muted-foreground">GRADE</dt>
              <dd className="mt-2 text-sm font-medium text-foreground">Moderate NPDR</dd>
            </div>
            <div className="glass rounded-xl p-4">
              <dt className="text-[10px] tracking-[0.14em] text-muted-foreground">LEVEL</dt>
              <dd className="mt-2 text-sm font-medium text-foreground">Level 2</dd>
            </div>
            <div className="glass rounded-xl p-4">
              <dt className="text-[10px] tracking-[0.14em] text-muted-foreground">CONFIDENCE</dt>
              <dd className="mt-2 text-sm font-medium text-cyan">91.7%</dd>
            </div>
          </dl>

          <div className="mt-6">
            <h3 className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground">
              EVIDENCE
            </h3>
            <ul className="mt-3 space-y-2">
              {EVIDENCE.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-3 py-2.5 text-sm"
                >
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium text-foreground">{item.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <motion.div className="mt-8" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button size="lg" nativeButton={false} render={<Link to="/analysis" />} className="tracking-wide">
              EXPLORE EXPLANATION
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
