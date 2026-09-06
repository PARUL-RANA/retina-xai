import Navbar from "@/components/Navbar/Navbar"
import Hero from "@/components/Hero/Hero"
import Marquee from "@/components/Marquee/Marquee"
import Pipeline from "@/components/Pipeline/Pipeline"
import Explainability from "@/components/Explainability/Explainability"
import Footer from "@/components/Footer/Footer"

export default function Landing() {
  return (
    <div className="min-h-svh bg-background">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Pipeline />
        <Explainability />
      </main>
      <Footer />
    </div>
  )
}
