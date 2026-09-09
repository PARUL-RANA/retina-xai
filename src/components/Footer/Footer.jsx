import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/30">
      <div
        className="mx-auto flex max-w-7xl scroll-mt-20 flex-col gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8"
      >
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-foreground">RETINA-XAI</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Explainable Retinal Intelligence
          </p>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted-foreground/80">
            Frontend preview for diabetic retinopathy screening in primary and rural care settings.
          </p>
        </div>

        <Link to="/login" className="inline-flex min-h-11 items-center border border-[#C9DCD5] px-4 text-xs font-semibold tracking-[0.14em] text-[#185B56] transition-colors duration-200 hover:bg-[#E2F0ED]">
          START SCREENING
        </Link>
      </div>

      <div className="border-t border-border/50 px-4 py-5 text-center text-[11px] tracking-wide text-muted-foreground/70 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} RETINA-XAI · Demonstration interface
      </div>
    </footer>
  )
}
