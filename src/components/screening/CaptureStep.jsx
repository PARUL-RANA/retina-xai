import { useEffect, useRef, useState } from "react"
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
  const [cameraError, setCameraError] = useState("")
  const [cameraStatus, setCameraStatus] = useState("idle")
  const [cameraReady, setCameraReady] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const eyeLabel = currentEye === "left" ? "LEFT EYE" : "RIGHT EYE"
  const eyeCapture = capture[`${currentEye}Eye`]
  const isCaptured = Boolean(eyeCapture)
  const eyeStates = [
    { key: "left", label: "LEFT EYE", captured: Boolean(capture.leftEye) },
    { key: "right", label: "RIGHT EYE", captured: Boolean(capture.rightEye) },
  ]
  const canCapture = Boolean(currentEye) && (cameraReady || cameraStatus === "live") && !capturedImage && !isCaptured

  function stopCameraStream() {
    if (!streamRef.current) return
    streamRef.current.getTracks().forEach((track) => track.stop())
    streamRef.current = null

    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.srcObject = null
    }
  }

  function markCameraReady() {
    const video = videoRef.current
    if (!video) {
      setCameraReady(false)
      setCameraStatus((current) => (current === "error" ? "error" : "loading"))
      return
    }

    if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
      setCameraReady(true)
      setCameraStatus("live")
      return
    }

    setCameraReady(false)
    setCameraStatus((current) => (current === "error" ? "error" : "loading"))
  }

  async function startCamera() {
    console.log("[CAMERA 1] Capture button handler started")

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraStatus("error")
        setCameraError("Camera unavailable. Please check your browser camera permissions or use Upload Image.")
        return
      }

      setCameraStatus("requesting")
      setCameraReady(false)
      setCameraError("")

      console.log("[CAMERA 2] Before getUserMedia")
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      })
      console.log("[CAMERA 3] getUserMedia SUCCESS", stream)

      const video = videoRef.current
      console.log("[CAMERA 4] videoRef", videoRef.current)

      if (!video) {
        stream.getTracks().forEach((track) => track.stop())
        setCameraStatus("error")
        setCameraError("Camera unavailable. Please check your browser camera permissions or use Upload Image.")
        return
      }

      streamRef.current = stream
      video.srcObject = stream
      console.log("[CAMERA 5] stream attached to video")
      console.log("[CAMERA 6] waiting for video")

      video.onloadedmetadata = markCameraReady
      video.oncanplay = markCameraReady
      video.onplaying = markCameraReady

      console.log("[CAMERA 7] video metadata", {
        readyState: video.readyState,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
      })

      console.log("[CAMERA 8] attempting video.play()")
      await video.play()
      console.log("[CAMERA 9] video.play SUCCESS")

      markCameraReady()
      requestAnimationFrame(markCameraReady)
      setTimeout(markCameraReady, 250)
      console.log("[CAMERA 10] CAMERA READY")
    } catch (error) {
      console.error("[CAMERA ERROR]", error)
      console.error("name:", error?.name)
      console.error("message:", error?.message)

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }

      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.srcObject = null
      }

      setCameraStatus("error")
      setCameraError("Camera unavailable. Please check your browser camera permissions or use Upload Image.")
    }
  }

  function selectMode(nextMode) {
    setMode(nextMode)
    setUploadError("")
    setCameraError("")
    setCapturedImage(null)
    stopCameraStream()
    setCameraReady(false)
    setCameraStatus(nextMode === "camera" ? "requesting" : "idle")

    if (nextMode === "camera") {
      startCamera()
    }
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

  function handleCapture() {
    console.log("================================")
    console.log("RETINA-XAI CAPTURE BUTTON CLICKED")
    console.log("selectedEye:", currentEye)
    console.log("cameraStatus:", cameraStatus)
    console.log("cameraReady:", cameraReady)
    console.log("stream:", streamRef.current)
    console.log("video:", videoRef.current)
    console.log("================================")

    const video = videoRef.current
    if (!video || !streamRef.current || video.readyState < 2 || video.videoWidth <= 0 || video.videoHeight <= 0) {
      setCameraError("Starting camera... please wait until the live preview is ready.")
      setCameraStatus("loading")
      return
    }

    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const context = canvas.getContext("2d")
    if (!context) {
      setCameraError("Could not capture the live camera frame. Please try again or upload an image.")
      return
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    const sample = context.getImageData(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), 1, 1).data
    const brightness = (sample[0] + sample[1] + sample[2]) / 3
    if (brightness < 20) {
      setCameraError("Capture failed. Please try again.")
      setCameraStatus("live")
      return
    }

    const dataUrl = canvas.toDataURL("image/jpeg", 0.92)
    stopCameraStream()
    setCameraReady(false)
    setCameraStatus("captured")
    setCapturedImage(dataUrl)
    setCameraError("")
  }

  function handleRetake() {
    setUploadError("")
    setCameraError("")
    setCapturedImage(null)

    if (isCaptured) {
      onRetake()
    }

    setMode("camera")
    startCamera()
  }

  function handleUsePhoto() {
    console.log("[USE PHOTO] clicked")
    console.log("[USE PHOTO] selectedEye:", currentEye)
    console.log("[USE PHOTO] capturedImage:", capturedImage)

    if (!capturedImage) {
      console.log("[USE PHOTO] no captured image found")
      setCameraError("Please capture an image first.")
      return
    }

    const imageToSave = capturedImage
    console.log("[USE PHOTO] saving image")

    stopCameraStream()
    setCameraReady(false)
    setCameraStatus("captured")
    setCapturedImage(null)
    setCameraError("")
    onCapture(imageToSave)

    console.log("[USE PHOTO] image saved")
  }

  useEffect(() => {
    return () => stopCameraStream()
  }, [])

  return (
    <section aria-labelledby="capture-step-heading" className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium tracking-[0.18em] text-cyan">STEP 2</p>
          <h2 id="capture-step-heading" className="mt-2 text-2xl font-semibold tracking-tight">CAPTURE</h2>
          <p className="mt-2 text-sm text-muted-foreground">Choose how to provide the retinal image.</p>
        </div>
      </div>

      {mode === "camera" && !isCaptured && !capturedImage && (
        <div className="relative mx-auto flex aspect-[4/3] min-h-[280px] w-full max-w-5xl items-center justify-center overflow-hidden rounded-card border border-border/80 bg-surface-secondary sm:aspect-[16/10] sm:min-h-[360px] lg:min-h-[500px]">
          <div className="absolute inset-4 rounded-control border border-dashed border-cyan/30" aria-hidden="true" />
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className={`h-full w-full object-cover ${cameraStatus === "live" ? "opacity-100" : "opacity-50"}`}
            aria-label={`${eyeLabel} live camera preview`}
          />

          {cameraStatus !== "live" && (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
              <div className="flex size-44 items-center justify-center rounded-full border-2 border-cyan/60 sm:size-56">
                <div className="size-3 rounded-full bg-cyan/70" aria-hidden="true" />
              </div>
              <div>
                <p className="flex items-center justify-center gap-2 text-sm font-medium text-cyan">
                  <Camera className="size-4" aria-hidden="true" />
                  {cameraStatus === "requesting" ? "OPENING CAMERA" : cameraStatus === "loading" ? "STARTING CAMERA..." : cameraStatus === "error" ? "CAMERA UNAVAILABLE" : "CAMERA READY"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Position the eye inside the guide.</p>
              </div>
            </div>
          )}
          <div className="pointer-events-none absolute inset-x-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/40 bg-transparent sm:h-52 sm:w-52" aria-hidden="true" />
          {cameraError && (
            <div className="absolute inset-x-4 bottom-4 rounded-md border border-border/70 bg-background/85 px-3 py-2 text-left text-sm text-foreground shadow-sm backdrop-blur-sm">
              <p className="font-medium text-foreground">Camera access required</p>
              <p className="mt-1 text-muted-foreground">{cameraError}</p>
            </div>
          )}
        </div>
      )}

      {capturedImage && (
        <div className="overflow-hidden rounded-card border border-cyan/40 bg-surface/30">
          <img src={capturedImage} alt={`${eyeLabel} captured preview`} className="image-appear max-h-[420px] min-h-[280px] w-full object-contain bg-surface-secondary" />
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 px-4 py-3">
            <p className="flex items-center gap-2 text-sm font-medium text-cyan" aria-live="polite">
              <Check className="size-4" aria-hidden="true" /> {eyeLabel} - CAPTURED IMAGE
            </p>
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="min-h-11 gap-2" onClick={handleRetake}>
                <RotateCcw className="size-4" aria-hidden="true" /> Retake
              </Button>
              <Button type="button" size="lg" className="min-h-11 gap-2" onClick={handleUsePhoto}>
                <Check className="size-4" aria-hidden="true" /> Use Photo
              </Button>
            </div>
          </div>
        </div>
      )}

      {mode === "upload" && !isCaptured && !capturedImage && (
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

      {!mode && !isCaptured && !capturedImage && (
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

      {isCaptured && !capturedImage && (
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
          {mode && !isCaptured && !capturedImage && (
            <Button type="button" variant="outline" size="lg" className="min-h-12" onClick={() => selectMode(null)}>Choose another method</Button>
          )}
          {mode === "camera" && !isCaptured && !capturedImage && (
            <Button type="button" size="lg" className="min-h-12 min-w-36 gap-2" onClick={handleCapture} disabled={!canCapture}>
              <Camera className="size-4" aria-hidden="true" /> {cameraStatus === "requesting" || cameraStatus === "loading" ? "Starting camera..." : cameraStatus === "live" ? "Capture" : "Capture Image"}
            </Button>
          )}
          {isCaptured && !capturedImage && <Button type="button" size="lg" className="min-h-12 min-w-36 gap-2" onClick={onContinue}>Continue <ArrowRight className="size-4" aria-hidden="true" /></Button>}
        </div>
      </div>
    </section>
  )
}
