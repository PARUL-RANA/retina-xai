import { ArrowRight, CircleDot, Eye, Minus } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import retinalScan from "@/assets/retinal-scan.svg"

const EVIDENCE = [
  { label: "Microaneurysms", value: "07", tone: "text-[#C85F5F]" },
  { label: "Hemorrhages", value: "03", tone: "text-[#C58A3A]" },
  { label: "Hard exudates", value: "05", tone: "text-[#287A72]" },
]

export default function Explainability() {
  return (
    <section id="explainable-ai" className="scroll-mt-20 border-b border-[#C9DCD5] bg-[#E2F0ED] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-8">
        <div className="relative min-h-[24rem] border border-[#B8D8CE] bg-[#F9FBF8] p-5 shadow-[0_16px_35px_rgba(23,59,58,0.08)] sm:min-h-[31rem] sm:p-8">
          <div className="flex items-center justify-between border-b border-[#DCE8E3] pb-4">
            <div className="flex items-center gap-2">
              <Eye className="size-4 text-[#185B56]" aria-hidden="true" />
              <p className="text-[10px] font-semibold tracking-[0.18em] text-[#173B3A]">EXPLAINABILITY PREVIEW</p>
            </div>
            <p className="text-[9px] tracking-[0.14em] text-[#587270]">DEMO VISUAL</p>
          </div>
          <div className="relative mt-6 h-[17rem] overflow-hidden border border-[#C9DCD5] bg-[#D3E9DD] sm:h-[22rem]">
            <img
              src={retinalScan}
              alt="Conceptual retinal scan with annotated clinical findings"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-75"
            />
            <div className="absolute inset-[11%] rounded-full border border-[#287A72]/40 bg-[#E2F0ED]" />
            <svg className="absolute inset-[13%] h-[74%] w-[74%]" viewBox="0 0 300 260" fill="none" aria-hidden="true">
              <circle cx="150" cy="130" r="92" stroke="#3E9D96" strokeOpacity=".55" />
              <circle cx="150" cy="130" r="65" stroke="#287A72" strokeOpacity=".4" strokeDasharray="4 6" />
              <circle cx="150" cy="130" r="17" fill="#F9FBF8" stroke="#185B56" />
              <path d="M150 115 C125 94 101 76 68 64 M150 115 C176 92 203 74 235 61 M138 128 C109 125 82 136 54 155 M162 128 C190 123 219 134 247 155 M141 145 C121 166 112 187 108 218 M159 145 C181 165 190 187 192 220" stroke="#287A72" strokeWidth="2" strokeLinecap="round" strokeOpacity=".78" />
              <circle cx="101" cy="87" r="5" fill="#C85F5F" />
              <circle cx="203" cy="79" r="5" fill="#C58A3A" />
              <circle cx="82" cy="143" r="5" fill="#C85F5F" />
              <circle cx="218" cy="145" r="5" fill="#287A72" />
            </svg>
            <div className="absolute left-[12%] top-[18%] border border-[#E5C8C8] bg-[#FDF7F6] px-2.5 py-1.5 text-[9px] font-semibold tracking-[0.12em] text-[#A24F4F]">MICROANEURYSM</div>
            <div className="absolute right-[10%] top-[28%] border border-[#E5D4B7] bg-[#FCF8F0] px-2.5 py-1.5 text-[9px] font-semibold tracking-[0.12em] text-[#936323]">HEMORRHAGE</div>
            <div className="absolute bottom-[17%] right-[12%] border border-[#B8D8CE] bg-[#E2F0ED] px-2.5 py-1.5 text-[9px] font-semibold tracking-[0.12em] text-[#287A72]">EXUDATE</div>
            <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[9px] font-semibold tracking-[0.16em] text-[#287A72]">
              <CircleDot className="size-3.5" aria-hidden="true" />
              FINDINGS MAPPED
            </div>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold tracking-[0.22em] text-[#287A72]">EXPLAINABLE AI</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#173B3A] sm:text-5xl">
            DON&apos;T JUST SEE THE RESULT. SEE WHAT THE AI SEES.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#587270]">
            RETINA-XAI is designed to make screening assessments easier to interpret, discuss, and act on with clinical context.
          </p>
          <div className="mt-8 border-y border-[#B8D8CE]">
            {EVIDENCE.map((item) => (
              <div key={item.label} className="flex items-center justify-between border-b border-[#D3E9DD] py-4 last:border-0">
                <span className="flex items-center gap-3 text-sm text-[#173B3A]"><Minus className="size-3 text-[#9EC9BD]" aria-hidden="true" />{item.label}</span>
                <span className={`text-sm font-semibold tabular-nums ${item.tone}`}>{item.value}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[10px] font-medium tracking-[0.14em] text-[#587270]">CONCEPTUAL VISUAL — NOT A LIVE PREDICTION</p>
          <Button size="lg" nativeButton={false} render={<Link to="/login" />} className="mt-7 min-h-12 px-5 font-semibold tracking-[0.08em]">
            START SCREENING
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}
