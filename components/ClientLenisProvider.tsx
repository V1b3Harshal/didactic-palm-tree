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
        lerp: 0.08,
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 1.1,
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
