// components/ui/progressive-blur.tsx
'use client';

import { cn } from '@/lib/utils';
import { HTMLMotionProps, motion } from 'motion/react';

export const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
};

export type ProgressiveBlurProps = {
  /** now supports 'all' to blur the whole element */
  direction?: keyof typeof GRADIENT_ANGLES | 'all';
  blurLayers?: number;
  blurIntensity?: number;
  className?: string;          // wrapper positioning/size
} & HTMLMotionProps<'div'>;

export function ProgressiveBlur({
  direction = 'bottom',
  blurLayers = 8,
  blurIntensity = 0.25,
  className,
  ...props
}: ProgressiveBlurProps) {
  const layers = Math.max(blurLayers, 2);
  const segmentSize = 1 / (layers + 1);
  const full = direction === 'all';

  return (
    <div className={cn(className)}>
      {Array.from({ length: layers }).map((_, i) => {
        let style: React.CSSProperties;

        if (full) {
          // Full‐card blur: no mask needed
          style = {
            backdropFilter: `blur(${(i + 1) * blurIntensity}px)`,
            WebkitBackdropFilter: `blur(${(i + 1) * blurIntensity}px)`,
          };
        } else {
          // Directional mask + blur (unchanged)
          const angle = GRADIENT_ANGLES[direction];
          const stops = [
            i * segmentSize,
            (i + 1) * segmentSize,
            (i + 2) * segmentSize,
            (i + 3) * segmentSize,
          ].map((p, idx) => 
            `rgba(255,255,255,${idx === 1 || idx === 2 ? 1 : 0}) ${p * 100}%`
          );
          const gradient = `linear-gradient(${angle}deg, ${stops.join(',')})`;

          style = {
            maskImage: gradient,
            WebkitMaskImage: gradient,
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskSize: '100% 100%',
            WebkitMaskSize: '100% 100%',
            maskMode: 'alpha',
            backdropFilter: `blur(${(i + 1) * blurIntensity}px)`,
            WebkitBackdropFilter: `blur(${(i + 1) * blurIntensity}px)`,
          };
        }

        return (
          <motion.div
            key={i}
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={style}
            initial={false}     // turn off any motion flicker
            {...props}
          />
        );
      })}
    </div>
  );
}
