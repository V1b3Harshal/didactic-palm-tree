"use client"

import { Play, Pause, Volume2, RotateCcw, FastForward } from "lucide-react"
import { useState } from "react"

export const DemoSection = () => {
  const [playingDemo, setPlayingDemo] = useState<string | null>(null)

  const demoAgents = [
    {
      id: "eve",
      name: "Eve",
      role: "Situational Assessment",
      description:
        "Simulates real-life situations, taking on the role of a customer and analyzing how well the candidate can assess and handle.",
      duration: "1:35",
      currentTime: "0:52",
      progress: 38,
      color: "from-purple-500 to-blue-500",
    },
    {
      id: "sam",
      name: "Sam",
      role: "Tech Screener",
      description:
        "This Agent asks properly selected, pinpointed questions to thoroughly understand candidate's technical proficiency and experience.",
      duration: "5:43",
      currentTime: "3:41",
      progress: 65,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "sara",
      name: "Sara",
      role: "Soft Skills Evaluator",
      description:
        "Curates personalized questions for each candidate to plug gaps in their resume with respect to job requirements.",
      duration: "5:40",
      currentTime: "2:21",
      progress: 42,
      color: "from-pink-500 to-purple-500",
    },
  ]

  const togglePlay = (agentId: string) => {
    setPlayingDemo(playingDemo === agentId ? null : agentId)
  }

  return (
    <section
  id="demo"
  className=" shadow-neumorphic-inset relative pt-2 pb-15 bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 rounded-3xl /"
>  {/* Gradient background */}
  <div className=" shadow-neumorphic-inset absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from[#d8b4fe] from-[10%] via-[#93c5fd] via-[50%] to- [1%]-[#f0f9ff]  sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))] opacity-100"></div>
  
      <div className="max-w-6xl mx-auto px-6 rounded-3xl">
        {/* Neumorphic card container */}
        <div className="shadow-neumorphic-inset rounded-3xl p-8 md:p-12 lg:p-16  backdrop-blur-sm relative overflow-hidden">
  {/* Gradient background */}
  <div className=" shadow-neumorphic-inset absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#f0f9ff]  from-[1%] via-[#93c5fd] via-[50%] to-[#feb4d7] sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))] opacity-100 " ></div>
  
  {/* Content container with relative positioning */}
  <div className="relative z-10 rounded-3xl ">
    {/* Rest of your content remains the same */}
    {/* Demo Calls Section */}
    <div className="text-center mb-10">
      <div className="inline-block shadow-neumorphic-inset px-6 py-3 rounded-2xl text-purple-600 text-sm font-medium mb-2">
        Demo Calls
      </div>
      <h2 className=" text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
        Experience Our{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">
          AI Voice Agents
        </span>{" "}
        in Action
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-12">
        Listen to real conversations powered by our intelligent voice agents. Each agent is specialized for
        different recruitment scenarios and delivers human-like interactions.
      </p>
    </div>

    {/* Demo Audio Players */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-2">
      {demoAgents.map((agent) => (
        <div
          key={agent.id}
          className="shadow-neumorphic-inset bg-slate-50 rounded-2xl p-6 transition-all duration-300"
        >
          <div
            className={`w-16 h-16 bg-gradient-to-r ${agent.color} rounded-2xl flex items-center justify-center mb-6 shadow-neumorphic-inset`}
          >
            <span className="text-white font-bold text-xl">{agent.name[0]}</span>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">{agent.role}</h3>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">{agent.description}</p>

          {/* Audio Player */}
          <div className="shadow-neumorphic-inset rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => togglePlay(agent.id)}
                className="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-neumorphic-inset hover:shadow-neumorphic transition-all duration-200"
              >
                {playingDemo === agent.id ? (
                  <Pause className="w-4 h-4 text-gray-600" />
                ) : (
                  <Play className="w-4 h-4 text-gray-600 ml-0.5" />
                )}
              </button>

              <div className="flex items-center space-x-3">
                <button className="w-8 h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-neumorphic-inset">
                  <RotateCcw className="w-3 h-3 text-gray-600" />
                </button>
                <button className="w-8 h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-neumorphic-inset">
                  <FastForward className="w-3 h-3 text-gray-600" />
                </button>
                <button className="w-8 h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-neumorphic-inset">
                  <Volume2 className="w-3 h-3 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <span>{agent.currentTime}</span>
              <div className="flex-1 h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shadow-neumorphic-inset">
                <div
                  className={`h-full bg-gradient-to-r ${agent.color} rounded-full transition-all duration-300`}
                  style={{ width: `${agent.progress}%` }}
                ></div>
              </div>
              <span>{agent.duration}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  </div></div>
    </section>
  )
}
