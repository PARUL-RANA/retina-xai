import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-[#B8D8CE] bg-[#EAF3EF]/95 shadow-[0_6px_20px_rgba(23,59,58,0.08)] backdrop-blur-sm"
    >
      <nav
        className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <Link
          to="/"
          className="group flex min-w-0 flex-col rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#3E9D96]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#EAF3EF]"
          onClick={() => setOpen(false)}
        >
          <span className="text-base font-bold tracking-[0.22em] text-[#185B56] transition-colors duration-200 group-hover:text-[#287A72]">
            RETINA-XAI
          </span>
          <span className="hidden text-[10px] font-medium tracking-[0.16em] text-[#587270] sm:block">
            EXPLAINABLE RETINAL INTELLIGENCE
          </span>
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link to="/login" />}
            className="min-h-11 min-w-20 border-[#B8D8CE] bg-[#E2F0ED] px-4 text-xs font-semibold tracking-[0.08em] text-[#185B56] hover:border-[#9EC9BD] hover:bg-[#D3E9DD] hover:text-[#173B3A]"
          >
            Login
          </Button>
          <Button
            size="sm"
            nativeButton={false}
            render={<Link to="/login" />}
            className="group min-h-12 min-w-[10.5rem] gap-2 px-5 text-xs font-semibold tracking-[0.1em] shadow-[0_6px_14px_rgba(24,91,86,0.16)] hover:-translate-y-px hover:shadow-[0_8px_16px_rgba(24,91,86,0.2)]"
          >
            START SCREENING
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="size-11 text-[#185B56] hover:bg-[#D3E9DD] hover:text-[#173B3A] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[#B8D8CE] bg-[#EAF3EF] lg:hidden"
          >
            <div className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:px-6">
                <Button
                  variant="outline"
                  className="min-h-11 flex-1 border-[#C9DCD5] bg-transparent text-[#185B56] hover:bg-[#E2F0ED] hover:text-[#173B3A]"
                  nativeButton={false}
                  render={<Link to="/login" onClick={() => setOpen(false)} />}
                >
                  Login
                </Button>
                <Button
                  className="group min-h-11 flex-1 gap-2 font-semibold tracking-[0.08em] shadow-[0_6px_14px_rgba(24,91,86,0.14)]"
                  nativeButton={false}
                  render={<Link to="/login" onClick={() => setOpen(false)} />}
                >
                  START SCREENING
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
