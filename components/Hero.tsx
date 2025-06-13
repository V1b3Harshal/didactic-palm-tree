// components/Hero.tsx
"use client";

import React from "react";
import Image from "next/image";
import PhoneMockup from "./PhoneMockup";

export const Hero: React.FC = () => {
  return (
    <section
      className="
        relative
        pt-16 pb-12
        flex flex-col items-center
        overflow-hidden
        /* stronger, more visible gradient */
        bg-gradient-to-br from-indigo-300 via-indigo-200 to-pink-300
      "
    >
      {/* subtle bokeh overlays, now lighter and above the gradient */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div
          className="
            hidden sm:block absolute -left-32 -top-24
            w-[1000px] h-[1000px] transform rotate-12
            filter blur-2xl opacity-70 mix-blend-soft-light
          "
        >
          <Image
            src="/Gradient - 09.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div
          className="
            hidden sm:block absolute left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            w-[600px] h-[600px]
            opacity-60 mix-blend-soft-light
          "
        >
          <Image
            src="/circle bokeh colour gradiant3.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div
          className="
            hidden md:block absolute -right-24 -bottom-12
            w-[550px] h-[550px] transform -rotate-6
            filter blur-2xl opacity-80 mix-blend-soft-light
          "
        >
          <Image
            src="/circle bokeh colour gradiant2.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* hero text */}
      <div className="relative z-20 text-center px-4">
        <h1
          className="
            text-4xl sm:text-6xl md:text-7xl lg:text-8xl
            font-normal text-gray-900 leading-tight
            max-w-4xl mx-auto
          "
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

      {/* phone mockup */}
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
