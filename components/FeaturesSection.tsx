"use client"

import { MessageCircle, Smartphone, Bot, Zap } from "lucide-react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const features = [
  {
    icon: MessageCircle,
    title: "WhatsApp Broadcast",
    description: "Send automated messages and handle customer inquiries through WhatsApp Business API with intelligent routing and response management.",
    lottieUrl: "https://lottie.host/cf09b42b-7188-4ec2-97fc-ee86f2a6f715/V5mOCmuZUH.lottie"
  },
  {
    icon: Smartphone,
    title: "Automated Apps",
    description: "Deploy AI-powered mobile and web applications that handle customer interactions, bookings, and support without human intervention.",
    lottieUrl: "https://lottie.host/358dc85b-165f-40cd-8d08-060234e45d96/nlogmEg2JU.lottie"
  },
  {
    icon: Bot,
    title: "Voice AI Agents",
    description: "Human-like voice agents that understand context, emotions, and intent to provide natural conversational experiences across all channels.",
    lottieUrl: "https://lottie.host/28678e3a-1882-46c3-ae84-ed44b5204a05/falHxt8bTU.lottie"
  },
  {
    icon: Zap,
    title: "Real-time Analytics",
    description: "Comprehensive dashboards with live metrics, conversation insights, customer satisfaction scores, and performance analytics.",
    lottieUrl: "https://lottie.host/a65e0715-f453-4745-abc9-444a201eb839/IXBoFrydG5.lottie"
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 overflow-hidden rounded-3xl -mt-10 shadow-neumorphic-inset">
      {/* Gradient background */}
      <div className=" shadow-neumorphic-inset absolute inset-0 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#f0f9ff] from-[1%] via-[#93c5fd] via-[50%] to-[#d8b4fe] sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))] opacity-100 rounded-3xl"></div>
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-2xl shadow-neumorphic-inset bg-white text-gray-600">
            Core Features
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800">
            Everything you need to
            <span className="block text-blue-600">automate customer service</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive AI platform provides all the tools you need to transform your customer interactions and scale your business operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <div
                key={index}
                className="p-8 rounded-3xl shadow-neumorphic-inset bg-white border-2 border-blue-500/20 flex flex-col h-full"
              >
                
                <div className="space-y-6 flex flex-col h-full">
                  <div
                    className="w-16 h-16 rounded-2xl shadow-neumorphic-inset bg-white text-blue-600 flex items-center justify-center"
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Lottie Animation Container */}
                  <div className="flex-1 min-h-[200px] w-full">
                    <DotLottieReact
                      src={feature.lottieUrl}
                      loop
                      autoplay
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-blue-600">
                      {feature.title}
                    </h3>
                    <p className="leading-relaxed text-gray-700">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}