// components/FeaturesSection.tsx
"use client"

import React from "react"
import {
  ChatBubbleLeftEllipsisIcon,
  DevicePhoneMobileIcon,
  MicrophoneIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"

interface Feature {
  id: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  bgImage: string
  accent: string      // Tailwind class for title color
  iconBg: string      // Tailwind class for icon container bg
  iconColor: string   // Tailwind class for icon color
}

const features: Feature[] = [
  {
    id: "whatsapp",
    icon: ChatBubbleLeftEllipsisIcon,
    title: "WhatsApp Broadcast",
    description:
      "Send automated messages and handle customer inquiries through WhatsApp Business API with intelligent routing and response management.",
    bgImage: "/shapes1.png",
    accent: "text-green-600",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "apps",
    icon: DevicePhoneMobileIcon,
    title: "Automated Apps",
    description:
      "Deploy AI-powered mobile and web applications that handle customer interactions, bookings, and support without human intervention.",
    bgImage: "/shapes4.png",
    accent: "text-blue-600",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "voice",
    icon: MicrophoneIcon,
    title: "Voice AI Agents",
    description:
      "Human-like voice agents that understand context, emotions, and intent to provide natural conversational experiences across all channels.",
    bgImage: "/shapes2.png",
    accent: "text-purple-600",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: "analytics",
    icon: ChartBarIcon,
    title: "Real-time Analytics",
    description:
      "Comprehensive dashboards with live metrics, conversation insights, customer satisfaction scores, and performance analytics.",
    bgImage: "/shapes5.png",
    accent: "text-orange-600",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
]

export function FeaturesSection() {
  // subtle box-shadow for all cards
  const subtleShadow = `
    0 4px 6px rgba(0, 0, 0, 0.10),
    0 1px 3px rgba(0, 0, 0, 0.08)
  `.trim()

  return (
    <section
      id="features"
      className="
        relative
        pt-16 pb-32
        bg-gradient-to-b from-gray-100 to-white
        rounded-3xl
      "
    >
      {/* static gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 via-white to-pink-200 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-block shadow-neumorphic-inset px-6 py-3 rounded-2xl bg-white text-sm font-medium text-blue-600 mb-4">
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

        {/* Grid layout: two rows of cards, respecting the 2/3–1/3 splits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const colSpanClass =
              idx === 0
                ? "md:col-span-2"
                : idx === 1
                ? "md:col-span-1"
                : idx === 2
                ? "md:col-span-1"
                : "md:col-span-2"

            // Crop more on the 2nd (idx=1) & 4th (idx=3) cards
            const yOffset = (idx === 1 || idx === 3) ? "-50px" : "-50px"

            return (
              <div
                key={feature.id}
                className={`
                  relative w-full h-80 rounded-3xl overflow-hidden
                  ${colSpanClass}
                `}
                style={{
                  boxShadow: subtleShadow,
                  backgroundImage: `url(${feature.bgImage})`,
                  backgroundSize: "112%",              // zoom in 110%
                  backgroundPosition: `center ${yOffset}`, // shift up to crop top
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* Blur overlay for soft bokeh effect */}
                <ProgressiveBlur
                  className="pointer-events-none absolute bottom-0 left-0 h-[50%] w-full"
                  blurIntensity={6}
                />

                <div className="relative z-10 p-8 flex flex-col justify-end h-full space-y-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`
                        flex-shrink-0 inline-flex items-center justify-center
                        w-12 h-12 rounded-full
                        ${feature.iconBg} ${feature.iconColor}
                      `}
                    >
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className={`text-2xl font-semibold ${feature.accent}`}>
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-800 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
