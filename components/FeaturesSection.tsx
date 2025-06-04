"use client"

import { MessageCircle, Smartphone, Bot, Zap } from "lucide-react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

/**
 * Feature data.
 */
type Feature = {
  id: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  lottieUrl: string
}

const features: Feature[] = [
  {
    id: "whatsapp",
    icon: MessageCircle,
    title: "WhatsApp Broadcast",
    description:
      "Send automated messages and handle customer inquiries through WhatsApp Business API with intelligent routing and response management.",
    lottieUrl:
      "https://lottie.host/8cb3dc15-cc34-4591-893c-aeaf4084da52/Cm16opMITb.lottie",
  },
  {
    id: "apps",
    icon: Smartphone,
    title: "Automated Apps",
    description:
      "Deploy AI-powered mobile and web applications that handle customer interactions, bookings, and support without human intervention.",
    lottieUrl:
      "https://lottie.host/358dc85b-165f-40cd-8d08-060234e45d96/nlogmEg2JU.lottie",
  },
  {
    id: "voice",
    icon: Bot,
    title: "Voice AI Agents",
    description:
      "Human-like voice agents that understand context, emotions, and intent to provide natural conversational experiences across all channels.",
    lottieUrl:
      "https://lottie.host/ef853359-fd89-488e-ad01-89dbb4fe09ca/O5JDMyYEHh.lottie",
  },
  {
    id: "analytics",
    icon: Zap,
    title: "Real-time Analytics",
    description:
      "Comprehensive dashboards with live metrics, conversation insights, customer satisfaction scores, and performance analytics.",
    lottieUrl:
      "https://lottie.host/a65e0715-f453-4745-abc9-444a201eb839/IXBoFrydG5.lottie",
  },
]

/**
 * Zig-zag FeaturesSection with Lottie boxes that share the same depth-shadow as your “Demo Box.”
 */
export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative pt-2 pb-32 bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-block shadow-neumorphic-inset px-6 py-3 rounded-2xl text-blue-600 text-sm font-medium mb-2 bg-white">
            Core Features
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Everything you need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              automate customer service
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
            Our comprehensive AI platform provides all the tools you need to
            transform your customer interactions and scale your business
            operations.
          </p>
        </div>

        {/* Zig-Zag Feature Rows */}
        <div className="space-y-16">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            const isEven = idx % 2 === 1

            return (
              <div
                key={feature.id}
                className={`
                  flex flex-col-reverse lg:flex-row ${
                    isEven ? "lg:flex-row-reverse" : ""
                  } items-center gap-8
                `}
              >
                {/* --- Text Half (no box, just padding) --- */}
                <div className="lg:w-1/2 flex justify-center">
                  <div className="w-full max-w-md px-4 md:px-6">
                    {/* Icon + Title + Description */}
                    <div className="flex items-center mb-4">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white shadow-md mr-3">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* --- Lottie Half (with your Demo Box shadow) --- */}
                <div className="lg:w-1/2 flex justify-center">
                  <div
                    className="
                      relative
                      w-full
                      max-w-sm
                      sm:max-w-md
                      md:max-w-lg
                      aspect-square
                      bg-white
                      rounded-3xl
                      overflow-hidden
                    "
                    style={{
                      boxShadow: `
                        11px 21px 3px rgba(0,0,0,0.06),
                        14px 27px 7px rgba(0,0,0,0.10),
                        19px 38px 14px rgba(0,0,0,0.13),
                        27px 54px 27px rgba(0,0,0,0.16),
                        39px 78px 50px rgba(0,0,0,0.20),
                        55px 110px 86px rgba(0,0,0,0.26)
                      `,
                    }}
                  >
                    <DotLottieReact
                      src={feature.lottieUrl}
                      loop
                      autoplay
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
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
