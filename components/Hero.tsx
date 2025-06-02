"use client"
import { Phone } from "lucide-react"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import Spline from '@splinetool/react-spline';

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

export const Hero = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [heroAnimationData, setHeroAnimationData] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const lottieRef = useRef<any>(null)
  const splineRef = useRef<any>(null)

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch("/hero.json")
        const data = await response.json()
        setHeroAnimationData(data)
      } catch (error) {
        console.error("Failed to load animation:", error)
      }
    }
    loadAnimation()
  }, [])

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneNumber) {
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  return (
    <section className="relative px-4 sm:px-6 bg-white overflow-hidden min-h-[100vh] flex items-center justify-center ">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div className="relative w-full h-full scale-120" style={{ transform: 'scale(1.2)' }}>
          <Spline 
            scene="https://prod.spline.design/NVQQT5O6kWAonjis/scene.splinecode"
            className="w-full h-full"
            ref={splineRef}
            style={{ pointerEvents: isMobile ? 'none' : 'auto' }}
          />
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-[44%] lg:top-[35%] inset-x-0 w-full h-[95%] pointer-events-none z-10">
        {/* Lottie Animation */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden pt-[19%]">
          {heroAnimationData && (
            <div className="w-full max-w-[1200px] h-full mx-auto px-4">
              <Lottie
                animationData={heroAnimationData}
                loop={true}
                autoplay={true}
                style={{ width: "100%", height: "100%", opacity: 1 }}
                lottieRef={lottieRef}
              />
            </div>
          )}
        </div>
      
        {/* Text Element */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden pt-[10%]">
          <span className="text-[18vw] sm:text-[15vw] md:text-[11vw] lg:text-[18vw] font-bold whitespace-nowrap select-none metallic-gradient-text opacity-100 px-4">
            SAMPARK
          </span>
        </div>
      </div>

 {/* Foreground Content */}
<div className="max-w-4xl mx-auto text-center relative z-20 w-full px-4">
  {/* Main Headline - positioned absolutely within the container */}
  <div className="absolute top-[20%] left-0 right-0 z-30 w-full">
    <h1 className="text-6xl  lg:text-7xl md:text-6xl font-bold text-gray-900">
      AI Voice Agents That Talk Like Humans
    </h1>
  </div>

  {/* iPhone Mockup with responsive margins */}
  <div className="relative max-w-xs sm:max-w-sm md:max-w-md mx-auto z-30 
    mt-[25rem] md:mt-[22rem] lg:mt-[20rem]">
 
          {/* Lottie decoration */}
          <div className="absolute -right-[-5%] sm:-right-[-3%] -top-[20%] sm:-top-[20%] w-[30%] aspect-square z-0 opacity-100">
            <DotLottieReact
              src="https://lottie.host/28678e3a-1882-46c3-ae84-ed44b5204a05/falHxt8bTU.lottie"
              loop
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* iPhone container */}
          <div className="relative overflow-hidden" style={{ paddingBottom: "100%" }}>
            <Image
              src="/iphone-mockup.svg"
              alt="iPhone Mockup"
              width={400}
              height={1000}
              className="w-full h-full absolute object-cover object-top"
              priority
            />

            {/* Screen Content */}
            <div className="absolute inset-0 flex flex-col items-center pt-16 sm:pt-20 px-4 sm:px-7">
              <div className="w-full max-w-[240px] sm:max-w-[280px] mt-4 sm:mt-6">
                {/* Notification */}
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 mb-3 sm:mb-4 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-900">Call Sampark AI</span>
                        <span className="text-[10px] text-gray-500">now</span>
                      </div>
                      <p className="text-[11px] text-gray-600 mt-0.5">Talk to Our AI Agents</p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="relative">
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Enter Phone Number"
                          className="w-full px-3 py-2 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-1 h-3 bg-blue-500 animate-pulse rounded-sm"></div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors duration-200"
                      >
                        Let's Talk
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Phone className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-xs text-gray-900 font-medium">You are now receiving a call from Sampark AI.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}