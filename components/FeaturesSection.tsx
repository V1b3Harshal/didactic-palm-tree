// components/FeaturesSection.tsx
"use client"

import React from "react"
import {
  MessageSquare,
  Smartphone,
  Mic,
  BarChart2,
} from "lucide-react"

interface Feature {
  id: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
}

const features: Feature[] = [
  {
    id: "whatsapp",
    icon: MessageSquare,
    title: "WhatsApp Broadcast",
    description:
      "Send automated messages and handle customer inquiries through WhatsApp Business API with intelligent routing and response management.",
  },
  {
    id: "apps",
    icon: Smartphone,
    title: "Automated Apps",
    description:
      "Deploy AI-powered mobile and web applications that handle customer interactions, bookings, and support without human intervention.",
  },
  {
    id: "voice",
    icon: Mic,
    title: "Voice AI Agents",
    description:
      "Human-like voice agents that understand context, emotions, and intent to provide natural conversational experiences across all channels.",
  },
  {
    id: "analytics",
    icon: BarChart2,
    title: "Real-time Analytics",
    description:
      "Comprehensive dashboards with live metrics, conversation insights, customer satisfaction scores, and performance analytics.",
  },
]

export function FeaturesSection() {
  // Destructure so we can assign them to the original 2×2 layout
  const [whatsApp, automatedApp, voiceAgent, realTime] = features

  // Subtle shadow string for reuse
  const subtleShadow = `
    0 4px 6px rgba(0, 0, 0, 0.10),
    0 1px 3px rgba(0, 0, 0, 0.08)
  `

  return (
    <section
      id="features"
      className="relative pt-16 pb-32 bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ─── Section Header ────────────────────────────────────────────────── */}
        <div className="text-center">
          <div className="inline-block shadow-neumorphic-inset px-6 py-3 rounded-2xl text-blue-600 text-sm font-medium mb-4 bg-white">
            Core Features
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Everything you need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              automate customer service
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive AI platform provides all the tools you need to
            transform your customer interactions and scale your business
            operations.
          </p>
        </div>

        {/* ─── Top Row (2 Cards) ─────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Top-Left: WhatsApp Broadcast (wider, taller) */}
          <div
            className="relative w-full md:w-2/3 h-80 bg-white rounded-3xl overflow-hidden"
            style={{ boxShadow: subtleShadow.trim() }}
          >
            <div className="relative z-10 p-8 flex flex-col justify-between h-full">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white shadow-md">
                  <whatsApp.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {whatsApp.title}
                </h3>
              </div>
              <p className="mt-6 text-gray-700 leading-relaxed">
                {whatsApp.description}
              </p>
            </div>
          </div>

          {/* Top-Right: Automated Apps (narrower, same height) */}
          <div
            className="relative w-full md:w-1/3 h-80 bg-white rounded-3xl overflow-hidden"
            style={{ boxShadow: subtleShadow.trim() }}
          >
            <div className="relative z-10 p-8 flex flex-col justify-between h-full">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white shadow-md">
                  <automatedApp.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {automatedApp.title}
                </h3>
              </div>
              <p className="mt-6 text-gray-700 leading-relaxed">
                {automatedApp.description}
              </p>
            </div>
          </div>
        </div>

        {/* ─── Bottom Row (2 Cards) ───────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Bottom-Left: Voice AI Agents (narrower/square-ish) */}
          <div
            className="relative w-full md:w-1/3 h-64 bg-white rounded-3xl overflow-hidden"
            style={{ boxShadow: subtleShadow.trim() }}
          >
            <div className="relative z-10 p-6 flex flex-col justify-between h-full">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white shadow-md">
                  <voiceAgent.icon className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {voiceAgent.title}
                </h3>
              </div>
              <p className="mt-4 text-gray-700 leading-relaxed">
                {voiceAgent.description}
              </p>
            </div>
          </div>

          {/* Bottom-Right: Real-time Analytics (wider, same height) */}
          <div
            className="relative w-full md:w-2/3 h-64 bg-white rounded-3xl overflow-hidden"
            style={{ boxShadow: subtleShadow.trim() }}
          >
            <div className="relative z-10 p-6 flex flex-col justify-between h-full">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white shadow-md">
                  <realTime.icon className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {realTime.title}
                </h3>
              </div>
              <p className="mt-4 text-gray-700 leading-relaxed">
                {realTime.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
