import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { ArrowRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ScreeningCTA() {
  return (
    <section
      aria-labelledby="screening-cta-heading"
      className="rounded-card border border-border/80 bg-surface/45 px-5 py-6 transition-colors duration-standard ease-clinical hover:border-cyan/35 sm:px-6 sm:py-7"
    >
      <h2
        id="screening-cta-heading"
        className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
      >
        START NEW SCREENING
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
        Screen a patient in a few simple steps
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
          className="h-12 min-h-12 w-full gap-2 px-5 text-sm font-medium tracking-wide transition-[background-color,transform] duration-standard ease-clinical sm:w-auto sm:min-w-[220px]"
        >
          <Plus className="size-4" aria-hidden="true" />
          Start Screening
          <ArrowRight className="ml-auto size-4 sm:ml-1" aria-hidden="true" />
        </Button>
      </motion.div>
    </section>
  )
}
