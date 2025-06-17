import React from "react"
import {
  MessageCircle,
  Smartphone,
  Mic,
  BarChart3,
  Sparkles,
  Zap,
  TrendingUp,
  Users,
  Check,
  ArrowRight,
  Star,
  Globe
} from "lucide-react"

interface Feature {
  id: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  bgImage: string
  accent: string
  iconBg: string
  iconColor: string
  stats?: { label: string; value: string }[]
  highlights?: string[]
  decorativeIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const features: Feature[] = [
  {
    id: "whatsapp",
    icon: MessageCircle,
    title: "WhatsApp Broadcast",
    description:
      "Send automated messages and handle customer inquiries through WhatsApp Business API with intelligent routing and response management.",
    bgImage: "",
    accent: "text-green-600",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    stats: [
      { label: "Response Time", value: "<2s" },
      { label: "Success Rate", value: "98%" }
    ],
    highlights: [ "Multi-language", "24/7 Support"],
    decorativeIcon: Globe
  },
  {
    id: "apps",
    icon: Smartphone,
    title: "Automated Apps",
    description:
      "Deploy AI-powered mobile and web applications that handle customer interactions, bookings, and support without human intervention.",
    bgImage: "",
    accent: "text-blue-600",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    stats: [
      { label: "Uptime", value: "99.9%" }
    ],
    highlights: ["No-code setup", "Cross-platform"],
    decorativeIcon: Zap
  },
  {
    id: "voice",
    icon: Mic,
    title: "Voice AI Agents",
    description:
      "Human-like voice agents that understand context, emotions, and intent to provide natural conversational experiences across all channels.",
    bgImage: "",
    accent: "text-purple-600",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    stats: [
      { label: "Accuracy", value: "95%" }
    ],
    highlights: ["Natural speech",  "Context aware"],
    decorativeIcon: Sparkles
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Comprehensive dashboards with live metrics, conversation insights, customer satisfaction scores, and performance analytics.",
    bgImage: "",
    accent: "text-orange-600",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    stats: [
      { label: "Reports", value: "Real-time" }
    ],
    highlights: ["Live dashboards", "Custom reports", "AI insights"],
    decorativeIcon: TrendingUp
  },
]

export function FeaturesSection() {
  const subtleShadow = `
    0 4px 6px rgba(0, 0, 0, 0.10),
    0 1px 3px rgba(0, 0, 0, 0.08)
  `.trim()

  return (
    <section
      id="features"
      className="relative pt-16 pb-32 rounded-3xl "
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-indigo-50 to-pink-50 z-0 rounded-3xl" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-3xl">
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-purple-100 rounded-full opacity-30 blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-100 rounded-full opacity-25 blur-md"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 shadow-lg px-6 py-3 rounded-2xl bg-white text-sm font-medium text-blue-600 mb-4 border border-blue-100">
            <Sparkles className="w-4 h-4" />
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

        {/* Grid layout */}
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

            return (
              <div
                key={feature.id}
                className={`
                  relative w-full h-80 rounded-3xl overflow-hidden
                  ${colSpanClass}
                  bg-white border border-gray-100
                  hover:shadow-xl transition-all duration-300
                  group cursor-pointer
                `}
                style={{ boxShadow: subtleShadow }}
              >
                {/* Gradient overlay background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  feature.id === 'whatsapp' ? 'from-green-50 to-emerald-50' :
                  feature.id === 'apps' ? 'from-blue-50 to-cyan-50' :
                  feature.id === 'voice' ? 'from-purple-50 to-violet-50' :
                  'from-orange-50 to-amber-50'
                } opacity-60`} />

                {/* Decorative patterns */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${
                    feature.id === 'whatsapp' ? 'from-green-400 to-green-600' :
                    feature.id === 'apps' ? 'from-blue-400 to-blue-600' :
                    feature.id === 'voice' ? 'from-purple-400 to-purple-600' :
                    'from-orange-400 to-orange-600'
                  } transform translate-x-8 -translate-y-8`} />
                </div>

                {/* Floating decorative icon */}
                <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity">
                  {feature.decorativeIcon && (
                    <feature.decorativeIcon className={`w-8 h-8 ${feature.iconColor}`} />
                  )}
                </div>

                {/* Stats badges (for larger cards) */}
                {(idx === 0 || idx === 3) && feature.stats && (
                  <div className="absolute top-6 left-6 flex gap-2">
                    {feature.stats.map((stat, statIdx) => (
                      <div
                        key={statIdx}
                        className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/50 shadow-sm"
                      >
                        <div className={`text-sm font-bold ${feature.accent}`}>
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-600">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Main content */}
                <div className="relative z-10 p-8 flex flex-col justify-end h-full space-y-4">
                  {/* Icon and title */}
                  <div className="flex items-center space-x-4">
                    <div
                      className={`
                        flex-shrink-0 inline-flex items-center justify-center
                        w-14 h-14 rounded-2xl shadow-lg
                        ${feature.iconBg} ${feature.iconColor}
                        group-hover:scale-110 transition-transform duration-300
                      `}
                    >
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-2xl font-bold ${feature.accent} mb-1`}>
                        {feature.title}
                      </h3>
                      {/* Small stats for smaller cards */}
                      {(idx === 1 || idx === 2) && feature.stats && (
                        <div className="flex gap-3">
                          {feature.stats.map((stat, statIdx) => (
                            <div key={statIdx} className="flex items-center gap-1">
                              <div className={`text-sm font-bold ${feature.accent}`}>
                                {stat.value}
                              </div>
                              <div className="text-xs text-gray-500">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                   
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {feature.description}
                  </p>

                  {/* Feature highlights */}
                  {feature.highlights && (
                    <div className="flex flex-wrap gap-2">
                      {feature.highlights.map((highlight, highlightIdx) => (
                        <div
                          key={highlightIdx}
                          className="inline-flex items-center gap-1 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-gray-600 border border-white/50"
                        >
                          <Check className="w-3 h-3 text-green-500" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bottom decoration */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-30" />
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}