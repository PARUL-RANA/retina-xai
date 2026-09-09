import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PatientStep({ patient, errors, onChange, onContinue, isSaving = false }) {
  return (
    <section aria-labelledby="patient-step-heading" className="space-y-6">
      <div>
        <p className="text-[11px] font-medium tracking-[0.18em] text-cyan">STEP 1</p>
        <h2 id="patient-step-heading" className="mt-2 text-2xl font-semibold tracking-tight">
          PATIENT
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Enter the minimum information required to begin screening.
        </p>
      </div>

      <form className="max-w-2xl space-y-6" onSubmit={onContinue} noValidate>
        <div className="space-y-2">
          <label htmlFor="patient-id" className="text-sm font-medium">
            Patient ID
          </label>
          <input
            id="patient-id"
            name="patientId"
            type="text"
            placeholder="e.g. P1027"
            value={patient.id}
            onChange={(event) => onChange("id", event.target.value)}
            autoComplete="off"
            aria-invalid={Boolean(errors.id)}
            aria-describedby={errors.id ? "patient-id-error" : undefined}
            className="flex h-12 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
          {errors.id && <p id="patient-id-error" className="text-sm text-destructive" role="alert">{errors.id}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="patient-name" className="text-sm font-medium">
            Patient Name
          </label>
          <input
            id="patient-name"
            name="patientName"
            type="text"
            placeholder="Enter patient full name"
            value={patient.patientName || ""}
            onChange={(event) => onChange("patientName", event.target.value)}
            autoComplete="name"
            aria-invalid={Boolean(errors.patientName)}
            aria-describedby={errors.patientName ? "patient-name-error" : undefined}
            className="flex h-12 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
          {errors.patientName && <p id="patient-name-error" className="text-sm text-destructive" role="alert">{errors.patientName}</p>}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="patient-age" className="text-sm font-medium">Age</label>
            <input
              id="patient-age"
              name="age"
              type="number"
              min="1"
              inputMode="numeric"
              value={patient.age}
              onChange={(event) => onChange("age", event.target.value)}
              aria-invalid={Boolean(errors.age)}
              aria-describedby={errors.age ? "patient-age-error" : undefined}
              className="flex h-12 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
            {errors.age && <p id="patient-age-error" className="text-sm text-destructive" role="alert">{errors.age}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="diabetes-duration" className="text-sm font-medium">Diabetes duration</label>
            <div className="relative">
              <input
                id="diabetes-duration"
                name="diabetesDuration"
                type="number"
                min="0"
                inputMode="numeric"
                value={patient.diabetesDuration}
                onChange={(event) => onChange("diabetesDuration", event.target.value)}
                aria-invalid={Boolean(errors.diabetesDuration)}
                aria-describedby={errors.diabetesDuration ? "diabetes-duration-error" : undefined}
                className="flex h-12 w-full rounded-lg border border-input bg-card px-3 pr-16 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">years</span>
            </div>
            {errors.diabetesDuration && <p id="diabetes-duration-error" className="text-sm text-destructive" role="alert">{errors.diabetesDuration}</p>}
          </div>
        </div>

        <Button type="submit" size="lg" className="min-h-12 w-full gap-2 sm:w-auto sm:min-w-40" disabled={isSaving}>
          {isSaving ? "Saving patient..." : "Continue"}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </form>
    </section>
  )
}