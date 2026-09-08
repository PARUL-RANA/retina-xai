import { useRef, useState } from "react"
import { ArrowLeft, ArrowRight, Camera, Check, Circle, ImageUp, RotateCcw, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ACCEPTED_TYPES = ["image/jpeg", "image/png"]

export default function CaptureStep({
  currentEye,
  capture,
  capturedEyes,
  onBack,
  onCapture,
  onUpload,
  onContinue,
  onRetake,
}) {
  const [mode, setMode] = useState(null)
  const [uploadError, setUploadError] = useState("")
  const fileInputRef = useRef(null)
  const eyeLabel = currentEye === "left" ? "LEFT EYE" : "RIGHT EYE"
  const eyeCapture = capture[`${currentEye}Eye`]
  const isCaptured = Boolean(eyeCapture)
  const eyeStates = [
    { key: "left", label: "LEFT EYE", captured: Boolean(capture.leftEye) },
    { key: "right", label: "RIGHT EYE", captured: Boolean(capture.rightEye) },
  ]

  function selectMode(nextMode) {
    setMode(nextMode)
    setUploadError("")
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0]
    event.target.value = ""
    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setUploadError("Choose a JPG, JPEG, or PNG image.")
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setUploadError("Choose an image smaller than 10 MB.")
      return
    }

    setUploadError("")
    onUpload(file)
  }

  function handleRetake() {
    setUploadError("")
    onRetake()
  }

  return (
    <section aria-labelledby="capture-step-heading" className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium tracking-[0.18em] text-cyan">STEP 2</p>
          <h2 id="capture-step-heading" className="mt-2 text-2xl font-semibold tracking-tight">CAPTURE</h2>
          <p className="mt-2 text-sm text-muted-foreground">Choose how to provide the retinal image.</p>
        </div>
      </div>

      {mode !== "upload" && !isCaptured && (
        <div className="relative mx-auto flex aspect-[4/3] min-h-[280px] w-full max-w-5xl items-center justify-center overflow-hidden rounded-card border border-border/80 bg-surface-secondary sm:aspect-[16/10] sm:min-h-[360px] lg:min-h-[500px]">
          <div className="absolute inset-4 rounded-control border border-dashed border-cyan/30" aria-hidden="true" />
          <div className="relative flex flex-col items-center gap-4 text-center">
            <div className="flex size-44 items-center justify-center rounded-full border-2 border-cyan/60 sm:size-56">
              <div className="size-3 rounded-full bg-cyan/70" aria-hidden="true" />
            </div>
            <div>
              <p className="flex items-center justify-center gap-2 text-sm font-medium text-cyan"><Camera className="size-4" aria-hidden="true" /> CAMERA READY</p>
              <p className="mt-1 text-xs text-muted-foreground">Position the eye inside the guide.</p>
            </div>
          </div>
        </div>
      )}

      {mode === "upload" && !isCaptured && (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-card border border-dashed border-border/80 bg-surface/30 px-5 text-center sm:min-h-[360px]">
          <ImageUp className="size-10 text-cyan" aria-hidden="true" />
          <h3 className="mt-4 text-base font-medium">Upload retinal image</h3>
          <p className="mt-2 text-sm text-muted-foreground">JPG, JPEG, or PNG, up to 10 MB</p>
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" onChange={handleFileChange} className="sr-only" aria-describedby={uploadError ? "upload-error" : "upload-help"} />
          <Button type="button" size="lg" className="mt-5 min-h-12 gap-2" onClick={() => fileInputRef.current?.click()}>
            <Upload className="size-4" aria-hidden="true" /> Choose Image
          </Button>
          <p id="upload-help" className="sr-only">Select a JPG, JPEG, or PNG retinal image.</p>
          {uploadError && <p id="upload-error" className="mt-3 text-sm text-destructive" role="alert">{uploadError}</p>}
        </div>
      )}

      {!mode && !isCaptured && (
        <div className="mx-auto grid w-full max-w-4xl gap-3 sm:grid-cols-[1.2fr_1fr]" aria-label="Image acquisition method">
          <Button type="button" size="lg" className="min-h-14 justify-start gap-3 px-4 text-left" onClick={() => selectMode("camera")}>
            <Camera className="size-5 text-cyan" aria-hidden="true" />
            <span>
              <span className="block font-medium">Capture with Camera</span>
              <span className="mt-0.5 block text-xs font-normal text-muted-foreground">Use the alignment guide</span>
            </span>
          </Button>
          <Button type="button" variant="outline" size="lg" className="min-h-14 justify-start gap-3 px-4 text-left" onClick={() => selectMode("upload")}>
            <Upload className="size-5 text-cyan" aria-hidden="true" />
            <span>
              <span className="block font-medium">Upload Image</span>
              <span className="mt-0.5 block text-xs font-normal text-muted-foreground">JPG, JPEG, or PNG</span>
            </span>
          </Button>
        </div>
      )}

      {isCaptured && (
        <div className="overflow-hidden rounded-card border border-cyan/40 bg-surface/30">
          {eyeCapture.image?.url ? (
            <img src={eyeCapture.image.url} alt={`${eyeLabel} local preview`} className="image-appear max-h-[420px] min-h-[280px] w-full object-contain bg-surface-secondary" />
          ) : (
            <div className="flex min-h-[280px] items-center justify-center bg-surface-secondary">
              <div className="text-center">
                <Check className="mx-auto size-8 text-cyan" aria-hidden="true" />
                <p className="mt-3 text-sm font-medium text-cyan">{eyeLabel} IMAGE READY</p>
                <p className="mt-1 text-xs text-muted-foreground">Camera capture placeholder</p>
              </div>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 px-4 py-3">
            <p className="flex items-center gap-2 text-sm font-medium text-cyan" aria-live="polite"><Check className="size-4" aria-hidden="true" /> {eyeLabel} - IMAGE READY</p>
            <Button type="button" variant="outline" className="min-h-11 gap-2" onClick={handleRetake}>
              <RotateCcw className="size-4" aria-hidden="true" /> {eyeCapture.source === "upload" ? "Choose another" : "Retake"}
            </Button>
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground" aria-live="polite">{capturedEyes} of 2 eyes ready. Images remain local until backend integration is added.</p>

      <ol className="mx-auto flex w-full max-w-5xl items-center gap-2" aria-label="Eye capture progress">
        {eyeStates.map((eye) => {
          const isActive = eye.key === currentEye
          return (
            <li key={eye.key} className={`flex min-h-11 flex-1 items-center gap-2 rounded-control border px-3 text-xs transition-colors duration-fast ${isActive ? "border-cyan/60 bg-muted/40 text-foreground" : "border-border/60 text-muted-foreground"}`}>
              {eye.captured ? <Check className="size-4 shrink-0 text-cyan" aria-hidden="true" /> : <Circle className="size-4 shrink-0" aria-hidden="true" />}
              <span className="min-w-0 truncate">{eye.label}</span>
              <span className="sr-only">{eye.captured ? "captured" : isActive ? "active" : "pending"}</span>
            </li>
          )
        })}
      </ol>

      <div className="mx-auto flex w-full max-w-5xl flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" variant="outline" size="lg" className="min-h-12 gap-2" onClick={onBack}><ArrowLeft className="size-4" aria-hidden="true" /> Back</Button>
        <div className="flex flex-col gap-3 sm:flex-row">
          {mode && !isCaptured && <Button type="button" variant="outline" size="lg" className="min-h-12" onClick={() => selectMode(null)}>Choose another method</Button>}
          {mode === "camera" && !isCaptured && <Button type="button" size="lg" className="min-h-12 min-w-36 gap-2" onClick={onCapture}><Camera className="size-4" aria-hidden="true" /> Capture</Button>}
          {isCaptured && <Button type="button" size="lg" className="min-h-12 min-w-36 gap-2" onClick={onContinue}>Continue <ArrowRight className="size-4" aria-hidden="true" /></Button>}
        </div>
      </div>
    </section>
  )
}
