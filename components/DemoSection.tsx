// components/DemoSection.tsx
"use client"

import React, { useState, useRef, useEffect, MouseEvent } from "react"
import { Play, Pause, Volume2, VolumeX, RotateCcw, FastForward } from "lucide-react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

type Agent = {
  id: string
  name: string
  role: string
  description: string
  color: string             // Tailwind gradient classes, e.g. "from-purple-500 to-blue-500"
  lottieUrl: string
  audioUrl?: string         // Optional
}

export const DemoSection = () => {
  const [playingAgent, setPlayingAgent] = useState<string | null>(null)

  const demoAgents: Agent[] = [
    {
      id: "sam",
      name: "Sam",
      role: "Situational Assessment",
      description:
        "Simulates real-life scenarios by taking on a customer role and testing how candidates assess and handle.",
      color: "from-purple-500 to-blue-500",
      lottieUrl:
        "https://lottie.host/1b742b7e-e3f9-403f-adfa-27dbaba03f58/OKV8XPdjBN.lottie",
      audioUrl: "https://sample-videos.com/audio/mp3/wave.mp3",
    },
    {
      id: "erika",
      name: "Erika",
      role: "Tech Screener",
      description:
        "Asks pinpointed technical questions to gauge candidate proficiency and real‐world experience.",
      color: "from-blue-500 to-cyan-500",
      lottieUrl:
        "https://lottie.host/be6d4c84-ce65-4da0-aece-dc8f87e0fe1c/UghPntBQ3X.lottie",
      audioUrl: "https://sample-videos.com/audio/mp3/crowd-cheering.mp3",
    },
    {
      id: "sara",
      name: "Sara",
      role: "Soft Skills Evaluator",
      description:
        "Curates personalized questions to uncover soft‐skill gaps relative to each role’s requirements.",
      color: "from-pink-500 to-purple-500",
      lottieUrl:
        "https://lottie.host/71b29f4c-75a1-4c3b-bc42-af79ebd304b1/Urys4YMTQM.lottie",
      audioUrl: "https://sample-videos.com/audio/mp3/wave.mp3",
    },
  ]

  return (
    <section
      id="demo"
      className="relative font-jakarta overflow-visible z-20"
    >
      {/* Full-bleed gradient background */}
      <div className="w-full bg-gradient-to-br from-white via-indigo-50 to-pink-50">
        {/* Constrained inner content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 lg:py-16 space-y-12">
          
          {/* Section Header */}
          <div className="text-center">
            <h2 className="font-raleway font-light text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-6">
              Experience Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">
                AI Voice Agents
              </span>{" "}
              in Action
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              Listen to real conversations powered by our intelligent voice agents,
              each specialized for different recruitment scenarios and delivering
              human­-like interactions.
            </p>
          </div>

          {/* Responsive cards grid: 1-col on mobile, 2-col at sm, 3-col at lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {demoAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                isPlaying={playingAgent === agent.id}
                setPlayingAgent={setPlayingAgent}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function AgentCard({
  agent,
  isPlaying,
  setPlayingAgent,
}: {
  agent: Agent
  isPlaying: boolean
  setPlayingAgent: (id: string | null) => void
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [muted, setMuted] = useState(false)

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onLoaded = () => setDuration(audio.duration)
    const onTime   = () => setCurrentTime(audio.currentTime)
    const onEnded  = () => setPlayingAgent(null)
    audio.addEventListener("loadedmetadata", onLoaded)
    audio.addEventListener("timeupdate", onTime)
    audio.addEventListener("ended", onEnded)
    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded)
      audio.removeEventListener("timeupdate", onTime)
      audio.removeEventListener("ended", onEnded)
    }
  }, [setPlayingAgent])

  // Sync mute state
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted
  }, [muted])

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m}:${s < 10 ? "0" + s : s}`
  }

  // Play / pause toggle
  const handleMainButton = async () => {
    const audio = audioRef.current
    if (!audio || !agent.audioUrl) return
    if (!isPlaying) {
      try {
        await audio.play()
        setPlayingAgent(agent.id)
      } catch {}
    } else {
      audio.pause()
      audio.currentTime = 0
      setPlayingAgent(null)
    }
  }

  const handleStop    = () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0 } ; setPlayingAgent(null) }
  const handleRewind  = () => { if (audioRef.current) audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0) }
  const handleForward = () => { if (audioRef.current) audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration) }
  const toggleMute    = () => setMuted((m) => !m)
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="flex flex-col bg-white rounded-[24px] overflow-hidden w-full min-h-[400px] shadow-md">
      {/* Lottie animation */}
      <div className="w-full aspect-video">
        <DotLottieReact
          src={agent.lottieUrl}
          loop
          autoplay
          speed={0.5}
          className="w-full h-full"
        />
      </div>

      {/* Hidden audio element */}
      {agent.audioUrl && (
        <audio ref={audioRef} src={agent.audioUrl} preload="metadata" />
      )}

      {/* Card header */}
      <div className="px-7 pt-6 pb-8 flex items-center justify-between">
        <div>
          <h3 className="font-raleway text-2xl text-gray-800 mb-1">{agent.name}</h3>
          <p className="text-sm text-gray-500">{agent.role}</p>
        </div>
        {!isPlaying && (
          <button
            onClick={handleMainButton}
            className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-full shadow-lg text-white transition-all duration-200"
            aria-label={agent.audioUrl ? `Play ${agent.name}` : `No audio`}
            disabled={!agent.audioUrl}
          >
            <Play className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-grow px-4 pb-6">
        {!isPlaying ? (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-center text-gray-600">{agent.description}</p>
          </div>
        ) : (
          <AudioControls
            audioRef={audioRef}
            currentTime={currentTime}
            duration={duration}
            progressPercent={progressPercent}
            agentColor={agent.color}
            formatTime={formatTime}
            handleStop={handleStop}
            handleRewind={handleRewind}
            handleForward={handleForward}
            toggleMute={toggleMute}
            muted={muted}
          />
        )}
      </div>
    </div>
  )
}

type AudioControlsProps = {
  audioRef: React.RefObject<HTMLAudioElement | null>
  currentTime: number
  duration: number
  progressPercent: number
  agentColor: string
  formatTime: (sec: number) => string
  handleStop: () => void
  handleRewind: () => void
  handleForward: () => void
  toggleMute: () => void
  muted: boolean
}

function AudioControls({
  audioRef,
  currentTime,
  duration,
  progressPercent,
  agentColor,
  formatTime,
  handleStop,
  handleRewind,
  handleForward,
  toggleMute,
  muted,
}: AudioControlsProps) {
  const handleSeek = (e: MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    audioRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handleStop}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shadow-neumorphic hover:shadow-neumorphic-inset transition-all duration-200"
          aria-label="Stop"
        >
          <Pause className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRewind}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shadow-neumorphic-inset hover:shadow-neumorphic transition-all duration-200"
            aria-label="Rewind 10s"
          >
            <RotateCcw className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={handleForward}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shadow-neumorphic-inset hover:shadow-neumorphic transition-all duration-200"
            aria-label="Forward 10s"
          >
            <FastForward className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={toggleMute}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shadow-neumorphic-inset hover:shadow-neumorphic transition-all duration-200"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX className="w-4 h-4 text-gray-600" />
            ) : (
              <Volume2 className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-xs text-gray-500">
        <span>{formatTime(currentTime)}</span>
        <div
          className="flex-1 h-1.5 bg-gray-200 rounded-full shadow-neumorphic-inset cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className={`h-full bg-gradient-to-r ${agentColor} rounded-full transition-all duration-300`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}
