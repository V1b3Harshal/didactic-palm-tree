"use client"

import { Play, Pause, Volume2, VolumeX, RotateCcw, FastForward } from "lucide-react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { useState, useRef, useEffect, MouseEvent } from "react"

type Agent = {
  id: string
  name: string
  role: string
  description: string
  color: string             // Tailwind gradient classes, e.g. "from-purple-500 to-blue-500"
  lottieUrl: string
  audioUrl?: string         // Optional, guard before using
}

export const DemoSection = () => {
  // Which agent is playing (by ID). Null means none.
  const [playingAgent, setPlayingAgent] = useState<string | null>(null)

  // Demo data
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
        "Curates personalized questions to uncover soft‐skill gaps relative to each role's requirements.",
      color: "from-pink-500 to-purple-500",
      lottieUrl:
        "https://lottie.host/71b29f4c-75a1-4c3b-bc42-af79ebd304b1/Urys4YMTQM.lottie",
      audioUrl: "https://sample-videos.com/audio/mp3/wave.mp3",
    },
  ]

  return (
    <section
      id="demo"
      className="
        font-sans
        relative
        z-20                         /* sit above the phone */
        -mt-8 md:-mt-10              /* pull it up 8rem on mobile, 12rem on md+ */
        neumorphic-inset shadow-neumorphic-inset
        pb-16 sm:pb-24 md:pb-32
        bg-gradient-to-b from-[#E4E4E4] to-[#FFFFFF]
        rounded-3xl
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-4 sm:p-6 md:p-12 lg:p-16">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
              Experience Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">
                AI Voice Agents
              </span>{" "}
              in Action
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto px-2 sm:px-0">
              Listen to real conversations powered by our intelligent voice agents,
              each specialized for different recruitment scenarios and delivering
              human‐like interactions.
            </p>
          </div>

          {/* Demo Cards Grid */}
          <div
            className="
              grid
              grid-cols-1        /* single column on mobile */
              md:grid-cols-2     /* 2 columns from tablet */
              xl:grid-cols-3     /* 3 columns from large desktop */
              gap-4 sm:gap-6 lg:gap-8
              bg-gradient-to-b from-[#DFDBFE] to-[#EBD7FC]
              p-3 sm:p-4 md:p-6 lg:p-8
              rounded-2xl sm:rounded-3xl
              shadow-lg
            "
          >
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

  // Track playback time and duration
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Mute state
  const [muted, setMuted] = useState(false)

  // When metadata loads or time updates or playback ends
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onLoaded = () => {
      setDuration(audio.duration)
    }
    const onTime = () => {
      setCurrentTime(audio.currentTime)
    }
    const onEnded = () => {
      setPlayingAgent(null)
    }

    audio.addEventListener("loadedmetadata", onLoaded)
    audio.addEventListener("timeupdate", onTime)
    audio.addEventListener("ended", onEnded)
    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded)
      audio.removeEventListener("timeupdate", onTime)
      audio.removeEventListener("ended", onEnded)
    }
  }, [setPlayingAgent])

  // Sync mute state to the <audio> element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted
    }
  }, [muted])

  // Format seconds → "M:SS"
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m}:${s < 10 ? "0" + s : s}`
  }

  // Click on top Play button
  const handleMainButton = async () => {
    const audio = audioRef.current

    if (!audio || !agent.audioUrl) {
      console.warn(
        `Cannot play "${agent.name}" because no valid audioUrl was provided.`
      )
      return
    }

    if (!isPlaying) {
      try {
        await audio.play()
        setPlayingAgent(agent.id)
      } catch {
        console.warn(
          `Failed to play audio for "${agent.name}". Check the URL.`
        )
      }
    } else {
      audio.pause()
      audio.currentTime = 0
      setPlayingAgent(null)
    }
  }

  // Bottom "Stop" button
  const handleStop = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
    setPlayingAgent(null)
  }

  // Rewind / Forward / Mute
  const handleRewind = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(audio.currentTime - 10, 0)
  }
  const handleForward = () => {
    const audio = audioRef.current
    if (!audio || !duration) return
    audio.currentTime = Math.min(audio.currentTime + 10, duration)
  }
  const toggleMute = () => setMuted((m) => !m)

  const progressPercent =
    duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="
      flex flex-col 
      bg-white/95 backdrop-blur-sm
      rounded-2xl sm:rounded-[24px] 
      overflow-hidden 
      w-full 
      mx-auto
      max-w-sm sm:max-w-none
      min-h-[380px] sm:min-h-[400px] 
      shadow-xl 
      border border-white/20
      hover:shadow-2xl hover:scale-[1.02]
      transition-all duration-300 ease-out
      group
    ">
      {/* 1) Lottie animation */}
      <div className="w-full aspect-video bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent z-10"></div>
        <DotLottieReact
          src={agent.lottieUrl}
          loop
          autoplay
          speed={0.5}
          className="w-full h-full scale-110 group-hover:scale-125 transition-transform duration-500"
        />
      </div>

      {/* Hidden audio element */}
      {agent.audioUrl && (
        <audio ref={audioRef} src={agent.audioUrl} preload="metadata" />
      )}

      {/* 2) Header */}
      <div className="px-4 sm:px-6 lg:px-7 pt-4 sm:pt-6 pb-4 sm:pb-6 lg:pb-8 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-1 truncate">{agent.name}</h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{agent.role}</p>
        </div>

        {!isPlaying && (
          <button
            onClick={handleMainButton}
            className={`
              bg-gradient-to-r ${agent.color}
              hover:shadow-2xl hover:scale-110 active:scale-95
              text-white
              p-2.5 sm:p-3
              rounded-full
              shadow-lg
              transition-all
              duration-300
              flex items-center justify-center
              flex-shrink-0
              ml-3
              group-hover:animate-pulse
            `}
            aria-label={agent.audioUrl ? `Play ${agent.name}` : `No audio`}
            disabled={!agent.audioUrl}
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>

      {/* 3) Description or Controls */}
      <div className="flex flex-col flex-grow px-3 sm:px-4 lg:px-4 pb-4 sm:pb-6">
        {!isPlaying ? (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-center text-sm sm:text-base text-gray-600 leading-relaxed px-1">
              {agent.description}
            </p>
          </div>
        ) : (
          <div className="flex flex-col flex-grow justify-center">
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
          </div>
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
    const clickX = e.clientX - rect.left
    audioRef.current.currentTime = (clickX / rect.width) * duration
  }

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={handleStop}
          className="
            w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11
            bg-gradient-to-br from-gray-100 to-gray-200
            rounded-full flex items-center justify-center
            shadow-lg hover:shadow-xl active:scale-95
            transition-all duration-200
            border border-gray-200/50
          "
          aria-label="Stop"
        >
          <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </button>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={handleRewind}
            className="
              w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9
              bg-gradient-to-br from-gray-100 to-gray-200
              rounded-full flex items-center justify-center
              shadow-md hover:shadow-lg active:scale-95
              transition-all duration-200
              border border-gray-200/50
            "
            aria-label="Rewind 10s"
          >
            <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
          </button>
          <button
            onClick={handleForward}
            className="
              w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9
              bg-gradient-to-br from-gray-100 to-gray-200
              rounded-full flex items-center justify-center
              shadow-md hover:shadow-lg active:scale-95
              transition-all duration-200
              border border-gray-200/50
            "
            aria-label="Forward 10s"
          >
            <FastForward className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
          </button>
          <button
            onClick={toggleMute}
            className="
              w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9
              bg-gradient-to-br from-gray-100 to-gray-200
              rounded-full flex items-center justify-center
              shadow-md hover:shadow-lg active:scale-95
              transition-all duration-200
              border border-gray-200/50
            "
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            ) : (
              <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-500">
        <span className="font-mono text-xs">{formatTime(currentTime)}</span>
        <div
          className="flex-1 h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shadow-inner cursor-pointer relative overflow-hidden"
          onClick={handleSeek}
        >
          <div
            className={`h-full bg-gradient-to-r ${agentColor} rounded-full transition-all duration-300 shadow-sm relative`}
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute inset-0 bg-white/30 rounded-full"></div>
          </div>
        </div>
        <span className="font-mono text-xs">{formatTime(duration)}</span>
      </div>
    </div>
  )
}