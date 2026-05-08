'use client'

import React, { useState, useEffect, CSSProperties } from 'react'
import { SignalHigh, Wifi, Battery, PhoneCall, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import GlassCard from './GlassCard'

interface PhoneMockupProps {
  onClose?: () => void
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ onClose }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [countryCode, setCountryCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [timeString, setTimeString] = useState('')

  // 3D styles
  const phoneStyle: CSSProperties = {
    willChange: 'transform',
    transform: isHovered ? 'rotateX(5deg)' : 'none',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.7s',
  }
  const contentStyle: CSSProperties = {
    willChange: 'transform',
    transform: isHovered ? 'translateZ(20px) rotateX(-5deg)' : 'none',
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'hidden',
    transition: 'transform 0.3s',
  }

  useEffect(() => {
    const now = new Date()
    setTimeString(
      now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    )
  }, [])

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^\d+]/g, '')
    if (!val.startsWith('+')) val = '+' + val
    setCountryCode(val)
  }

  const validate = () => {
    if (!/^\+[1-9]\d{0,2}$/.test(countryCode.trim())) {
      setError('Please enter a valid country code (e.g. +1).')
      return false
    }
    if (!/^\d{7,15}$/.test(phoneNumber.trim())) {
      setError('Please enter a valid phone number (7–15 digits).')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!(e.target as HTMLFormElement).checkValidity() || !validate()) {
      ;(e.target as HTMLFormElement).reportValidity()
      return
    }

    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          countryCode: countryCode.trim(),
          phoneNumber: phoneNumber.trim(),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Call failed')
      } else {
        setConfirmed(true)
        // Auto-reset after 2s
        setTimeout(() => {
          setConfirmed(false)
          setCountryCode('')
          setPhoneNumber('')
        }, 2000)
      }
    } catch (err: any) {
      setError(err.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ perspective: '1000px', clipPath: 'inset(0 0 36% 0)' }}
        className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-[433/882]"
      >
        <div style={phoneStyle} className="absolute inset-0 font-sans">
          {/* Backing */}
          <div
            className="absolute inset-[10px] rounded-[12%] bg-black pointer-events-none"
            style={{ transform: 'translateZ(-1px)' }}
          />

          {/* Wallpaper */}
          <div className="absolute inset-[10px] overflow-hidden rounded-[12%] pointer-events-none">
            <Image
              src="/iphone-wallpaper.jpg"
              alt="iPhone Wallpaper"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Status Bar */}
          <div className="absolute top-[5%] inset-x-10 sm:inset-x-12 lg:inset-x-10 flex justify-between items-center z-10">
            <span className="text-xs sm:text-base font-medium text-white">
              {timeString}
            </span>
            <div className="flex items-center space-x-1 sm:space-x-2 text-white">
              <SignalHigh className="w-4 h-4 sm:w-5 sm:h-5" />
              <Wifi className="w-4 h-4 sm:w-5 sm:h-5" />
              <Battery className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>

          {/* Glass Card */}
          <div
            style={{ ...contentStyle, pointerEvents: 'auto' }}
            className="absolute inset-0 flex flex-col items-center justify-start pt-28 sm:pt-32 md:pt-32 px-4 sm:px-6 md:px-8 z-20"
          >
            <GlassCard className="w-full max-w-sm sm:max-w-md md:max-w-lg p-4 sm:p-6 md:p-8">
              {!confirmed ? (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-raleway text-white text-center">
                    Try a Demo Call
                  </h2>
                  <p className="font-raleway text-xs sm:text-sm md:text-base text-white text-center opacity-75">
                    Enter your number below and hear our AI voice agent ring.
                  </p>

                  <div className="w-full mb-3 sm:mb-4">
                    <div className="flex items-center w-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-blue-400 transition">
                      <input
                        type="tel"
                        name="countryCode"
                        placeholder="+1"
                        value={countryCode}
                        onChange={handleCountryCodeChange}
                        required
                        pattern="^\+[1-9]\d{0,2}$"
                        title="1–3 digits, starting with +"
                        className="w-16 text-gray-900 text-center bg-transparent py-2 px-3 placeholder-gray-400 focus:outline-none"
                      />
                      <div className="w-px h-6 bg-gray-200" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="5551234567"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        required
                        pattern="^\d{7,15}$"
                        title="7–15 digits"
                        className="flex-1 text-gray-900 bg-transparent py-2 px-3 placeholder-gray-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-sm sm:text-base text-red-400">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`
                      w-full flex items-center justify-center space-x-2
                      py-2 sm:py-3 rounded-2xl font-medium text-sm sm:text-base
                      text-white bg-white bg-opacity-20 backdrop-blur
                      hover:bg-opacity-30 transition
                      ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                    ) : (
                      <PhoneCall className="w-5 h-5" />
                    )}
                    <span>{loading ? 'Calling…' : 'Call Now'}</span>
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center gap-4 p-6 bg-white bg-opacity-10 backdrop-blur rounded-2xl">
                  <CheckCircle className="w-12 h-12 text-green-400 animate-pulse" />
                  <h3 className="text-2xl font-bold text-white">
                    You’re all set!
                  </h3>
                  <p className="text-base text-white opacity-75 text-center">
                    You’ll receive a call from our AI voice agent shortly.
                  </p>
                </div>
              )}
            </GlassCard>
          </div>

          {/* iPhone Frame */}
          <div className="absolute inset-0 z-30 pointer-events-none">
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

      {/* global overrides */}
      <style jsx global>{`
        input::placeholder {
          color: rgba(156, 163, 175, 1); /* Tailwind’s gray-400 */
        }
        input:invalid {
          box-shadow: inset 0 0 0 1px rgba(248, 113, 113, 0.8);
        }
      `}</style>
    </>
  )
}

export default React.memo(PhoneMockup)
