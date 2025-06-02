import Navigation from "@/components/Navigation"
import { Hero } from "@/components/Hero"
import { DemoSection } from "@/components/DemoSection"
import { AboutSection } from "@/components/AboutSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { BenefitsSection } from "@/components/BenefitsSection"
import { ContactSection } from "@/components/ContactSection"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-gray-100">
      <Navigation />
      <div className="relative overflow-hidden">
        <Hero />
      </div>
      <DemoSection />
      <BenefitsSection />
      <FeaturesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  )
}