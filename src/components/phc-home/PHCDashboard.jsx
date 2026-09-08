import { motion } from "motion/react"
import OfflineBanner from "@/components/phc-home/OfflineBanner"
import ScreeningCTA from "@/components/phc-home/ScreeningCTA"
import DashboardStats from "@/components/phc-home/DashboardStats"
import RecentScreenings from "@/components/phc-home/RecentScreenings"
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
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-medium tracking-tight text-foreground sm:text-xl">
            Good morning, {context.operatorName}
          </h2>
          <p className="mt-1 text-sm tracking-wide text-muted-foreground">
            {context.phcId}
          </p>
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
