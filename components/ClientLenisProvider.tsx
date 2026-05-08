// components/ClientLenisProvider.tsx
'use client'

import React, { ReactNode, useEffect } from 'react'
import ReactLenis, { useLenis } from 'lenis/react'

interface Props {
  children: ReactNode
}



export default function ClientLenisProvider({ children }: Props) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,        // Slower interpolation for a more "gliding" feel
        duration: 1.8,    // Longer duration for smoother transitions
        smoothWheel: true,
        wheelMultiplier: 1.5, // Increased for better sensitivity
        touchMultiplier: 2.5, // Increased for a more reactive feel on mobile
        syncTouch: true,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
