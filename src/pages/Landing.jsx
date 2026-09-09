import Navbar from "@/components/Navbar/Navbar"
import Hero from "@/components/Hero/Hero"
import Marquee from "@/components/Marquee/Marquee"
import Technology from "@/components/Technology/Technology"
import Explainability from "@/components/Explainability/Explainability"
import LandingStory from "@/components/LandingStory/LandingStory"
import Footer from "@/components/Footer/Footer"

export default function Landing() {
  return (
    <div className="min-h-svh bg-background">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Technology />
        <Explainability />
        <LandingStory />
      </main>
      <Footer />
    </div>
  )
}
