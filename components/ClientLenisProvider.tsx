// components/ClientLenisProvider.tsx
'use client'

import React, { ReactNode, useEffect } from 'react'
import ReactLenis, { useLenis } from 'lenis/react'

interface Props {
  children: ReactNode
}

/**
 * Runs Lenis’s RAF loop outside React, but only once `lenis` is defined.
 */
function LenisRafManager() {
  const lenis = useLenis()

  useEffect(() => {
    // if lenis is not ready yet, do nothing
    if (!lenis) return

    let frameId: number
    const loop = (time: number) => {
      lenis.raf(time)
      frameId = requestAnimationFrame(loop)
    }

    frameId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameId)
  }, [lenis])

  return null
}

export default function ClientLenisProvider({ children }: Props) {
  return (
    <ReactLenis
      root
      autoRaf={false}      // ← disable built-in RAF
      options={{
        duration: 1.2,
        easing: (t: number) =>
          Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 2,
      }}
    >
      <LenisRafManager />
      {children}
    </ReactLenis>
  )
}
