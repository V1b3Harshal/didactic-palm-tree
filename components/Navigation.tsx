"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Demo", href: "#demo" },
    { name: "Features", href: "#features" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      {/* Main Nav Container */}
      <div className="neumorphic-inset bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-full shadow-lg px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <img src="/placeholder.svg?height=32&width=32" alt="Sampark AI Logo" className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-gray-900">Sampark AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Get Started Button */}
          <div className="hidden md:block">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full px-6 py-2 font-medium transition-all duration-200 shadow-md hover:shadow-lg">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu - Separate container */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 neumorphic-inset bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-lg px-6 py-4 w-full">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium py-1 px-3 rounded-lg hover:bg-gray-100/50"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full px-6 py-2 font-medium transition-all duration-200 shadow-md hover:shadow-lg mt-2 w-full">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}