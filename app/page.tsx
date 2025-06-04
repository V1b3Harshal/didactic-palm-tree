// pages/index.tsx
'use client'

import Navigation from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { DemoSection } from '@/components/DemoSection'
import { AboutSection } from '@/components/AboutSection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { BenefitsSection } from '@/components/BenefitsSection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="hero-section">
        <Hero />
      </section>

      {/* Demo Section */}
      <section className="demo-section">
        <DemoSection />
      </section>

      {/* Features Section */}
      <section className="features-section">
        <FeaturesSection />
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <BenefitsSection />
      </section>

      {/* About Section */}
      <section className="about-section">
        <AboutSection />
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <ContactSection />
      </section>

      <Footer />
    </>
  )
}
