import { Menu, X } from "lucide-react"
import { NavLink } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MVP_NAV_ITEMS } from "@/components/app-shell/nav-config"
import ConnectivityIndicator from "@/components/app-shell/ConnectivityIndicator"

export default function AppTopbar({
  title,
  connectivityStatus = "ONLINE",
  menuOpen,
  onMenuToggle,
}) {
  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 bg-background/98 px-4 sm:px-6">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-11 shrink-0 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="app-mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={onMenuToggle}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xs font-medium tracking-[0.1em] text-muted-foreground sm:text-sm">
            {title}
          </h1>
        </div>

        <ConnectivityIndicator
          status={connectivityStatus}
          className="shrink-0 lg:hidden"
        />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/60 lg:hidden"
              aria-label="Close menu overlay"
              onClick={onMenuToggle}
            />
            <motion.div
              id="app-mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Application menu"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 flex w-64 max-w-[85vw] flex-col border-r border-border/60 bg-sidebar lg:hidden"
            >
              <div className="flex h-16 items-center border-b border-border/60 px-5">
                <p className="text-sm font-semibold tracking-[0.16em] text-foreground">
                  RETINA-XAI
                </p>
              </div>
              <nav className="flex flex-1 flex-col gap-2 p-4" aria-label="Mobile menu">
                {MVP_NAV_ITEMS.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavLink
                      key={item.id}
                      to={item.to}
                      end={item.end}
                      onClick={onMenuToggle}
                      className={({ isActive }) =>
                        cn(
                          "flex min-h-12 items-center gap-3 rounded-control border-l-2 border-transparent px-3 text-sm tracking-wide outline-none transition-[background-color,color,border-color] duration-standard ease-clinical",
                          "focus-visible:ring-2 focus-visible:ring-ring/60",
                          isActive
                            ? "border-l-primary bg-soft-teal pl-[10px] text-foreground"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        )
                      }
                    >
                      <Icon className="size-4 shrink-0" aria-hidden="true" />
                      {item.label}
                    </NavLink>
                  )
                })}
              </nav>
              <div className="border-t border-border/60 px-5 py-5">
                <ConnectivityIndicator status={connectivityStatus} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
