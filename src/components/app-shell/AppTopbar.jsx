import { LogOut, Menu, ScanEye, X } from "lucide-react"
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
  onLogout,
  logoutPending = false,
}) {
  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[#C9DCD5] bg-[#F6F9F7] px-4 sm:px-6">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-11 shrink-0 text-[#173B3A] lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="app-mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={onMenuToggle}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>

        <div className="min-w-0 flex-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D6EAE6] bg-[#EEF7F3] px-2.5 py-1.5 shadow-[inset_0_0_0_1px_rgba(24,91,86,0.03)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3E9D96]" aria-hidden="true" />
            <h1 className="truncate text-[10px] font-semibold tracking-[0.2em] text-[#173B3A] uppercase sm:text-[11px]">
              {title}
            </h1>
          </div>
        </div>

        <ConnectivityIndicator
          status={connectivityStatus}
          className="shrink-0 text-[#173B3A] lg:hidden"
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
              className="fixed inset-y-0 left-0 z-50 flex w-64 max-w-[85vw] flex-col border-r border-[#2F6F6A] bg-[#185B56] text-[#F3F6F1] lg:hidden"
            >
              <div className="relative overflow-hidden border-b border-[#2F6F6A] bg-[linear-gradient(180deg,#1E6B67_0%,#185B56_100%)] px-5 py-4">
                <div className="absolute inset-y-0 left-0 w-[2px] bg-[#D3E9DD]/80" aria-hidden="true" />
                <div className="relative flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C5E5DF]/40 bg-[#E2F0ED]/10 text-[#EAF4F2]">
                    <ScanEye className="size-3.5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold tracking-[0.24em] text-[#F4F9F7] uppercase">
                      RETINA-XAI
                    </p>
                    <p className="mt-1 text-[7px] tracking-[0.18em] text-[#CFEAE5] uppercase">
                      PHC WORKSTATION
                    </p>
                  </div>
                </div>
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
                          "flex min-h-12 items-center gap-3 rounded-xl border border-transparent px-3 text-sm font-medium tracking-wide outline-none transition-colors duration-200 ease-in-out",
                          "focus-visible:ring-2 focus-visible:ring-[#B4E1D7]",
                          isActive
                            ? "border-[#C9DCD5]/60 bg-[#E2F0ED] text-[#185B56]"
                            : "text-[#EAF4F2] hover:bg-[#1F6A65] hover:text-[#F3F6F1]"
                        )
                      }
                    >
                      <Icon className="size-4 shrink-0" aria-hidden="true" />
                      {item.label}
                    </NavLink>
                  )
                })}
              </nav>
              <div className="border-t border-[#2F6F6A] px-5 py-5">
                <ConnectivityIndicator status={connectivityStatus} className="text-[#EAF4F2]" />
                <button
                  type="button"
                  onClick={onLogout}
                  disabled={logoutPending}
                  className="mt-4 flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium tracking-wide text-[#D7EAE7] outline-none transition-colors duration-200 hover:bg-[#1F6A65] hover:text-[#F3F6F1] focus-visible:ring-2 focus-visible:ring-[#B4E1D7] disabled:cursor-wait disabled:opacity-60"
                >
                  <LogOut className="size-4 shrink-0" aria-hidden="true" />
                  {logoutPending ? "Logging out..." : "Log out"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
