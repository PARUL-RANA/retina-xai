const ITEMS = [
  "EXPLAINABLE AI",
  "GRAD-CAM",
  "LESION DETECTION",
  "CLINICAL EVIDENCE",
  "HUMAN-IN-THE-LOOP",
  "RURAL HEALTHCARE",
  "TELEMEDICINE",
]

function Track() {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden="true">
      {ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center gap-10 text-xs font-medium tracking-[0.22em] text-muted-foreground"
        >
          <span>{item}</span>
          <span className="size-1 rounded-full bg-cyan/60" />
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <section
      className="overflow-hidden border-b border-border/60 bg-surface/40 py-4"
      aria-label="Platform capabilities"
    >
      <div className="flex w-max animate-marquee">
        <Track />
        <Track />
      </div>
    </section>
  )
}
