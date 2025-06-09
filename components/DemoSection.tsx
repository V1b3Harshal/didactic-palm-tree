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
    className="
      relative 
      z-20                         /* sit above the phone */
      -mt-8 md:-mt-10            /* pull it up 8rem on mobile, 12rem on md+ */
      neumorphic-inset shadow-neumorphic-inset
      pb-32
      bg-gradient-to-b from-[#E4E4E4] to-[#FFFFFF] rounded-3xl
    "
  >
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-3xl p-8 md:p-12 lg:p-16">
          {/* Section Header */}
          <div className="text-center">
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Experience Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">
                AI Voice Agents
              </span>{" "}
              in Action
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-12">
              Listen to real conversations powered by our intelligent voice agents,
              each specialized for different recruitment scenarios and delivering
              human‐like interactions.
            </p>
          </div>

          {/* Demo Cards Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 bg-gradient-to-b from-[#DFDBFE] to-[#EBD7FC] pt-5 pb-5 rounded-3xl px-5">
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

    // Guard: if no valid audio URL, do nothing
    if (!audio || !agent.audioUrl) {
      console.warn(
        `Cannot play "${agent.name}" because no valid audioUrl was provided.`
      )
      return
    }

    // If not playing yet, start playback
    if (!isPlaying) {
      try {
        await audio.play()
        setPlayingAgent(agent.id)
      } catch (err) {
        console.warn(
          `Failed to play audio for "${agent.name}". Check that "${agent.audioUrl}" is valid.`
        )
      }
    } else {
      // If already playing, pause & reset
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

  // Rewind 10 seconds
  const handleRewind = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max((audio.currentTime || 0) - 10, 0)
  }

  // Forward 10 seconds
  const handleForward = () => {
    const audio = audioRef.current
    if (!audio || !duration) return
    audio.currentTime = Math.min((audio.currentTime || 0) + 10, duration)
  }

  // Toggle mute/unmute
  const toggleMute = () => {
    setMuted((prev) => !prev)
  }

  // Compute playback percentage for progress bar
  const progressPercent =
    duration > 0 ? (currentTime / duration) * 100 : 0

      return (
         <div className="flex flex-col bg-white rounded-[24px] overflow-hidden w-full max-w-sm min-h-[400px] shadow-md">
         {/* 1) Lottie animation at the top: keep a fixed aspect ratio instead of a fixed height */}
         <div className="w-full aspect-video ">
           <DotLottieReact
             src={agent.lottieUrl}
            loop
             autoplay
              speed={0.5}
            className="w-full h-full"
            />
       </div>

      {/* Hidden audio element */}
      {agent.audioUrl ? (
        <audio ref={audioRef} src={agent.audioUrl} preload="metadata" />
      ) : null}

      {/* 2) Header: Agent name + role on left, small Play button on right */}
      <div className="px-7 pt-6 pb-8 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{agent.name}</h3>
          <p className="text-sm text-gray-500">{agent.role}</p>
        </div>

        {!isPlaying && (
          <button
            onClick={handleMainButton}
            className={`
              bg-gradient-to-r from-purple-500 to-blue-500
              hover:shadow-neumorphic-inset
              text-white
              p-3
              rounded-full
              shadow-lg
              transition-all
              duration-200
              flex items-center justify-center
            `}
            aria-label={agent.audioUrl ? `Play ${agent.name}` : `No audio available`}
            disabled={!agent.audioUrl}
          >
            <Play className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 3) Middle/Bottom: description (if not playing) or audio controls (if playing). */}
      <div className="flex flex-col flex-grow px-4 pb-6">
        {!isPlaying ? (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-center text-base text-gray-600">
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
  agentColor: string            // Tailwind gradient classes
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
  // When user clicks on the bar, calculate new time
  const handleSeek = (e: MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return
    const bar = e.currentTarget
    const rect = bar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    audioRef.current.currentTime = newTime
  }

  return (
    <div className="w-full">
      {/* Control buttons row */}
      <div className="flex items-center justify-between mb-4">
        {/* Stop Button */}
        <button
          onClick={handleStop}
          className="
            w-10 h-10 sm:w-11 sm:h-11
            bg-gray-100
            rounded-full flex items-center justify-center
            shadow-neumorphic hover:shadow-neumorphic-inset
            transition-all duration-200
          "
          aria-label="Stop"
        >
          <Pause className="w-5 h-5 text-gray-600" />
        </button>

        {/* Rewind / Forward / Mute */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRewind}
            className="
              w-8 h-8 sm:w-9 sm:h-9
              bg-gray-100
              rounded-full flex items-center justify-center
              shadow-neumorphic-inset hover:shadow-neumorphic
              transition-all duration-200
            "
            aria-label="Rewind 10s"
          >
            <RotateCcw className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={handleForward}
            className="
              w-8 h-8 sm:w-9 sm:h-9
              bg-gray-100
              rounded-full flex items-center justify-center
              shadow-neumorphic-inset hover:shadow-neumorphic
              transition-all duration-200
            "
            aria-label="Forward 10s"
          >
            <FastForward className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={toggleMute}
            className="
              w-8 h-8 sm:w-9 sm:h-9
              bg-gray-100
              rounded-full flex items-center justify-center
              shadow-neumorphic-inset hover:shadow-neumorphic
              transition-all duration-200
            "
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

      {/* Progress bar + timestamps */}
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
