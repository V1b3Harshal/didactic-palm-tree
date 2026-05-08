// lib/hooks/useLenisScroll.ts
'use client'

import { RefObject, useEffect } from 'react'
import { useMotionValue } from 'motion/react'
import { useLenis } from 'lenis/react'

/**
 * Tracks Lenis scroll on a section and exposes:
 *   - scrollY: raw scroll offset
 *   - scrollProgress: 0 → 1 as the element comes in/out of view
 */
export function useLenisScroll<T extends HTMLElement = HTMLElement>(
  target: RefObject<T | null>
) {
  const lenis = useLenis()
  const scrollY = useMotionValue(0)
  const scrollProgress = useMotionValue(0)

  useEffect(() => {
    if (!lenis || !target.current) return

    const el = target.current
    const onScroll = ({ scroll }: { scroll: number }) => {
      scrollY.set(scroll)

      // calculate 0→1 over this element’s viewport entry/exit
      const { top, height } = el.getBoundingClientRect()
      const windowH = window.innerHeight
      const total = windowH + height
      const prog = (windowH - top) / total
      scrollProgress.set(Math.min(Math.max(prog, 0), 1))
    }

    lenis.on('scroll', onScroll)
    return () => void lenis.off('scroll', onScroll)
  }, [lenis, target, scrollY, scrollProgress])

  return { scrollY, scrollProgress }
}
