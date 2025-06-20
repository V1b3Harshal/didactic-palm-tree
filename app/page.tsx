// pages/index.tsx
'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Preloader from '@/components/Preloader'
import { Hero } from '@/components/Hero'
import { DemoSection } from '@/components/DemoSection'
import { AboutSection } from '@/components/AboutSection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { BenefitsSection } from '@/components/BenefitsSection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const handlePreloadComplete = () => {
    setIsLoading(false)
    // small delay to let preloader fade-out
    setTimeout(() => {
      setShowContent(true)
    }, 100)
  }

  useEffect(() => {
    // enforce a minimum 3s loading time in case preload finishes too fast
    const minLoad = setTimeout(() => {
      if (isLoading) handlePreloadComplete()
    }, 3000)

    return () => clearTimeout(minLoad)
  }, [isLoading])

  return (
    <>
      {/* 1) Show the preloader until it calls onComplete */}
      {isLoading && <Preloader onComplete={handlePreloadComplete} />}

      {/* 2) Your real page content, fading in */}
      <div
        className={`transition-opacity duration-1000 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Navigation />

        <section className="hero-section">
          <Hero />
        </section>

        <section className="demo-section">
          <DemoSection />
        </section>

        <section className="features-section">
          <FeaturesSection />
        </section>

        <section className="benefits-section">
          <BenefitsSection />
        </section>

        <section className="about-section">
          <AboutSection />
        </section>

        <section className="contact-section">
          <ContactSection />
        </section>

        <Footer />
      </div>
    </>
  )
}
