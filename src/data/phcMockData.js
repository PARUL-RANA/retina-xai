/**
 * PHC Home mock data — replace with API/backend values later.
 * No network detection or sync logic in Step 2.
 */

/** @type {"ONLINE" | "OFFLINE" | "SYNCING"} */
export const connectivityState = "ONLINE"

export const phcContext = {
  operatorName: "Operator",
  phcId: "PHC-004",
  phcName: "RETINA-XAI PHC",
  pendingSyncCount: 3,
}

export const dashboardStats = [
  {
    id: "today",
    label: "Today",
    value: 24,
    description: "screened",
  },
  {
    id: "pending-sync",
    label: "Pending",
    value: 3,
    description: "waiting",
  },
  {
    id: "refer",
    label: "Refer",
    value: 4,
    description: "flagged",
  },
]

/**
 * @typedef {"complete" | "review" | "synced"} ScreeningStatus
 */

export const recentScreenings = [
  {
    id: "P1024",
    status: "complete",
    statusLabel: "Complete",
    level: "Level 1",
  },
  {
    id: "P1025",
    status: "review",
    statusLabel: "Needs Review",
    level: "Level 2",
  },
  {
    id: "P1026",
    status: "synced",
    statusLabel: "Synced",
    level: "Level 0",
  },
]
