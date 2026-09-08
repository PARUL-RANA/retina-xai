import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import { MVP_NAV_ITEMS } from "@/components/app-shell/nav-config"
import ConnectivityIndicator from "@/components/app-shell/ConnectivityIndicator"

export default function AppSidebar({ connectivityStatus = "ONLINE" }) {
  return (
    <aside
      className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-border/60 bg-sidebar lg:flex"
      aria-label="Application"
    >
      <div className="flex h-16 items-center border-b border-border/60 px-6">
        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-[0.18em] text-foreground">
            RETINA-XAI
          </p>
          <p className="mt-1 text-[10px] tracking-[0.14em] text-muted-foreground">
            PHC WORKSTATION
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4" aria-label="Primary">
        {MVP_NAV_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.id}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex min-h-12 items-center gap-3 rounded-control border-l-2 border-transparent px-3 text-sm tracking-wide outline-none transition-[background-color,color,border-color] duration-standard ease-clinical",
                  "focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar",
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

      <div className="border-t border-border/60 px-6 py-5">
        <ConnectivityIndicator status={connectivityStatus} />
      </div>
    </aside>
  )
}
