import { useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "How It Works", to: "/#technology" },
  { label: "Explainable AI", to: "/#explainable-ai" },
  { label: "Clinical Workflow", to: "/#technology" },
  { label: "Research", to: "/#research" },
  { label: "About", to: "/#about" },
]

function isNavActive(to, pathname, hash) {
  if (to === "/") return pathname === "/" && (!hash || hash === "")
  if (to.startsWith("/#")) {
    return pathname === "/" && hash === to.slice(1)
  }
  return pathname === to
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-border/80 bg-background/70 backdrop-blur-xl"
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <Link to="/" className="group flex min-w-0 flex-col" onClick={() => setOpen(false)}>
          <span className="text-sm font-semibold tracking-[0.18em] text-foreground transition-colors group-hover:text-cyan">
            RETINA-XAI
          </span>
          <span className="hidden text-[10px] tracking-[0.14em] text-muted-foreground sm:block">
            EXPLAINABLE RETINAL INTELLIGENCE
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isNavActive(link.to, pathname, hash)
            return (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  className={cn(
                    "rounded-md px-3 py-2 text-xs font-medium tracking-wide transition-colors",
                    active
                      ? "text-cyan"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="outline" size="sm" nativeButton={false} render={<Link to="/login" />} className="min-w-20 border-border/80">
            Login
          </Button>
          <Button size="sm" nativeButton={false} render={<Link to="/login" />} className="min-w-20 glow-cyan">
            Sign Up
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
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
            className="overflow-hidden border-t border-border/80 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {NAV_LINKS.map((link) => {
                const active = isNavActive(link.to, pathname, hash)
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-sm tracking-wide transition-colors",
                      active
                        ? "bg-muted text-cyan"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="mt-3 flex gap-2 border-t border-border/60 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  nativeButton={false}
                  render={<Link to="/login" onClick={() => setOpen(false)} />}
                >
                  Login
                </Button>
                <Button
                  className="flex-1"
                  nativeButton={false}
                  render={<Link to="/login" onClick={() => setOpen(false)} />}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
