import { FileText, Home, RefreshCw, ScanEye, Smartphone, UserRound, Users } from "lucide-react"

/**
 * Authenticated app navigation.
 * MVP items are shown in the shell. Phase 2 items stay registered for later work.
 */
export const APP_NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
    to: "/app",
    icon: Home,
    end: true,
    title: "PHC HOME",
    mobileBottom: true,
    phase: "mvp",
  },
  {
    id: "screen",
    label: "Screen",
    to: "/app/screen",
    icon: ScanEye,
    title: "SCREENING",
    mobileBottom: true,
    phase: "mvp",
  },
  {
    id: "patients",
    label: "Patients",
    to: "/app/patients",
    icon: Users,
    title: "PATIENTS",
    mobileBottom: true,
    phase: "mvp",
  },
  {
    id: "account",
    label: "Account",
    to: "/app/account",
    icon: UserRound,
    title: "ACCOUNT",
    mobileBottom: false,
    phase: "mvp",
  },
  {
    id: "report",
    label: "Report",
    to: "/app/report",
    icon: FileText,
    title: "REPORT",
    mobileBottom: false,
    phase: "mvp",
    navHidden: true,
  },
  {
    id: "sync",
    label: "Sync",
    to: "/app/sync",
    icon: RefreshCw,
    title: "SYNC",
    mobileBottom: false,
    phase: "phase2",
  },
  {
    id: "device",
    label: "Device",
    to: "/app/device",
    icon: Smartphone,
    title: "DEVICE",
    mobileBottom: false,
    phase: "phase2",
  },
]

export const MVP_NAV_ITEMS = APP_NAV_ITEMS.filter(
  (item) => item.phase === "mvp" && !item.navHidden
)

export const PHASE2_NAV_ITEMS = APP_NAV_ITEMS.filter((item) => item.phase === "phase2")

export function getNavItemByPath(pathname) {
  if (pathname.startsWith("/app/report")) {
    return APP_NAV_ITEMS.find((item) => item.id === "report")
  }

  const exact = APP_NAV_ITEMS.find((item) => item.to === pathname)
  if (exact) return exact

  if (pathname === "/app/account") {
    return APP_NAV_ITEMS.find((item) => item.id === "account")
  }

  return APP_NAV_ITEMS.find((item) => item.end && pathname === item.to) ?? APP_NAV_ITEMS[0]
}
