import { useState } from "react"
import { Check, CircleAlert, Clock3, Search } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { patientRecords } from "@/data/patientsMockData"

const FILTERS = ["All", "Referable", "Reviewed", "Pending"]

const STATUS_META = {
  Complete: { Icon: Check, label: "Complete" },
  "Needs Review": { Icon: CircleAlert, label: "Needs Review" },
  Pending: { Icon: Clock3, label: "Pending" },
}

function matchesFilter(patient, filter) {
  if (filter === "Referable") return patient.referable
  if (filter === "Reviewed") return patient.reviewed
  if (filter === "Pending") return patient.status === "Pending"
  return true
}

function PatientRecord({ patient }) {
  const meta = STATUS_META[patient.status] ?? STATUS_META.Pending
  const Icon = meta.Icon

  return (
    <li className="border-t border-border/60 first:border-t-0">
      <div className="grid gap-3 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_7rem_9rem_6rem_auto] sm:items-center sm:gap-4 sm:px-5">
        <div className="min-w-0">
          <p className="font-medium tracking-wide text-foreground">{patient.patientId}</p>
          <p className="mt-1 text-xs text-muted-foreground sm:hidden">{patient.date}</p>
        </div>
        <p className="hidden text-sm text-muted-foreground sm:block">{patient.date}</p>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon className="size-4 shrink-0 text-cyan" aria-hidden="true" />
          <span>{meta.label}</span>
        </p>
        <p className="text-sm text-muted-foreground">Level {patient.level}</p>
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={<Link to={`/app/report/${encodeURIComponent(patient.patientId)}`} />}
          className="min-h-11 w-full sm:w-auto"
        >
          View
        </Button>
      </div>
    </li>
  )
}

export default function PatientsScreen() {
  const [query, setQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const normalizedQuery = query.trim().toLowerCase()
  const visiblePatients = patientRecords.filter((patient) => {
    const matchesSearch = patient.patientId.toLowerCase().includes(normalizedQuery)
    return matchesSearch && matchesFilter(patient, activeFilter)
  })

  return (
    <div className="space-y-6 pb-4 sm:space-y-8">
      <header>
        <p className="text-[11px] font-medium tracking-[0.18em] text-cyan">PATIENTS</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Patients</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Screening records from this PHC.</p>
      </header>

      <section aria-label="Patient search and filters" className="space-y-4">
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="patient-search" className="sr-only">Search by Patient ID</label>
          <input
            id="patient-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by Patient ID"
            autoComplete="off"
            className="flex h-12 w-full rounded-lg border border-input bg-card pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Patient filters">
          {FILTERS.map((filter) => {
            const isActive = filter === activeFilter
            return (
              <Button
                key={filter}
                type="button"
                variant={isActive ? "default" : "outline"}
                size="sm"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter)}
                className="min-h-11"
              >
                {filter}
                {isActive && <span className="sr-only"> selected</span>}
              </Button>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="patient-list-heading" className="overflow-hidden rounded-xl border border-border/70 bg-surface/30">
        <h2 id="patient-list-heading" className="sr-only">Patient screening records</h2>
        <div className="hidden grid-cols-[minmax(0,1fr)_7rem_9rem_6rem_auto] gap-4 border-b border-border/70 px-5 py-3 text-[10px] font-medium tracking-[0.16em] text-muted-foreground uppercase sm:grid">
          <span>Patient ID</span>
          <span>Date</span>
          <span>Status</span>
          <span>DR level</span>
          <span className="sr-only">Action</span>
        </div>
        {visiblePatients.length > 0 ? (
          <ul aria-live="polite">
            {visiblePatients.map((patient) => <PatientRecord key={patient.patientId} patient={patient} />)}
          </ul>
        ) : (
          <div className="px-5 py-12 text-center" role="status">
            <p className="font-medium text-foreground">No patients found</p>
            <p className="mt-2 text-sm text-muted-foreground">Try a different Patient ID or filter.</p>
          </div>
        )}
      </section>
    </div>
  )
}
