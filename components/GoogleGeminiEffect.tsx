"use client";
import { cn } from "@/lib/utils";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import React, { useEffect, useState } from "react";

const transition = {
  duration: 3,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "reverse" as const,
};

export const GoogleGeminiEffect = ({
  title,
  description,
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) => {
  const controls = useAnimation();
  const [hue, setHue] = useState(0);

  // Animate hue over time for RGB cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setHue((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Animate pulsing circles
  useEffect(() => {
    const animatePulse = async () => {
      while (true) {
        await controls.start({
          scale: [1, 1.5, 1],
          opacity: [0.8, 0, 0],
          transition: {
            duration: 3,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "loop",
          },
        });
      }
    };
    animatePulse();
  }, [controls]);

  return (
    <div className={cn("sticky top-80", className)}>
      {/* Background container */}
      <div className="w-full h-[890px] absolute -top-60 md:-top-40 flex items-center justify-center bg-transparent">
        {/* Center circle with RGB glow */}
        <svg width="1440" height="890" viewBox="0 0 1440 890" xmlns="http://www.w3.org/2000/svg" className="absolute w-full pointer-events-none">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Animated RGB Circles */}
          {[...Array(3)].map((_, i) => (
            <motion.circle
              key={i}
              cx="720"
              cy="445"
              r="0"
              fill="none"
              stroke={`hsl(${(hue + i * 120) % 360}, 100%, 50%)`}
              strokeWidth="2"
              initial={{ r: 0, opacity: 0.8 }}
              animate={{
                r: ["0%", "70%"],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 4,
                delay: i * 1.2,
                repeat: Infinity,
                ease: "easeOut",
              }}
              filter="url(#glow)"
            />
          ))}

          {/* Optional: Keep original paths but simplify them */}
          <motion.path
            d="M0 663C145.5 663 191 666.265 269 647C326.5 630 339.5 621 397.5 566C439 531.5 455 529.5 490 523C509.664 519.348 521 503.736 538 504.236C553.591 504.236 562.429 514.739 584.66 522.749C592.042 525.408 600.2 526.237 607.356 523.019C624.755 515.195 641.446 496.324 657 496.735C673.408 496.735 693.545 519.572 712.903 526.769C718.727 528.934 725.184 528.395 730.902 525.965C751.726 517.115 764.085 497.106 782 496.735C794.831 496.47 804.103 508.859 822.469 518.515C835.13 525.171 850.214 526.815 862.827 520.069C875.952 513.049 889.748 502.706 903.5 503.736C922.677 505.171 935.293 510.562 945.817 515.673C954.234 519.76 963.095 522.792 972.199 524.954C996.012 530.611 1007.42 534.118 1034 549C1077.5 573.359 1082.5 594.5 1140 629C1206 670 1328.5 662.5 1440 662.5"
            stroke={`hsl(${hue}, 100%, 50%)`}
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0.3 }}
            animate={controls}
            transition={{ ...transition, delay: 0.2 }}
          />

          {/* Additional simplified paths */}
          <motion.path
            d="M0 587.5C147 587.5 277 587.5 310 573.5C348 563 392.5 543.5 408 535C434 523.5 426 526.235 479 515.235C494 512.729 523 510.435 534.5 512.735C554.5 516.735 555.5 523.235 576 523.735C592 523.735 616 496.735 633 497.235C648.671 497.235 661.31 515.052 684.774 524.942C692.004 527.989 700.2 528.738 707.349 525.505C724.886 517.575 741.932 498.33 757.5 498.742C773.864 498.742 791.711 520.623 810.403 527.654C816.218 529.841 822.661 529.246 828.451 526.991C849.246 518.893 861.599 502.112 879.5 501.742C886.47 501.597 896.865 506.047 907.429 510.911C930.879 521.707 957.139 519.639 982.951 520.063C1020.91 520.686 1037.5 530.797 1056.5 537C1102.24 556.627 1116.5 570.704 1180.5 579.235C1257.5 589.5 1279 587 1440 588"
            stroke={`hsl(${(hue + 120) % 360}, 100%, 50%)`}
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0.3 }}
            animate={controls}
            transition={{ ...transition, delay: 0.4 }}
          />

          <motion.path
            d="M0 514C147.5 514.333 294.5 513.735 380.5 513.735C405.976 514.94 422.849 515.228 436.37 515.123C477.503 514.803 518.631 506.605 559.508 511.197C564.04 511.706 569.162 512.524 575 513.735C588 516.433 616 521.702 627.5 519.402C647.5 515.402 659 499.235 680.5 499.235C700.5 499.235 725 529.235 742 528.735C757.654 528.735 768.77 510.583 791.793 500.59C798.991 497.465 807.16 496.777 814.423 499.745C832.335 507.064 850.418 524.648 866 524.235C882.791 524.235 902.316 509.786 921.814 505.392C926.856 504.255 932.097 504.674 937.176 505.631C966.993 511.248 970.679 514.346 989.5 514.735C1006.3 515.083 1036.5 513.235 1055.5 513.235C1114.5 513.235 1090.5 513.235 1124 513.235C1177.5 513.235 1178.99 514.402 1241 514.402C1317.5 514.402 1274.5 512.568 1440 513.235"
            stroke={`hsl(${(hue + 240) % 360}, 100%, 50%)`}
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0.3 }}
            animate={controls}
            transition={{ ...transition, delay: 0.6 }}
          />
        </svg>
      </div>
    </div>
  );
};