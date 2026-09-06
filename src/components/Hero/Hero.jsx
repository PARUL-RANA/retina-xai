import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import Retina3D from "@/components/Retina3D/Retina3D"

const STATUS = [
  "AI ENGINE ONLINE",
  "IMAGE PIPELINE READY",
  "NETWORK CONNECTED",
]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,oklch(0.78_0.12_195_/0.08),transparent_45%),radial-gradient(ellipse_at_80%_30%,oklch(0.62_0.16_290_/0.07),transparent_40%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div className="min-w-0">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-4 text-[11px] font-medium tracking-[0.22em] text-cyan"
          >
            EXPLAINABLE RETINAL INTELLIGENCE
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]"
          >
            SEE WHAT THE AI SEES.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Explainable retinal intelligence for accessible diabetic retinopathy screening.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap gap-3"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" nativeButton={false} render={<Link to="/analysis" />} className="glow-cyan px-5 tracking-wide">
                START SCREENING
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<a href="#technology" />}
                className="border-border/80 px-5 tracking-wide"
              >
                EXPLORE TECHNOLOGY
              </Button>
            </motion.div>
          </motion.div>

          <motion.ul
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2"
          >
            {STATUS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[11px] tracking-[0.12em] text-muted-foreground"
              >
                <span className="size-1.5 rounded-full bg-cyan shadow-[0_0_8px_oklch(0.78_0.12_195_/0.7)]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex w-full min-w-0 items-center justify-center lg:w-[50%] lg:max-w-[52%] lg:justify-end"
        >
          <Retina3D />
        </motion.div>
      </div>
    </section>
  )
}
