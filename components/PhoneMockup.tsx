// components/PhoneMockup.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { SignalHigh, Wifi, Battery, X } from 'lucide-react'
import Image from 'next/image'
import CallPanel from './call'

const PhoneMockup: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)

  // 3D transforms for the phone body
  const phoneStyle: React.CSSProperties = {
    willChange: 'transform',               // ← hint browser to optimize
    transform: isHovered ? 'rotateX(20deg)' : 'none',
    transformStyle: 'preserve-3d',
    WebkitTransformStyle: 'preserve-3d',
    transition: 'transform 0.7s',
  }

  // 3D transforms for the inner content ("cards")
  const contentStyle: React.CSSProperties = {
    willChange: 'transform',               // ← hint browser to optimize
    transform: isHovered
      ? 'translateZ(70px) rotateX(-20deg)'
      : 'none',
    transformStyle: 'preserve-3d',
    WebkitTransformStyle: 'preserve-3d',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    transition: 'transform 0.7s',
  }

  // Compute date & time once on mount
  const [dateString, setDateString] = useState('')
  const [timeString, setTimeString] = useState('')
  useEffect(() => {
    const now = new Date()
    setDateString(
      now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
    )
    setTimeString(
      now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      })
    )
  }, [])

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '1000px' }}
      className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-[433/882]"
    >
      <div style={phoneStyle} className="absolute inset-0 font-sans">
        {/* DARK BACKING */}
        <div
          className="absolute inset-[10px] rounded-[12%] pointer-events-none"
          style={{
            backgroundColor: 'black',
            transform: 'translateZ(-1px)',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
          }}
        />

        {/* WALLPAPER */}
        <div
          className="absolute inset-[10px] overflow-hidden rounded-[12%] pointer-events-none"
          style={{
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
          }}
        >
          <Image
            src="/iphone-wallpaper.jpg"
            alt="iPhone Wallpaper"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* STATUS BAR */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
          }}
          className="
            absolute
            top-[5%]
            inset-x-8 sm:inset-x-6 md:inset-x-10
            flex justify-between items-center
            z-10
          "
        >
          <span className="text-xs sm:text-base font-medium text-white leading-none">
            {timeString}
          </span>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <SignalHigh className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <Wifi       className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <Battery    className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
        </div>

        {/* BIG DATE & TIME */}
        <div
          style={{
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
          }}
          className="absolute top-[16%] sm:top-[18%] lg:top-[12%] w-full flex flex-col items-center"
        >
          <span className="text-white text-lg sm:text-xl leading-tight">
            {dateString}
          </span>
          <span className="text-white text-3xl sm:text-5xl leading-tight -mt-0.5 sm:-mt-1">
            {timeString}
          </span>
        </div>

        {/* “Notifications” HEADER */}
        <div
          style={{
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
          }}
          className="
            absolute
            top-[30%] sm:top-[27%]
            w-full flex items-center justify-between
            px-6 sm:px-6 md:px-10
          "
        >
          <span className="text-white text-base sm:text-lg font-medium">
            Notifications
          </span>
          <button
            className="
              w-6 h-6 sm:w-7 sm:h-7
              flex items-center justify-center
              bg-white/20 rounded-full
              transition hover:bg-white/30
            "
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </button>
        </div>

        {/* Notification Cards */}
        <div
          style={{
            ...contentStyle,
            pointerEvents: 'none',
          }}
          className="
            absolute inset-0
            flex flex-col items-center
            pt-[200px] sm:pt-[260px]
            px-[20px] sm:px-[15px] lg:px-[25px]
            z-[999]
            rounded-2xl
          "
        >
          <div
            className="
              w-full
              pointer-events-auto
              origin-top
              text-sm sm:text-base
              space-y-2 
            "
            style={{ zIndex: 1 }}
          >
            <CallPanel />
          </div>
        </div>

        {/* IPHONE FRAME */}
        <div
          className="absolute inset-0 z-30 pointer-events-none"
          style={{
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
          }}
        >
          <Image
            src="/iphone-mockup.svg"
            alt="iPhone Mockup"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
}

// Wrap in React.memo to skip needless re-renders
export default React.memo(PhoneMockup)
