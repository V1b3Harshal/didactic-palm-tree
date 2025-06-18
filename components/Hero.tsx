"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import PhoneMockup from "./PhoneMockup";
import { BigText } from "./BigText";

export const Hero: React.FC = () => {
  return (
    <section
      className="
        relative
        pt-20 pb-12 flex flex-col items-center w-full
        overflow-hidden
        [contain:paint] /* isolate paint work */
      "
    >
      {/* ─── hero text ─── */}
      <div className="relative z-30 text-center px-4">
        <h1
          className="
            text-4xl sm:text-6xl md:text-7xl lg:text-8xl
            font-normal text-gray-900 leading-tight
            max-w-4xl mx-auto
            [font-family:var(--font-heading),sans-serif]
          "
          style={{ fontVariationSettings: `"wght" 700` }}
        >
          <span className="sm:whitespace-nowrap">AI Voice Agents That</span>
          <br className="hidden sm:block" />
          <span className="sm:whitespace-nowrap">Talk Like Humans</span>
        </h1>
        <p
          className="
            mt-6 text-lg sm:text-xl md:text-2xl
            max-w-xl mx-auto text-gray-800
          "
        >
          Deploy lifelike conversational agents in minutes. No code required.
        </p>
      </div>

      {/* ─── full-width Lottie bg behind the phone ─── */}
      <div
        className="
          absolute inset-0
          w-full h-full
          pointer-events-none
          z-10
          overflow-hidden
        "
      >
        <DotLottieReact
          src="https://lottie.host/00a9c42d-c03e-481b-ab67-da824e084dc7/6umIz3PW3E.lottie"
          loop
          autoplay
          speed={1}
          className="w-full h-full object-cover"
        />
      </div>

      {/* ─── BigText background ─── */}
     

      {/* ─── phone mockup ─── */}
      <div
        className="
          relative z-20
          w-full max-w-xs sm:max-w-sm md:max-w-md
          h-[400px] sm:h-[450px] md:h-[500px]
          mt-8 px-4
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
