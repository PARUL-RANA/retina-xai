import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { ArrowRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ScreeningCTA() {
  return (
    <section
      aria-labelledby="screening-cta-heading"
      className="relative overflow-hidden rounded-2xl border border-[#B8D8CE] bg-[#E2F0ED] px-5 py-6 shadow-[0_12px_28px_rgba(24,91,86,0.08)] sm:px-7 sm:py-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.2em] text-[#287A72] uppercase">
            READY TO SCREEN
          </p>
          <h2
            id="screening-cta-heading"
            className="mt-2 text-xl font-semibold tracking-tight text-[#173B3A] sm:text-2xl"
          >
            START NEW SCREENING
          </h2>
        </div>
      </div>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#587270] sm:text-base">
        Screen a patient in a few simple steps with the PHC triage workflow.
      </p>

      <motion.div
        className="mt-5"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Button
          size="lg"
          nativeButton={false}
          render={<Link to="/app/screen" />}
          className="h-12 min-h-12 w-full gap-2 px-5 text-sm font-semibold tracking-[0.04em] shadow-[0_6px_14px_rgba(24,91,86,0.16)] sm:w-auto sm:min-w-[230px]"
        >
          <Plus className="size-4" aria-hidden="true" />
          Start Screening
          <ArrowRight className="ml-auto size-4 sm:ml-1" aria-hidden="true" />
        </Button>
      </motion.div>
    </section>
  )
}
