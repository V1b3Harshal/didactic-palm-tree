"use client";

import React from "react";
import localFont from "next/font/local";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import PhoneMockup from "./PhoneMockup";

// Load your local Inertia font
const inertia = localFont({
  src: "../assets/fonts/Inertia.otf",
  display: "swap",
});

export const Hero: React.FC = () => {
  return (
    <section
      className="
        relative
        pt-20 flex flex-col items-center w-full   bg-gradient-to-br from-white via-indigo-50 to-pink-50
        [contain:paint]   
     
      "
    >
      {/* ─── Hero Text (centered) and PhoneMockup … ─── */}
      <div
        className="
          relative z-20
          w-full max-w-5xl
          mx-auto px-4 sm:px-6 lg:px-0
          text-center pointer-events-none
        "
      >
       <h1
  className="
    text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem]
    font-raleway tracking-wide leading-tight text-gray-700
    uppercase
  "
>
  <span className="block sm:inline">AI Voice Agents That</span>
  <br className="hidden sm:block" />
  <span className="block sm:inline">Talk like </span>
  <span
    className="
      block sm:inline
      font-raleway
      bg-gradient-to-r from-purple-600 via-indigo-500 to-orange-400
      bg-clip-text text-transparent
    "
  >
     Humans
  </span>
</h1>

        {/* Now using inline <span> wrapper, no more <div> inside <p> */}
        <p className="mt-6 text-lg sm:text-xl md:text-2xl lg:text-3xl font-jakarta text-gray-800">
          Deploy lifelike{" "}
          <PointerHighlight> 
            <span> conversational agents </span>
           </PointerHighlight>{" "}
          in minutes. No code required.
        </p>
      </div>

      <div
        className="
          relative z-30
          w-full max-w-xs sm:max-w-sm md:max-w-md
          h-[400px] sm:h-[450px] md:h-[500px]
          mt-8 px-0 sm:px-4 pointer-events-none
        "
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
        }}
      >
        <PhoneMockup />
      </div>
    </section>
  );
};
