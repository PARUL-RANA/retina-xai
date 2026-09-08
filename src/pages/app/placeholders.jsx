/**
 * Remaining placeholder pages for AppShell route verification.
 * PHC Home is implemented in PHCDashboard (Step 2).
 */

import PHCDashboard from "@/components/phc-home/PHCDashboard"
import PatientsScreen from "@/components/patients/PatientsScreen"
import ReportScreen from "@/components/report/ReportScreen"
import ScreeningWizard from "@/components/screening/ScreeningWizard"

function Placeholder({ heading, detail }) {
  return (
    <div className="rounded-xl border border-border/60 bg-surface/40 px-5 py-8 sm:px-8">
      <p className="text-[11px] font-medium tracking-[0.18em] text-cyan">
        PLACEHOLDER
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {heading}
      </h2>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
        {detail}
      </p>
    </div>
  )
}

export function PhcHomePage() {
  return <PHCDashboard />
}

export function ScreenPage() {
  return <ScreeningWizard />
}

export function PatientsPage() {
  return <PatientsScreen />
}

export function SyncPage() {
  return (
    <Placeholder
      heading="SYNC"
      detail="Offline sync queue and status. Not implemented yet."
    />
  )
}

export function DevicePage() {
  return (
    <Placeholder
      heading="DEVICE"
      detail="Device pairing and camera status. Not implemented yet."
    />
  )
}

export function ReportPage() {
  return <ReportScreen />
}
