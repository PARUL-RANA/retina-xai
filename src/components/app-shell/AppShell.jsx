import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { motion } from "motion/react"
import AppSidebar from "@/components/app-shell/AppSidebar"
import AppTopbar from "@/components/app-shell/AppTopbar"
import MobileBottomNav from "@/components/app-shell/MobileBottomNav"
import { getNavItemByPath } from "@/components/app-shell/nav-config"

/**
 * Authenticated application shell.
 * Page content is provided via <Outlet /> — no page-specific logic here.
 *
 * @param {"ONLINE" | "OFFLINE" | "SYNCING"} connectivityStatus
 */
export default function AppShell({ connectivityStatus = "ONLINE" }) {
  const { pathname } = useLocation()
  const [menuPath, setMenuPath] = useState(null)
  const menuOpen = menuPath === pathname
  const current = getNavItemByPath(pathname)

  return (
    <div className="min-h-svh overflow-x-hidden bg-background text-foreground">
      <AppSidebar connectivityStatus={connectivityStatus} />

      <div className="flex min-h-svh flex-col lg:pl-60">
        <AppTopbar
          title={current.title}
          connectivityStatus={connectivityStatus}
          menuOpen={menuOpen}
          onMenuToggle={() =>
            setMenuPath((prev) => (prev === pathname ? null : pathname))
          }
        />

        <main className="flex-1 overflow-x-hidden px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-8">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-5xl"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  )
}
