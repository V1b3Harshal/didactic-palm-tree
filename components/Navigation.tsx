"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Demo", href: "#demo" },
    { name: "Features", href: "#features" },
    { name: "Contact", href: "#contact" },
  ]

  // Track scroll position to toggle opacity/shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* ────────────────────────────────────────────── */}
      {/* NAVBAR WRAPPER */}
      {/* We use a relative container so we can layer an absolute “glass” BG behind the content */}
      <div className="relative">
        {/*
          BACKDROP LAYER:
          - absolute inset-0 stretches it full-width + full-height of nav
          - get semi-transparent white + backdrop-blur
          - on scroll, bump opacity & add border/shadow
        */}
        <div
          className={`
            absolute inset-0
            transition-all duration-300
            ${scrolled
              ? "bg-white/10 backdrop-blur-xl shadow-md"
              : "bg-transparent"
            }
          `}
        />

        {/*
          CONTENT LAYER:
          - relative + z-10 ensures links/icons sit above the blurred BG
          - padding controls height
        */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md flex items-center justify-center">
              <img
                src="/logo.png"
                alt=" Convis AI Logo"
                className="w-8 h-8"
              />
            </div>
            <span className="text-xl font-bold text-gray-900">
               Convis AI
            </span>
          </div>

          {/* Desktop Links + Button */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="
                  font-medium
                  text-gray-800 hover:text-gray-900
                  transition-colors duration-200
                "
              >
                {item.name}
              </a>
            ))}

            <button
              className="
                bg-black text-white
                rounded-md px-4 py-2 font-medium
                transition-shadow duration-200 hover:shadow-lg
              "
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`
              md:hidden p-2 rounded-md transition-colors duration-200
              ${scrolled 
                ? "bg-white/50 hover:bg-white/60" 
                : "bg-white/30 hover:bg-white/40"
              }
            `}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-800" />
            ) : (
              <Menu className="w-6 h-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* ────────────────────────────────────────────── */}
      {/* MOBILE DROPDOWN */}
      {isMenuOpen && (
        <div className="relative">
          {/*
            “Backdrop” for the dropdown panel itself:
            - same pattern: absolute inset-0 + bg white + blur
            - if scrolled, heavier opacity; otherwise lighter
          */}
          <div
            className={`
              absolute inset-0
              ${scrolled 
                ? "bg-white/60 backdrop-blur-lg border-b border-white/30"
                : "bg-white/30 backdrop-blur-lg border-b border-white/20"
              }
              shadow-lg
            `}
          />

          {/*
            Content for mobile links sits above (z-10)
          */}
          <div className="relative z-10 px-6 py-4 flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="
                  block font-medium text-gray-800 hover:text-gray-900
                  px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-100/50
                "
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="
                mt-2 w-full bg-black text-white
                rounded-md px-4 py-2 font-medium
                transition-shadow duration-200 hover:shadow-lg
              "
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
