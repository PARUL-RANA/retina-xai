import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import { MVP_NAV_ITEMS } from "@/components/app-shell/nav-config"

const BOTTOM_ITEMS = MVP_NAV_ITEMS.filter((item) => item.mobileBottom)

export default function MobileBottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-[#C9DCD5] bg-[#F6F9F7] lg:hidden"
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
                    "relative flex min-h-12 flex-col items-center justify-center gap-1 px-1 py-2 text-[10px] font-medium tracking-[0.1em] outline-none transition-colors duration-200 ease-in-out",
                    "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#3E9D96]/60",
                    isActive
                      ? "rounded-t-xl bg-[#E2F0ED] text-[#185B56] after:absolute after:inset-x-6 after:top-0 after:h-0.5 after:rounded-full after:bg-[#3E9D96]"
                      : "text-[#587270] hover:text-[#173B3A]"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn("size-5", isActive && "text-[#185B56]")}
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
