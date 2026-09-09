import { NavLink } from "react-router-dom"
import { LogOut, ScanEye } from "lucide-react"
import { cn } from "@/lib/utils"
import { MVP_NAV_ITEMS } from "@/components/app-shell/nav-config"
import ConnectivityIndicator from "@/components/app-shell/ConnectivityIndicator"

export default function AppSidebar({
  connectivityStatus = "ONLINE",
  onLogout,
  logoutPending = false,
}) {
  return (
    <aside
      className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-[#2F6F6A] bg-[#185B56] text-[#F3F6F1] shadow-[0_18px_28px_rgba(15,46,44,0.12)] lg:flex"
      aria-label="Application"
    >
      <div className="relative overflow-hidden border-b border-[#2F6F6A] bg-[linear-gradient(180deg,#1E6B67_0%,#185B56_100%)] px-5 py-4">
        <div className="absolute inset-y-0 left-0 w-[2px] bg-[#D3E9DD]/80" aria-hidden="true" />
        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full border border-[#8CC9C2]/30 bg-[#2C7A75]/20 blur-[2px]" aria-hidden="true" />
        <div className="relative flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C5E5DF]/40 bg-[#E2F0ED]/10 text-[#EAF4F2]">
            <ScanEye className="size-4" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-[#F4F9F7] uppercase">
              RETINA-XAI
            </p>
            <p className="mt-1.5 text-[7.5px] font-medium tracking-[0.22em] text-[#CFEAE5] uppercase">
              Explainable Retinal Intelligence
            </p>
            <div className="mt-3 h-px w-full bg-gradient-to-r from-[#D3E9DD]/80 via-[#B8E0D9]/50 to-transparent" aria-hidden="true" />
            <p className="mt-3 text-[10px] font-semibold tracking-[0.22em] text-[#EAF4F2] uppercase">
              PHC WORKSTATION
            </p>
          </div>
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
                  "flex min-h-12 items-center gap-3 rounded-xl border border-transparent px-3 text-sm font-medium tracking-wide outline-none transition-colors duration-200 ease-in-out",
                  "focus-visible:ring-2 focus-visible:ring-[#B4E1D7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#185B56]",
                  isActive
                    ? "border-[#C9DCD5]/60 bg-[#E2F0ED] text-[#185B56] shadow-[inset_0_0_0_1px_rgba(24,91,86,0.08)]"
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

      <div className="border-t border-[#2F6F6A] px-4 py-4">
        <ConnectivityIndicator
          status={connectivityStatus}
          className="px-2 text-[#EAF4F2]"
        />
        <button
          type="button"
          onClick={onLogout}
          disabled={logoutPending}
          className="mt-3 flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium tracking-wide text-[#D7EAE7] outline-none transition-colors duration-200 hover:bg-[#1F6A65] hover:text-[#F3F6F1] focus-visible:ring-2 focus-visible:ring-[#B4E1D7] disabled:cursor-wait disabled:opacity-60"
        >
          <LogOut className="size-4 shrink-0" aria-hidden="true" />
          {logoutPending ? "Logging out..." : "Log out"}
        </button>
      </div>
    </aside>
  )
}
