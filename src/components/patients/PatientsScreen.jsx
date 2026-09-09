import { useEffect, useState } from "react"
import { Check, CircleAlert, Clock3, Search } from "lucide-react"
import { Link } from "react-router-dom"
import { collection, doc, getDoc, getDocs, query as firestoreQuery, where } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"

const FILTERS = ["All", "Referable", "Reviewed", "Pending"]

const STATUS_META = {
  Complete: { Icon: Check, label: "Complete" },
  "Needs Review": { Icon: CircleAlert, label: "Needs Review" },
  Pending: { Icon: Clock3, label: "Pending" },
}

function matchesFilter(patient, filter) {
  if (filter === "Referable") return Boolean(patient.referable)
  if (filter === "Reviewed") return Boolean(patient.reviewed)
  if (filter === "Pending") return patient.status === "Pending"
  return true
}

function formatFirestoreDate(value) {
  if (!value) return "—"
  if (typeof value.toDate === "function") {
    return value.toDate().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
  }
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return "—"
  return parsed.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

function PatientRecord({ patient }) {
  const meta = STATUS_META[patient.status] ?? STATUS_META.Pending
  const Icon = meta.Icon

  return (
    <li className="border-t border-border/60 first:border-t-0">
      <div className="grid gap-3 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_7rem_9rem_6rem_auto] sm:items-center sm:gap-4 sm:px-5">
        <div className="min-w-0">
          <p className="font-medium tracking-wide text-foreground">{patient.patientId}</p>
          <p className="mt-1 text-xs text-muted-foreground">{patient.patientName || "Unknown patient"}</p>
          <p className="mt-1 text-xs text-muted-foreground sm:hidden">{formatFirestoreDate(patient.createdAt)}</p>
        </div>
        <p className="hidden text-sm text-muted-foreground sm:block">{formatFirestoreDate(patient.createdAt)}</p>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon className="size-4 shrink-0 text-cyan" aria-hidden="true" />
          <span>{meta.label}</span>
        </p>
        <div className="text-sm text-muted-foreground">
          <p>Age {patient.age ?? "—"}</p>
          <p className="mt-1">DM {patient.diabetesDuration ?? "—"}y</p>
        </div>
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
  const [patients, setPatients] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    async function loadPatients() {
      const currentUser = auth.currentUser

      if (!currentUser) {
        if (isMounted) {
          setPatients([])
          setIsLoading(false)
          setError("")
        }
        return
      }

      try {
        const profileSnap = await getDoc(doc(db, "users", currentUser.uid))
        const profile = profileSnap.exists() ? profileSnap.data() : null
        const phcId = profile?.phcId

        if (!phcId) {
          throw new Error("Your PHC profile is missing.")
        }

        const patientQuery = firestoreQuery(
          collection(db, "patients"),
          where("phcId", "==", phcId),
        )
        const patientSnapshot = await getDocs(patientQuery)

        const nextPatients = patientSnapshot.docs.map((patientDoc) => {
          const patient = patientDoc.data()
          return {
            ...patient,
            id: patientDoc.id,
            patientId: patient.patientId || patientDoc.id,
            patientName: patient.patientName || "Unknown patient",
            age: patient.age,
            diabetesDuration: patient.diabetesDuration,
            createdAt: patient.createdAt,
            status: patient.reviewed ? "Complete" : "Pending",
            reviewed: Boolean(patient.reviewed),
            referable: Boolean(patient.referable),
            level: typeof patient.level === "number" ? patient.level : 0,
          }
        })

        if (isMounted) {
          setPatients(nextPatients)
          setError("")
        }
      } catch (loadError) {
        if (isMounted) {
          setPatients([])
          setError("Unable to load patient records right now. Please try again.")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadPatients()

    return () => {
      isMounted = false
    }
  }, [])

  const normalizedQuery = query.trim().toLowerCase()
  const visiblePatients = patients.filter((patient) => {
    const matchesSearch = patient.patientId.toLowerCase().includes(normalizedQuery)
    return matchesSearch && matchesFilter(patient, activeFilter)
  })

  return (
    <div className="space-y-6 pb-4 sm:space-y-8">
      <header className="rounded-[1.5rem] border border-[#C9DCD5] bg-[#E2F0ED] px-4 py-4 sm:px-5">
        <p className="text-[11px] font-medium tracking-[0.18em] text-[#185B56] uppercase">PATIENTS</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#173B3A] sm:text-3xl">Patients</h1>
        <p className="mt-2 text-sm leading-relaxed text-[#587270]">Screening records from this PHC.</p>
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
            className="flex h-12 w-full rounded-xl border border-[#C9DCD5] bg-[#F9FBF8] pl-10 pr-3 text-sm text-[#173B3A] outline-none transition-colors placeholder:text-[#587270] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
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

      <section aria-labelledby="patient-list-heading" className="overflow-hidden rounded-[1.25rem] border border-[#C9DCD5] bg-[#F9FBF8]">
        <h2 id="patient-list-heading" className="sr-only">Patient screening records</h2>
        <div className="hidden grid-cols-[minmax(0,1fr)_7rem_9rem_6rem_auto] gap-4 border-b border-[#C9DCD5] bg-[#EEF5F3] px-5 py-3 text-[10px] font-medium tracking-[0.16em] text-[#587270] uppercase sm:grid">
          <span>Patient ID</span>
          <span>Date</span>
          <span>Status</span>
          <span>Data</span>
          <span className="sr-only">Action</span>
        </div>

        {isLoading ? (
          <div className="px-5 py-12 text-center text-sm text-muted-foreground" role="status">
            Loading patient records...
          </div>
        ) : error ? (
          <div className="px-5 py-12 text-center" role="alert">
            <p className="font-medium text-foreground">Unable to load patient records</p>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          </div>
        ) : visiblePatients.length > 0 ? (
          <ul aria-live="polite">
            {visiblePatients.map((patient) => <PatientRecord key={patient.patientId} patient={patient} />)}
          </ul>
        ) : (
          <div className="px-5 py-12 text-center" role="status">
            <p className="font-medium text-foreground">No patients found</p>
            <p className="mt-2 text-sm text-muted-foreground">This PHC does not have any patient records yet.</p>
          </div>
        )}
      </section>
    </div>
  )
}
