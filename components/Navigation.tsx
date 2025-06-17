"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "About",    href: "#about"    },
    { name: "Demo",     href: "#demo"     },
    { name: "Features", href: "#features" },
    { name: "Contact",  href: "#contact"  },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* ─────── NAVBAR WRAPPER ─────── */}
      <div className="relative">
        {/* Glass BG always on */}
        <div className="absolute inset-0 bg-white/50 backdrop-blur-lg" />

        {/* CONTENT LAYER */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center">
              <img src="/logo.svg" alt="Convis AI Logo"  className="w-32 h-auto" />
            </div>
           
          </div>

          {/* Desktop Links + Button */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-medium text-gray-800 hover:text-gray-900 transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
            <button className="bg-black text-white rounded-md px-4 py-2 font-medium transition-shadow duration-200 hover:shadow-lg">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-md bg-white/50 hover:bg-white/60 transition-colors duration-200"
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

      {/* ─────── MOBILE DROPDOWN ─────── */}
      {isMenuOpen && (
        <div className="relative">
          {/* Glassy backdrop for dropdown */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-lg border-b border-white/30 shadow-lg" />

          {/* Dropdown Links */}
          <div className="relative z-10 px-6 py-4 flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block font-medium text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-100/50"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 w-full bg-black text-white rounded-md px-4 py-2 font-medium transition-shadow duration-200 hover:shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
