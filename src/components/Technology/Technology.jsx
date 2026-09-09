import { ArrowRight, Brain, CheckCircle2, ScanLine } from "lucide-react"
import retinalCapture from "@/assets/retinal-capture.svg"

const SUPPORTING_FEATURES = [
  {
    title: "EXPLAINABLE AI",
    body: "See the visual evidence behind a screening result.",
    Icon: Brain,
    className: "bg-[#E2F0ED]",
  },
  {
    title: "IMAGE QUALITY",
    body: "Know when a capture is usable before analysis.",
    Icon: ScanLine,
    className: "bg-[#F6E9CF]",
  },
  {
    title: "CLINICAL SUPPORT",
    body: "Designed to support judgment, not replace it.",
    Icon: CheckCircle2,
    className: "bg-[#D3E9DD]",
  },
]

function RetinalSignal() {
  return (
    <div className="relative min-h-[22rem] overflow-hidden border border-[#B8D8CE] bg-[#185B56] p-5 text-[#F3F6F1] sm:min-h-[27rem] sm:p-7">
      <img
        src={retinalCapture}
        alt="Conceptual retinal capture with mapped vessel structures"
        loading="lazy"
        className="absolute bottom-0 left-0 h-[68%] w-[78%] object-cover object-center opacity-75 mix-blend-screen"
      />
      <div className="absolute right-5 top-5 text-right sm:right-7 sm:top-7">
        <p className="text-[9px] font-semibold tracking-[0.2em] text-[#B4E1D7]">RETINAL IMAGE ANALYSIS</p>
        <p className="mt-2 text-sm font-medium text-[#F3F6F1]">Evidence, not a black box.</p>
      </div>
      <svg className="absolute bottom-[-10%] left-[-4%] h-[78%] w-[76%] sm:bottom-[-15%] sm:left-[2%]" viewBox="0 0 360 300" fill="none" aria-hidden="true">
        <circle cx="170" cy="164" r="116" stroke="#B4E1D7" strokeOpacity=".34" />
        <circle cx="170" cy="164" r="88" stroke="#3E9D96" strokeOpacity=".45" strokeDasharray="2 7" />
        <circle cx="170" cy="164" r="20" fill="#F3F6F1" fillOpacity=".95" />
        <path d="M170 145 C141 116 105 96 56 83 M169 146 C196 117 235 98 285 82 M154 160 C116 154 82 163 35 188 M186 160 C224 154 259 165 307 193 M158 180 C133 211 119 239 115 284 M182 180 C208 209 223 242 224 285" stroke="#D3E9DD" strokeWidth="2" strokeLinecap="round" />
        <path d="M164 149 C148 133 137 113 128 92 M181 149 C195 128 208 109 222 91 M148 172 C125 179 105 196 89 221 M191 172 C216 178 235 197 251 222" stroke="#3E9D96" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="128" cy="92" r="4" fill="#C58A3A" />
        <circle cx="222" cy="91" r="4" fill="#C85F5F" />
        <circle cx="89" cy="221" r="4" fill="#3F8F68" />
      </svg>
      <div className="absolute bottom-5 right-5 max-w-[10rem] border-l border-[#B4E1D7] pl-3 sm:bottom-7 sm:right-7">
        <p className="text-[9px] tracking-[0.16em] text-[#B4E1D7]">SIGNAL MAP</p>
        <p className="mt-2 text-xs leading-relaxed text-[#D3E9DD]">Small findings become interpretable clinical evidence.</p>
      </div>
    </div>
  )
}

export default function Technology() {
  return (
    <section id="technology" className="scroll-mt-20 border-b border-[#C9DCD5] bg-[#F9FBF8] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.22em] text-[#287A72]">TECHNOLOGY</p>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-[-0.04em] text-[#173B3A] sm:text-5xl">
              BUILT TO MAKE RETINAL SCREENING CLEARER.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#587270] sm:text-lg">
              RETINA-XAI turns retinal images into interpretable evidence for teams making decisions close to the patient.
            </p>
            <a href="#explainable-ai" className="mt-8 inline-flex min-h-11 items-center gap-2 text-xs font-semibold tracking-[0.16em] text-[#185B56] transition-colors duration-200 hover:text-[#287A72]">
              SEE THE EVIDENCE
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
          <RetinalSignal />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {SUPPORTING_FEATURES.map(({ title, body, Icon, className }) => (
            <article key={title} className={`min-h-40 border border-[#C9DCD5] p-5 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#9EC9BD] ${className}`}>
              <Icon className="size-5 text-[#185B56]" aria-hidden="true" />
              <h3 className="mt-8 text-[10px] font-semibold tracking-[0.18em] text-[#173B3A]">{title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#587270]">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
