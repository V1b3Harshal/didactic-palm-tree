// components/BenefitsSection.tsx
"use client"

import { FlipWords } from "./flip-words"
import {
  DollarSign,
  Clock,
  Infinity,
  Zap,
  Users,
  Bot,
  BarChart2,
  Settings,
  MessageCircle,
  CheckCircle,
} from "lucide-react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { useEffect, useRef } from "react"

export const BenefitsSection = () => {
  const flipWords = ["FINANCES", "TIME", "RESOURCES", "EFFICIENCY", "SCALABILITY"]
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBars = document.querySelectorAll(".progress-bar-fill")
            progressBars.forEach((bar) => {
              const targetWidth = bar.getAttribute("data-width") || "100%"
              bar.setAttribute("style", `width: ${targetWidth}`)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    if (progressBarRef.current) {
      observer.observe(progressBarRef.current)
    }
    return () => observer.disconnect()
  }, [])

  const stats = [
    {
      value: "96%",
      label: "Cost Reduction",
      icon: DollarSign,
      color: "text-green-500",
      lottieUrl:
        "https://lottie.host/f9f7c46c-2254-4727-8b44-4216adc15905/qJo1f4m6Ne.lottie",
    },
    {
      value: "24/7",
      label: "Availability",
      icon: Clock,
      color: "text-blue-500",
      lottieUrl:
        "https://lottie.host/a4f447aa-e5e0-434d-b6b6-ae6646432925/sEiEBAUAxH.lottie",
    },
    {
      value: "∞",
      label: "Scalability",
      icon: Infinity,
      color: "text-purple-500",
      lottieUrl:
        "https://lottie.host/249ed411-30d6-4988-8ac1-61823866982f/3AMNFVmyzf.lottie",
    },
    {
      value: "10×",
      label: "Efficiency",
      icon: Zap,
      color: "text-orange-500",
      lottieUrl:
        "https://lottie.host/d5d53c5d-3e6e-4481-8007-626d5866a6f1/gRXm317Mdn.lottie",
    },
  ]

  return (
    <section
      id="benefits"
      className="font-sans bg-gray-50 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white shadow-md px-4 py-2 rounded-full text-purple-600 text-sm font-semibold mb-4">
            <Zap className="w-4 h-4 mr-1" />
            ROI-FOCUSED BENEFITS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Transform Your Business with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              AI Voice Agents
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            See how our AI solutions deliver measurable impact across your entire organization
          </p>
        </div>

        {/* Stats Grid with Lottie Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center text-center p-5"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 mb-4">
                  <DotLottieReact
                    src={stat.lottieUrl}
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>

                <div className={`absolute top-4 right-4 text-2xl ${stat.color} opacity-50`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className={`${stat.color} text-3xl font-bold mb-1`}>{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Comparison Blocks */}
        <div ref={progressBarRef} className="mb-20 space-y-12">
          {/* Cost-Effective Comparison */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Text Side */}
              <div className="lg:w-1/2">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg mr-4">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      Cost-Effective AI Agents
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      96% cheaper than human agents, with unlimited scalability
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">
                    Traditional vs. AI-Powered Efficiency
                  </h4>

                  {/* Traditional (Human) Bar */}
                  <div className="space-y-2">
                    <div className="text-gray-700 font-medium">Human Agents</div>
                    <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="progress-bar-fill h-full bg-gray-400 rounded-full"
                        data-width="100%"
                        style={{ width: "0%" }}
                      />
                    </div>
                    <div className="text-gray-500 text-sm mt-1">$2 per call</div>
                    <ul className="text-gray-600 text-sm mt-2 space-y-1">
                      <li className="flex items-center">
                        <span className="text-red-500 mr-2">✗</span> High labor costs
                      </li>
                      <li className="flex items-center">
                        <span className="text-red-500 mr-2">✗</span> Limited availability
                      </li>
                      <li className="flex items-center">
                        <span className="text-red-500 mr-2">✗</span> Inconsistent quality
                      </li>
                    </ul>
                  </div>

                  {/* AI ( Convis) Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-medium"> Convis AI Agents</span>
                      <span className="px-2 py-0.5 text-xs font-bold text-white bg-blue-600 rounded-full">
                        RECOMMENDED
                      </span>
                    </div>
                    <div className="relative h-4 bg-blue-100 rounded-full overflow-hidden">
                      <div
                        className="progress-bar-fill h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                        data-width="4%"
                        style={{ width: "0%" }}
                      />
                    </div>
                    <div className="text-blue-600 text-sm mt-1 font-semibold">
                      $0.20 per call
                    </div>
                    <ul className="text-gray-600 text-sm mt-2 space-y-1">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> 99% cost reduction
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> 24/7 availability
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Consistent quality
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Lottie Side */}
              <div className="lg:w-1/2 flex justify-center">
                <div className="w-full max-w-md aspect-square bg-white rounded-2xl  overflow-hidden">
                  <DotLottieReact
                    src="https://lottie.host/819721c4-3b23-44d3-b895-f8ef2ab0be4b/egHKGwovHB.lottie"
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Time & Resources Comparison */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Lottie Side */}
              <div className="lg:w-1/2 flex justify-center">
                <div className="w-full max-w-md aspect-square bg-white rounded-2xl  overflow-hidden">                  <DotLottieReact
                    src="https://lottie.host/2a3c3b70-0677-4c66-8e37-f209792c12dc/desN5ErhmR.lottie"
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
              </div>

              {/* Text Side */}
              <div className="lg:w-1/2">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg mr-4">
                    <Infinity className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      Massive Scalability
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Our AI agents can handle thousands of calls simultaneously.
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">
                    Traditional vs. AI-Powered Capacity
                  </h4>
                  
                  {/* Traditional Capacity */}
                  <div className="space-y-2">
                    <div className="text-gray-700 font-medium">Human Agents (Limited Capacity)</div>
                    <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="progress-bar-fill h-full bg-gray-400 rounded-full"
                        data-width="20%"
                        style={{ width: "0%" }}
                      />
                    </div>
                    <div className="text-gray-500 text-sm mt-1">1 concurrent call</div>
                    <p className="text-gray-600 text-sm mt-2">
                      Human agents can only handle one call at a time.
                    </p>
                  </div>

                  {/* AI Capacity */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-medium">AI Agents (Unlimited)</span>
                      <span className="px-2 py-0.5 text-xs font-bold text-white bg-green-600 rounded-full">
                        UNLIMITED
                      </span>
                    </div>
                    <div className="relative h-4 bg-blue-100 rounded-full overflow-hidden">
                      <div
                        className="progress-bar-fill h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                        data-width="100%"
                        style={{ width: "0%" }}
                      />
                    </div>
                    <div className="text-gray-900 text-sm mt-1 font-semibold">1000+ concurrent calls</div>
                    <p className="text-gray-600 text-sm mt-2">
                      AI agents can handle thousands at once, eliminating bottlenecks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Benefit 1: Real-time Analytics */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start space-y-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
              <BarChart2 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Real-time Analytics</h3>
              <p className="text-gray-600 text-sm">
                Get instant insights into candidate responses with our advanced analytics dashboard.
              </p>
            </div>
            <div className="mt-auto w-full max-w-sm aspect-square bg-white rounded-2xl overflow-hidden mx-auto">
              <DotLottieReact
                src="https://lottie.host/4e00d4dd-b38a-489e-8e60-9725cf55025c/Xih5LshMWs.lottie"
                loop
                autoplay
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Benefit 2: Customizable Workflows */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start space-y-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <Settings className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Customizable Workflows</h3>
              <p className="text-gray-600 text-sm">
                Tailor the call process to your exact requirements with our flexible configuration options.
              </p>
            </div>
            <div className="mt-auto w-full max-w-sm aspect-square bg-white rounded-2xl overflow-hidden mx-auto">
              <DotLottieReact
                src="https://lottie.host/b2426145-0d5a-46b9-af9c-3252518a23c5/krjyw4f0me.lottie"
                loop
                autoplay
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Benefit 3: Natural Conversations */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start space-y-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Natural Conversations</h3>
              <p className="text-gray-600 text-sm">
                Our AI agents engage candidates with human-like conversations for a better experience.
              </p>
            </div>
            <div className="mt-auto w-full max-w-sm aspect-square bg-white rounded-2xl overflow-hidden mx-auto">
              <DotLottieReact
                src="https://lottie.host/562cb3ee-66eb-4c48-b816-9212c2ce55ce/onhYbKihVx.lottie"
                loop
                autoplay
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
