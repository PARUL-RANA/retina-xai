import { motion } from "motion/react"
import OfflineBanner from "@/components/phc-home/OfflineBanner"
import ScreeningCTA from "@/components/phc-home/ScreeningCTA"
import DashboardStats from "@/components/phc-home/DashboardStats"
import RecentScreenings from "@/components/phc-home/RecentScreenings"
import ConnectivityIndicator from "@/components/app-shell/ConnectivityIndicator"
import {
  connectivityState,
  dashboardStats,
  phcContext,
  recentScreenings,
} from "@/data/phcMockData"

export default function PHCDashboard({
  connectivity = connectivityState,
  stats = dashboardStats,
  screenings = recentScreenings,
  context = phcContext,
}) {
  const isOffline = connectivity === "OFFLINE"

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6 sm:gap-8"
    >
      <header className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-[#C9DCD5] bg-[#F9FBF8] px-4 py-4 shadow-[0_8px_20px_rgba(23,59,58,0.04)] sm:px-5">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-[#587270] uppercase">
            OPERATIONS
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-[#173B3A] sm:text-[1.4rem]">
            Good morning, {context.operatorName}
          </h2>
          <p className="mt-1 text-sm font-medium tracking-[0.08em] text-[#587270]">
            {context.phcId}
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-[#C9DCD5] bg-[#E2F0ED] px-3 py-2">
          <ConnectivityIndicator status={connectivity} />
        </div>
      </header>

      {isOffline && (
        <OfflineBanner pendingCount={context.pendingSyncCount} />
      )}

      <ScreeningCTA />

      <DashboardStats stats={stats} />

      <RecentScreenings screenings={screenings} />
    </motion.div>
  )
}
