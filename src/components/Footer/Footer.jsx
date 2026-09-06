import { Link } from "react-router-dom"

const LINKS = [
  { label: "Home", to: "/" },
  { label: "How It Works", to: "/#technology" },
  { label: "Explainable AI", to: "/#explainable-ai" },
  { label: "Research", to: "/#research" },
  { label: "About", to: "/#about" },
  { label: "Contact", to: "/#contact" },
]

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/30">
      <div
        id="about"
        className="mx-auto flex max-w-7xl scroll-mt-20 flex-col gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8"
      >
        <div id="research" className="scroll-mt-20">
          <p className="text-sm font-semibold tracking-[0.18em] text-foreground">RETINA-XAI</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Explainable Retinal Intelligence
          </p>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted-foreground/80">
            Frontend preview for diabetic retinopathy screening in primary and rural care settings.
          </p>
        </div>

        <nav id="contact" className="scroll-mt-20" aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
            {LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-cyan"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border/50 px-4 py-5 text-center text-[11px] tracking-wide text-muted-foreground/70 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} RETINA-XAI · Demonstration interface
      </div>
    </footer>
  )
}
