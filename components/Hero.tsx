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
          1) Full-screen absolute wrapper for backgrounds (image + shader)
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* ───────────────
            a) Background image at the very back (z-0)
            ─────────────── */}
        <div
          className="
            absolute inset-0 
            bg-cover bg-center 
            z-0
          "
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />

        {/* ─────────────────────────────────────────────────────────────
            b) Shader on top of the image (z-10)
            ─────────────────────────────────────────────────────────────
            We’re also re-using the same translate/scale hack from before,
            so on mobile it’s pushed down & enlarged; resets at md:
        */}
        <div
          className="
            absolute inset-0 
            transform 
            translate-y-12 scale-150 
            md:translate-y-0 md:scale-100 
            z-10
          "
        >
         
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2) Main content (BigText + PhoneMockup etc.) sits above both
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-5xl space-y-8 pt-24 pb-0 mx-auto">
        <h1
          className="
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
            font-bold text-gray-900 text-center
          "
        >
          AI Voice Agents That Talk Like Humans
        </h1>

        {/* Phone mockup + form section */}
        <PhoneMockup />
      </div>
    </section>
  );
};
