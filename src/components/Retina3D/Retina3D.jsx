import { motion } from "motion/react"

/** Soft edge blend only — keep the eye fully visible in the center. */
const VIDEO_MASK =
  "radial-gradient(ellipse at center, black 58%, rgba(0,0,0,0.92) 78%, transparent 96%)"

/**
 * Hero retinal visualization — clean MP4, no overlays.
 * Kept as a reusable slot for a future interactive visual.
 */
export default function Retina3D() {
  return (
    <motion.div
      className="relative flex w-full items-center justify-center md:justify-start"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Retinal visualization"
    >
      <div
        className="relative aspect-square w-[min(86vw,400px)] max-w-full overflow-hidden md:w-[clamp(280px,34vw,480px)] lg:w-[clamp(320px,38vw,560px)]"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/retina-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          style={{
            WebkitMaskImage: VIDEO_MASK,
            maskImage: VIDEO_MASK,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />

        {/* Subtle outer fade into #05070D — does not cover the eye center */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 62%, rgba(5,7,13,0.35) 82%, #05070D 98%)",
          }}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  )
}
