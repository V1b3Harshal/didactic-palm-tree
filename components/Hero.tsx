"use client";

import React from "react";
import Spline from "@splinetool/react-spline";
import PhoneMockup from "./PhoneMockup";

export const Hero: React.FC = () => {
  return (
    <section
      className="
        relative
        pt-20 flex flex-col items-center w-full
        overflow-hidden
        [contain:paint] /* isolate paint work */
      "
    >
      {/* ─── hero text ─── */}
      <div className="relative z-20 text-center px-4 pointer-events-none">
        <h1
          className="
            font-raleway
            text-4xl sm:text-6xl md:text-7xl lg:text-8xl
            text-gray-900 leading-tight
            max-w-4xl mx-auto
          "
        >
          <span className="sm:whitespace-nowrap">AI Voice Agents That</span>
          <br className="hidden sm:block" />
          <span className="sm:whitespace-nowrap">Talk Like Humans</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl md:text-2xl max-w-xl mx-auto font-jakarta text-gray-800">
          Deploy lifelike conversational agents in minutes. No code required.
        </p>
      </div>

      {/* ─── phone mockup ─── */}
      <div
        className="
          relative z-30
          w-full max-w-xs sm:max-w-sm md:max-w-md
          h-[400px] sm:h-[450px] md:h-[500px]
          mt-8
          px-0 sm:px-4         
          pointer-events-none
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
