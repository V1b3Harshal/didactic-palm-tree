"use client";

import React from "react";
import localFont from "next/font/local";
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
        pt-20 flex flex-col items-center w-full
        overflow-hidden  bg-gradient-to-br from-white via-indigo-50 to-pink-50
        [contain:paint]
      "
    >
      {/* ─── Hero Text (centered on all screens) ─── */}
      <div className="
          relative z-20
          w-full max-w-5xl       /* constrain width */
          mx-auto                /* center container */
          px-4 sm:px-6 lg:px-0   /* remove large-screen padding */
          text-center
          pointer-events-none
        ">
        <h1 className={`
            ${inertia.className}
            
            text-5xl     /* base */
            sm:text-7xl  /* ≥640px */
            md:text-8xl  /* ≥768px */
            lg:text-8xl  /* ≥1024px */
            leading-tight
            tracking-tight
            text-gray-800
          `}
        >
          <span className="block sm:inline">AI Voice Agents That Talk </span>
          <br className="hidden sm:block" />
          <span className="block sm:inline">Like Humans</span>
        </h1>
        <p className="
            mt-6
            text-lg      /* base */
            sm:text-xl   /* ≥640px */
            md:text-2xl  /* ≥768px */
            lg:text-3xl  /* ≥1024px */
            font-jakarta
            text-gray-800
          "
        >
          Deploy lifelike conversational agents in minutes. No code required.
        </p>
      </div>

      {/* ─── Phone Mockup (unchanged) ─── */}
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
