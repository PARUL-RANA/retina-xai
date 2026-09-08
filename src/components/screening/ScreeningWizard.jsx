import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import ScreeningProgress from "@/components/screening/ScreeningProgress"
import PatientStep from "@/components/screening/PatientStep"
import CaptureStep from "@/components/screening/CaptureStep"
import QualityStep from "@/components/screening/QualityStep"
import ProcessingStep from "@/components/screening/ProcessingStep"
import { saveScreeningSession } from "@/data/screeningSession"

export default function ScreeningWizard() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [patient, setPatient] = useState({ id: "", age: "", diabetesDuration: "" })
  const [patientErrors, setPatientErrors] = useState({})
  const [capture, setCapture] = useState({ leftEye: null, rightEye: null })
  const [currentEye, setCurrentEye] = useState("left")
  const [quality, setQuality] = useState({
    leftEye: { status: "usable" },
    rightEye: { status: "usable" },
  })
  const [processingStatus, setProcessingStatus] = useState("uploading")
  const [cancelOpen, setCancelOpen] = useState(false)
  const objectUrlsRef = useRef(new Set())

  useEffect(() => {
    saveScreeningSession({
      patient: {
        patientId: patient.id,
        age: patient.age,
        diabetesDuration: patient.diabetesDuration,
      },
      capture,
      quality,
      processing: { status: processingStatus },
    })
  }, [patient, capture, quality, processingStatus])

  useEffect(() => {
    if (step !== 4) {
      return undefined
    }

    const analyzingTimer = window.setTimeout(() => setProcessingStatus("analyzing"), 700)
    const doneTimer = window.setTimeout(() => setProcessingStatus("done"), 1500)

    return () => {
      window.clearTimeout(analyzingTimer)
      window.clearTimeout(doneTimer)
    }
  }, [step])

  function handlePatientChange(field, value) {
    setPatient((current) => ({ ...current, [field]: value }))
    setPatientErrors((current) => ({ ...current, [field]: undefined }))
  }

  function handlePatientContinue(event) {
    event.preventDefault()
    const errors = {}
    const age = Number(patient.age)
    const diabetesDuration = Number(patient.diabetesDuration)

    if (!patient.id.trim()) errors.id = "Patient ID is required."
    if (!patient.age || !Number.isFinite(age) || age <= 0) errors.age = "Enter a valid positive age."
    if (!patient.diabetesDuration || !Number.isFinite(diabetesDuration) || diabetesDuration < 0) {
      errors.diabetesDuration = "Enter a valid duration of zero or more years."
    }

    setPatientErrors(errors)
    if (Object.keys(errors).length === 0) setStep(2)
  }

  function handleCapture() {
    setCapture((current) => ({
      ...current,
      [`${currentEye}Eye`]: { source: "camera", image: null, status: "ready" },
    }))
  }

  function handleUpload(file) {
    const url = URL.createObjectURL(file)
    objectUrlsRef.current.add(url)
    const eyeKey = `${currentEye}Eye`
    const previousImage = capture[eyeKey]?.image
    if (previousImage?.url) {
      URL.revokeObjectURL(previousImage.url)
      objectUrlsRef.current.delete(previousImage.url)
    }

    setCapture((current) => ({
      ...current,
      [eyeKey]: {
        source: "upload",
        image: { url, name: file.name, type: file.type },
        status: "ready",
      },
    }))
  }

  function handleRetake() {
    const eyeKey = `${currentEye}Eye`
    const previousImage = capture[eyeKey]?.image
    if (previousImage?.url) {
      URL.revokeObjectURL(previousImage.url)
      objectUrlsRef.current.delete(previousImage.url)
    }
    setCapture((current) => ({ ...current, [eyeKey]: null }))
  }

  function handleQualityCaptureAgain(eyeKey) {
    setQuality((current) => ({
      ...current,
      [eyeKey]: { status: "usable" },
    }))
    setCurrentEye(eyeKey === "leftEye" ? "left" : "right")
    setStep(2)
  }

  function handleCaptureContinue() {
    if (currentEye === "left") {
      setCurrentEye("right")
      return
    }
    setStep(3)
  }

  function handleCancel() {
    setCancelOpen(false)
    navigate("/app")
  }

  const capturedEyes = [capture.leftEye, capture.rightEye].filter(Boolean).length

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-4 sm:space-y-8">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium tracking-[0.18em] text-cyan">SCREENING</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">New screening</h1>
          {patient.id && (
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{patient.id}</span>
              <span className="mx-2 text-border">·</span>
              {patient.age} years · Diabetes {patient.diabetesDuration} years
            </p>
          )}
        </div>
        <Button type="button" variant="ghost" className="min-h-11 gap-2 text-muted-foreground" onClick={() => setCancelOpen(true)}>
          <X className="size-4" aria-hidden="true" /> Cancel
        </Button>
      </header>

      <ScreeningProgress currentStep={step} />

      <div key={step} className="screening-step-enter">
        {step === 1 && (
          <PatientStep patient={patient} errors={patientErrors} onChange={handlePatientChange} onContinue={handlePatientContinue} />
        )}
        {step === 2 && (
          <CaptureStep
            key={currentEye}
            currentEye={currentEye}
            capture={capture}
            capturedEyes={capturedEyes}
            onBack={() => setStep(1)}
            onCapture={handleCapture}
            onUpload={handleUpload}
            onContinue={handleCaptureContinue}
            onRetake={handleRetake}
          />
        )}
        {step === 3 && (
          <QualityStep
            quality={quality}
            onBack={() => setStep(2)}
            onContinue={() => setStep(4)}
            onCaptureAgain={handleQualityCaptureAgain}
          />
        )}
        {step === 4 && (
          <ProcessingStep
            status={processingStatus}
            onBack={() => {
              setProcessingStatus("uploading")
              setStep(3)
            }}
            onViewReport={() => navigate(`/app/report/${encodeURIComponent(patient.id.trim())}`)}
          />
        )}
      </div>

      {cancelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" role="presentation">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="cancel-dialog-title">
            <h2 id="cancel-dialog-title" className="text-lg font-semibold">Cancel screening?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Your entered information and captured images will be lost.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" size="lg" className="min-h-12" onClick={() => setCancelOpen(false)}>Keep Screening</Button>
              <Button type="button" variant="destructive" size="lg" className="min-h-12" onClick={handleCancel}>Cancel Screening</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}