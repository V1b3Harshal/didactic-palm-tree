"use client";

import dynamic from "next/dynamic";
import type React from "react";
import { BigText } from "./BigText";
import { PhoneMockup } from "./PhoneMockup";

// Dynamically import ShaderBackground (no SSR)
const ShaderBackground = dynamic(() => import("./ShaderBackground"), {
  ssr: false,
});

export const Hero: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 bg-white overflow-hidden">
      {/* ─────────────────────────────────────────────────────────────
          Full‐screen absolute wrapper (covers entire section)
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* 
          1) Put the shader in its own absolute div with z-0 
             And apply transform utilities:
             - translate-y-12 on mobile (push it down ~3rem)
             - scale-150 on mobile (1.5× size)
             - reset translate and scale at md breakpoint
        */}
        <div
          className="
            absolute inset-0 z-0 
            transform 
            translate-y-24 scale-150 
            md:translate-y-0 md:scale-100
          "
        >
          <ShaderBackground />
        </div>

        {/* 2) Layer the BigText on top with a higher z-index */}
        <div className="relative z-10">
        
        </div>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-5xl space-y-8 pt-24 pb-0 mx-auto">
        <h1
          className="
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
            font-bold text-gray-900 text-center
          "
        >
          AI Voice Agents That Talk Like Humans
        </h1>

        {/* 2) Phone mockup + form section (now extracted) */}
        <PhoneMockup />
      </div>
    </section>
  );
};
