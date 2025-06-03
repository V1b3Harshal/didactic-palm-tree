"use client"

import { FlipWords } from "./flip-words"
import { MessageCircle, Settings, Bot, Infinity, DollarSign, Users, Clock, Zap, BarChart2, CheckCircle } from "lucide-react"
import { useEffect, useRef } from "react"

export const BenefitsSection = () => {
  const flipWords = ["FINANCES", "TIME", "RESOURCES", "EFFICIENCY", "SCALABILITY"]
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBars = document.querySelectorAll('.progress-bar-fill')
            progressBars.forEach((bar) => {
              const targetWidth = bar.getAttribute('data-width') || '100%'
              bar.setAttribute('style', `width: ${targetWidth}`)
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
    { value: "96%", label: "Cost Reduction", icon: DollarSign, color: "text-green-500" },
    { value: "24/7", label: "Availability", icon: Clock, color: "text-blue-500" },
    { value: "∞", label: "Scalability", icon: Infinity, color: "text-purple-500" },
    { value: "10x", label: "Efficiency", icon: Zap, color: "text-orange-500" },
  ]

  return (
    <section id="benefits" className="relative px-4 -mt-5 py-16 sm:px-6 sm:py-20 lg:py-24 rounded-3xl shadow-neumorphic-inset">
      {/* Gradient background */}
      <div className=" shadow-neumorphic-inset absolute inset-0 rounded-3xl bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#f0f9ff] from-[1%] via-[#93c5fd] via-[50%] to-[#feb4ef] sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))] opacity-100"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center shadow-neumorphic-inset bg-slate-100 px-5 py-2 rounded-xl text-purple-600 text-sm font-medium mb-5">
            <Zap className="w-4 h-4 mr-2" />
            ROI-FOCUSED BENEFITS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Transform Your Business with <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              AI Voice Agents
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            See how our AI solutions deliver measurable impact across your entire organization
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 sm:mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="shadow-neumorphic-inset bg-slate-100 rounded-xl p-4 sm:p-5 text-center">
              <div className={`flex justify-center mb-2 ${stat.color}`}>
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-sm sm:text-base font-medium text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Cost-Effective AI Agents Feature */}
        <div className="mb-16" ref={progressBarRef}>
          <div className="shadow-neumorphic-inset rounded-3xl p-6 sm:p-8 bg-white">
            <div className="text-center mb-8">
              <div className="flex flex-col items-center justify-center mb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                  <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Cost-Effective AI Agents</h3>
                  <p className="text-gray-600 text-sm sm:text-base">96% cheaper than human agents with unlimited scalability</p>
                </div>
              </div>
            </div>

            {/* Comparison Section */}
            <div className="neumorphic-inset rounded-3xl p-6 sm:p-8 bg-slate-50">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">
                  Optimize your <FlipWords words={flipWords} className="text-blue-600 font-bold" /> <br className="hidden sm:block" />
                  with AI voice agents
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                  Traditional methods vs. AI-powered efficiency - see the difference
                </p>
              </div>

              {/* Finances Comparison */}
              <div className="grid md:grid-cols-2 gap-5 sm:gap-6 mb-8">
                {/* Human Side */}
                <div className="shadow-neumorphic-inset bg-slate-100 rounded-2xl p-5 sm:p-6 transition-all duration-300  ">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-3 sm:mb-4">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 mr-2" />
                      <span className="text-sm sm:text-base font-semibold text-gray-600">TRADITIONAL</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Human Agents</h4>

                    {/* Cost Visualization */}
                    <div className="relative mb-4 sm:mb-5">
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="progress-bar-fill h-full rounded-full bg-gradient-to-r from-gray-400 to-gray-500" 
                          data-width="100%"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                      <div className="absolute -bottom-6 left-0 right-0 text-center">
                        <div className="text-sm sm:text-lg font-bold text-gray-200">$20</div>
                        <div className="text-xs sm:text-sm text-gray-500">per interview</div>
                      </div>
                    </div>

                    <ul className="text-left text-sm sm:text-base text-gray-600 space-y-2 mt-6 sm:mt-8">
                      <li className="flex items-start">
                        <div className="text-red-500 mr-2 mt-0.5">✗</div>
                        <span>High labor costs</span>
                      </li>
                      <li className="flex items-start">
                        <div className="text-red-500 mr-2 mt-0.5">✗</div>
                        <span>Limited availability</span>
                      </li>
                      <li className="flex items-start">
                        <div className="text-red-500 mr-2 mt-0.5">✗</div>
                        <span>Inconsistent quality</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* AI Side */}
                <div className="shadow-neumorphic-inset bg-slate-100 rounded-2xl p-5 sm:p-6 transition-all duration-300   relative border-2 border-blue-100">
                  <div className="absolute -top-3 -right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md z-10">
                    RECOMMENDED
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-3 sm:mb-4">
                      <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2" />
                      <span className="text-sm sm:text-base font-semibold text-blue-600">AI SOLUTION</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Sampark AI Agents</h4>

                    {/* Cost Visualization */}
                    <div className="relative mb-4 sm:mb-5">
                      <div className="h-4 bg-blue-100 rounded-full overflow-hidden">
                        <div 
                          className="progress-bar-fill h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600" 
                          data-width="4%"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                      <div className="absolute -bottom-6 left-0 right-0 text-center">
                        <div className="text-lg sm:text-xl font-bold text-blue-600">$0.80</div>
                        <div className="text-xs sm:text-sm text-blue-500">per interview</div>
                      </div>
                    </div>

                    <ul className="text-left text-sm sm:text-base text-gray-600 space-y-2 mt-6 sm:mt-8">
                      <li className="flex items-start">
                        <div className="text-green-500 mr-2 mt-0.5"><CheckCircle className="w-4 h-4" /></div>
                        <span>96% cost reduction</span>
                      </li>
                      <li className="flex items-start">
                        <div className="text-green-500 mr-2 mt-0.5"><CheckCircle className="w-4 h-4" /></div>
                        <span>24/7 availability</span>
                      </li>
                      <li className="flex items-start">
                        <div className="text-green-500 mr-2 mt-0.5"><CheckCircle className="w-4 h-4" /></div>
                        <span>Consistent quality</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Time & Resources Comparison */}
              <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                {/* Human Side */}
                <div className="shadow-neumorphic-inset bg-slate-100 rounded-2xl p-5 sm:p-6 transition-all duration-300  ">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-3 sm:mb-4">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 mr-2" />
                      <span className="text-sm sm:text-base font-semibold text-gray-600">TRADITIONAL</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Limited Capacity</h4>

                    {/* Capacity Visualization */}
                    <div className="relative mb-4 sm:mb-5">
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="progress-bar-fill h-full rounded-full bg-gradient-to-r from-gray-400 to-gray-500" 
                          data-width="20%"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                      <div className="absolute -bottom-6 left-0 right-0 text-center">
                        <div className="text-lg sm:text-xl font-bold text-gray-700">1</div>
                        <div className="text-xs sm:text-sm text-gray-500">concurrent interview</div>
                      </div>
                    </div>

                    <div className="text-sm sm:text-base text-gray-600 mt-6 sm:mt-8">
                      <p>Human agents can only handle one interview at a time, creating bottlenecks in your hiring process.</p>
                    </div>
                  </div>
                </div>

                {/* AI Side */}
                <div className="shadow-neumorphic-inset bg-slate-100 rounded-2xl p-5 sm:p-6 transition-all duration-300   relative">
                  <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    UNLIMITED
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-3 sm:mb-4">
                      <Infinity className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2" />
                      <span className="text-sm sm:text-base font-semibold text-blue-600">AI SOLUTION</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Massive Scalability</h4>

                    {/* Capacity Visualization */}
                    <div className="relative mb-4 sm:mb-5">
                      <div className="h-4 bg-blue-100 rounded-full overflow-hidden">
                        <div 
                          className="progress-bar-fill h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600" 
                          data-width="100%"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                      <div className="absolute -bottom-6 left-0 right-0 text-center">
                        <div className="text-l sm:text-xl font-bold text-gray-100">1000+</div>
                        <div className="text-xs sm:text-sm text-blue-500">concurrent interviews</div>
                      </div>
                    </div>

                    <div className="text-sm sm:text-base text-gray-600 mt-6 sm:mt-8">
                      <p>Our AI agents can handle thousands of interviews simultaneously, eliminating bottlenecks and accelerating your hiring process.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* Benefit 1 */}
          <div className="shadow-neumorphic-inset bg-slate-100 rounded-2xl p-6 sm:p-7   transition-all duration-300">
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mr-4">
                <BarChart2 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Real-time Analytics</h3>
                <p className="text-sm sm:text-base text-gray-600">Get instant insights into candidate responses with our advanced analytics dashboard.</p>
              </div>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="shadow-neumorphic-inset bg-slate-100 rounded-2xl p-6 sm:p-7   transition-all duration-300">
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mr-4">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Customizable Workflows</h3>
                <p className="text-sm sm:text-base text-gray-600">Tailor the interview process to your exact requirements with our flexible configuration options.</p>
              </div>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="shadow-neumorphic-inset bg-slate-100 rounded-2xl p-6 sm:p-7   transition-all duration-300">
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mr-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Natural Conversations</h3>
                <p className="text-sm sm:text-base text-gray-600">Our AI agents engage candidates with human-like conversations for a better candidate experience.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}