import { Link } from "react-router-dom"
import {
  ArrowRight,
  Eye,
  ScanLine,
  Stethoscope,
  UserRoundCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import retinalCapture from "@/assets/retinal-capture.svg"

const CLINICAL_FEATURES = [
  {
    label: "GUIDED SCREENING",
    body: "Simple step-by-step workflow.",
    Icon: UserRoundCheck,
  },
  {
    label: "IMAGE QUALITY",
    body: "Check whether images are usable.",
    Icon: ScanLine,
  },
  {
    label: "EXPLAINABLE FINDINGS",
    body: "Present understandable evidence.",
    Icon: Eye,
  },
  {
    label: "REFERRAL SUPPORT",
    body: "Make the next clinical step clearer.",
    Icon: Stethoscope,
  },
]

const LEVELS = [
  { level: "LEVEL 0", name: "NO DR", tone: "bg-[#D3E9DD] text-[#185B56]" },
  { level: "LEVEL 1", name: "MILD NPDR", tone: "bg-[#E2F0ED] text-[#287A72]" },
  { level: "LEVEL 2", name: "MODERATE NPDR", tone: "bg-[#F6E9CF] text-[#936323]", referable: true },
  { level: "LEVEL 3", name: "SEVERE NPDR", tone: "bg-[#F4D8D3] text-[#A24F4F]", referable: true },
  { level: "LEVEL 4", name: "PROLIFERATIVE DR", tone: "bg-[#EAC7C7] text-[#8D4141]", referable: true },
]

function AccessSection() {
  return (
    <section className="border-b border-[#B8D8CE] bg-[#D3E9DD] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.22em] text-[#287A72]">PRIMARY CARE ACCESS</p>
          <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-[-0.03em] text-[#173B3A] sm:text-5xl">
            DESIGNED FOR SCREENING WHERE ACCESS MATTERS.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#587270]">
            A guided workflow for PHC teams, with image quality checks, referral indication, explainable results, and connectivity awareness built into the experience.
          </p>
          <div className="mt-8 grid max-w-xl gap-x-6 gap-y-5 sm:grid-cols-2">
            {CLINICAL_FEATURES.map(({ label, body, Icon }) => (
              <div key={label} className="flex gap-3 border-t border-[#9EC9BD] pt-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#E2F0ED] text-[#185B56]">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.14em] text-[#173B3A]">{label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#587270]">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem]">
          <div className="absolute -inset-3 rounded-[1.5rem] border border-[#9EC9BD] bg-[#E2F0ED]/70" aria-hidden="true" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#B8D8CE] bg-[#185B56] shadow-[0_16px_32px_rgba(24,91,86,0.14)]">
          <img
            src={retinalCapture}
            alt="Conceptual retinal capture for a primary care screening workflow"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#185B56]/90 via-[#185B56]/20 to-transparent" />
          <div className="absolute left-5 top-5 flex items-center gap-2 text-[9px] font-semibold tracking-[0.18em] text-[#D3E9DD] sm:left-6 sm:top-6">
            <span className="size-2 rounded-full bg-[#3F8F68]" aria-hidden="true" />
            CLINICAL PATHWAY
          </div>
          <div className="relative flex h-full flex-col justify-end p-5 sm:p-6">
            <div className="border-l-2 border-[#B4E1D7] pl-4">
              <p className="text-[10px] font-semibold tracking-[0.18em] text-[#B4E1D7]">FROM CAPTURE TO CONTEXT</p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#F3F6F1]">A clear visual record for teams screening close to the patient.</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

function SeveritySection() {
  return (
    <section className="border-b border-[#C9DCD5] bg-[#F3F6F1] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-[10px] font-semibold tracking-[0.22em] text-[#287A72]">RETINOPATHY LEVELS</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#173B3A] sm:text-4xl">
              A SHARED LANGUAGE FOR REFERRAL.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#587270]">A restrained progression from no visible disease to findings that may need referral.</p>
        </div>

        <div className="mt-10 grid gap-2 sm:grid-cols-5">
          {LEVELS.map((item) => (
            <div key={item.level} className={`min-h-28 border border-[#C9DCD5] p-4 ${item.tone}`}>
              <div className="flex items-start justify-between gap-2">
                <p className="text-[10px] font-semibold tracking-[0.15em]">{item.level}</p>
                {item.referable && <span className="text-[9px] font-semibold tracking-[0.1em]">REFER</span>}
              </div>
              <p className="mt-7 text-xs font-semibold tracking-[0.08em]">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function LandingStory() {
  return (
    <>
      <AccessSection />
      <SeveritySection />
      <section className="bg-[#185B56] py-20 text-[#F3F6F1] sm:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 md:flex-row md:items-end lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold tracking-[0.22em] text-[#B4E1D7]">NEXT CLINICAL STEP</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">READY TO SEE WHAT THE AI SEES?</h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[#D3E9DD]">Start an assisted retinal screening workflow.</p>
          </div>
          <Button size="lg" nativeButton={false} render={<Link to="/login" />} className="min-h-12 bg-[#F3F6F1] px-5 font-semibold tracking-[0.08em] text-[#185B56] hover:bg-[#E2F0ED]">
            START SCREENING
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </section>
    </>
  )
}
