import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import { MVP_NAV_ITEMS } from "@/components/app-shell/nav-config"

const BOTTOM_ITEMS = MVP_NAV_ITEMS.filter((item) => item.mobileBottom)

export default function MobileBottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border/70 bg-background/98 lg:hidden"
      aria-label="Primary mobile"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around px-1 pb-[env(safe-area-inset-bottom)]">
        {BOTTOM_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.id} className="flex-1">
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "relative flex min-h-12 flex-col items-center justify-center gap-1 px-1 py-2 text-[10px] font-medium tracking-[0.1em] outline-none transition-colors duration-fast",
                    "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/60",
                    isActive
                      ? "text-foreground after:absolute after:inset-x-6 after:top-0 after:h-0.5 after:bg-cyan"
                      : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn("size-5", isActive && "drop-shadow-[0_0_6px_oklch(0.78_0.12_195_/0.45)]")}
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
