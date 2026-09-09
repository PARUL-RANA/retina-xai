import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { ArrowDownRight, ArrowRight, CircleDot, ScanLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import retinalScan from "@/assets/retinal-scan.svg"

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
    <section className="relative overflow-hidden border-b border-[#C9DCD5] bg-[#F3F6F1]">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(#C9DCD5_1px,transparent_1px),linear-gradient(90deg,#C9DCD5_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_74%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:px-8 lg:py-24">
        <div className="relative z-10 min-w-0 text-center lg:pr-8 lg:text-left">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-5 text-[10px] font-semibold tracking-[0.24em] text-[#287A72]"
          >
            EXPLAINABLE RETINAL INTELLIGENCE
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-2xl text-5xl font-semibold tracking-[-0.05em] text-[#173B3A] sm:text-6xl lg:mx-0 lg:text-[5.3rem] lg:leading-[0.96]"
          >
            SEE WHAT
            <br />
            THE AI SEES.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-6 max-w-md text-base leading-relaxed text-[#587270] sm:text-lg md:mx-0"
          >
            Explainable retinal intelligence for accessible diabetic retinopathy screening.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" nativeButton={false} render={<Link to="/login" />} className="group min-h-12 gap-2 px-5 font-semibold tracking-[0.08em] shadow-[0_8px_18px_rgba(24,91,86,0.16)]">
                START SCREENING
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<a href="#technology" />}
                className="group min-h-12 gap-2 border-[#C9DCD5] bg-[#F9FBF8]/70 px-5 font-semibold tracking-[0.08em] text-[#185B56] hover:bg-[#E2F0ED] hover:text-[#173B3A]"
              >
                EXPLORE TECHNOLOGY
                <ArrowDownRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.ul
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2 md:items-start md:justify-start"
          >
            {STATUS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[10px] font-medium tracking-[0.12em] text-[#587270]"
              >
                <span className="size-1.5 rounded-full bg-[#3E9D96]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto min-h-[25rem] w-full max-w-[38rem] lg:min-h-[34rem]"
          aria-label="Retinal intelligence visualization"
          role="img"
        >
          <div className="absolute left-1/2 top-1/2 aspect-square w-[min(78vw,27rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9EC9BD] bg-[#E2F0ED]/70 shadow-[0_18px_50px_rgba(24,91,86,0.12)]" />
          <div className="absolute left-1/2 top-1/2 aspect-square w-[min(62vw,21rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#3E9D96]/70 bg-[#D3E9DD]/50" />
          <div className="absolute left-1/2 top-1/2 aspect-square w-[min(50vw,17rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-[#F3F6F1]/80 shadow-[0_12px_28px_rgba(24,91,86,0.16)]">
            <img
              src={retinalScan}
              alt="Conceptual retinal scan with mapped findings"
              className="h-full w-full object-cover"
            />
          </div>
          <svg className="absolute left-1/2 top-1/2 h-[min(58vw,20rem)] w-[min(58vw,20rem)] -translate-x-1/2 -translate-y-1/2" viewBox="0 0 320 320" fill="none" aria-hidden="true">
            <circle cx="160" cy="160" r="128" stroke="#287A72" strokeOpacity=".38" />
            <circle cx="160" cy="160" r="92" stroke="#3E9D96" strokeOpacity=".32" strokeDasharray="3 8" />
            <circle cx="160" cy="160" r="28" fill="#F3F6F1" stroke="#185B56" strokeWidth="1.5" />
            <path d="M160 132 C151 105 121 83 78 72 M160 134 C171 103 205 83 247 70 M151 148 C120 137 89 139 53 158 M169 148 C205 132 239 140 278 164 M151 173 C115 194 99 226 95 265 M169 173 C204 188 223 222 225 264" stroke="#287A72" strokeWidth="2" strokeLinecap="round" strokeOpacity=".72" />
            <path d="M154 139 C139 122 127 109 116 89 M178 142 C193 120 208 103 225 88 M143 164 C116 168 94 180 76 204 M177 164 C207 166 229 181 247 205 M159 181 C153 210 153 235 161 269" stroke="#3E9D96" strokeWidth="1.2" strokeLinecap="round" strokeOpacity=".68" />
            <circle cx="116" cy="89" r="4" fill="#C58A3A" />
            <circle cx="225" cy="88" r="4" fill="#3F8F68" />
            <circle cx="76" cy="204" r="4" fill="#C85F5F" />
            <circle cx="247" cy="205" r="4" fill="#C58A3A" />
          </svg>

          <div className="absolute left-0 top-[16%] border-l-2 border-[#3E9D96] bg-[#F9FBF8] px-3 py-2 shadow-[0_8px_18px_rgba(23,59,58,0.08)] sm:left-[4%]">
            <p className="text-[9px] font-semibold tracking-[0.16em] text-[#587270]">MICROANEURYSMS</p>
            <p className="mt-1 text-sm font-semibold text-[#173B3A]">17 FINDINGS</p>
          </div>
          <div className="absolute right-0 top-[31%] border-l-2 border-[#3F8F68] bg-[#F9FBF8] px-3 py-2 shadow-[0_8px_18px_rgba(23,59,58,0.08)] sm:right-[2%]">
            <p className="text-[9px] font-semibold tracking-[0.16em] text-[#587270]">IMAGE QUALITY</p>
            <p className="mt-1 text-sm font-semibold text-[#3F8F68]">USABLE</p>
          </div>
          <div className="absolute bottom-[13%] left-[7%] border-l-2 border-[#C58A3A] bg-[#F9FBF8] px-3 py-2 shadow-[0_8px_18px_rgba(23,59,58,0.08)] sm:left-[14%]">
            <p className="text-[9px] font-semibold tracking-[0.16em] text-[#587270]">SCREENING LEVEL</p>
            <p className="mt-1 text-sm font-semibold text-[#936323]">LEVEL 2</p>
          </div>
          <div className="absolute bottom-[19%] right-[2%] border-l-2 border-[#185B56] bg-[#F9FBF8] px-3 py-2 shadow-[0_8px_18px_rgba(23,59,58,0.08)] sm:right-[10%]">
            <p className="text-[9px] font-semibold tracking-[0.16em] text-[#587270]">ASSESSMENT</p>
            <p className="mt-1 text-sm font-semibold text-[#185B56]">REVIEW</p>
          </div>
          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2 text-[9px] font-semibold tracking-[0.2em] text-[#287A72]">
            <ScanLine className="size-4" aria-hidden="true" />
            AI SCREENING MAP
          </div>
          <CircleDot className="absolute left-[20%] top-[7%] size-4 text-[#3E9D96]" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  )
}
