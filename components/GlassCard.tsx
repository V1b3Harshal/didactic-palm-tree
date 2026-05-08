// components/GlassCard.tsx
import React, { CSSProperties } from 'react'

interface GlassCardProps {
style?: CSSProperties
  className?: string
  children: React.ReactNode
}

const GlassCard: React.FC<GlassCardProps> = ({
  style,
  className = '',
  children,
}) => (
  <div
    style={style}
    className={`
      w-full max-w-sm
      bg-gray-900 bg-opacity-50
      backdrop-blur-lg backdrop-saturate-150
      border border-white border-opacity-25
      rounded-3xl
      shadow-lg
      p-6 sm:p-8
      text-white
      ${className}
    `}
  >
    {children}
  </div>
)

export default GlassCard
