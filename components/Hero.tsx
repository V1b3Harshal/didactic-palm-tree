// components/Hero.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import  PhoneMockup  from "./PhoneMockup";
import { ShaderBackground } from "./ShaderBackground";

export const Hero: React.FC = () => {
  const [useShader, setUseShader] = useState(false);
  const [shaderReady, setShaderReady] = useState(false);

  // feature-test for WebGL2 + ≥4 GB RAM
  useEffect(() => {
    const gl = document.createElement("canvas").getContext("webgl2");
    const deviceMem = (navigator as any).deviceMemory ?? 4;
    if (gl && deviceMem >= 4) {
      setUseShader(true);
    }
  }, []);

  return (
    <section
      className="
        relative
        pt-16 pb-8
        flex flex-col items-center
        overflow-hidden
        bg-gradient-to-br from-indigo-100 via-white to-pink-100
      "
    >
      {/* subtle bokeh overlays */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="hidden sm:block absolute -left-32 -top-24 w-[500px] h-[500px]
                        transform rotate-12 filter blur-2xl opacity-90 mix-blend-soft-light">
          <Image
            src="/circle bokeh colour gradiant1.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[600px] h-[600px] filter blur-3xl opacity-80 mix-blend-soft-light">
          <Image
            src="/circle bokeh colour gradiant3.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="hidden md:block absolute -right-24 -bottom-12 w-[550px] h-[550px]
                        transform -rotate-6 filter blur-2xl opacity-100 mix-blend-soft-light">
          <Image
            src="/circle bokeh colour gradiant2.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* gradient fallback + shader (fades in smoothly) */}
      <div className="absolute inset-0 transform scale-125 sm:scale-100">
        {/* always-visible fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 via-white to-pink-200" />

        {useShader && (
          <div
            className="absolute inset-0 will-change-[opacity] transition-opacity duration-[10000ms] ease-linear"
            style={{ opacity: shaderReady ? 1 : 0 }}
          >
            <ShaderBackground onReady={() => setShaderReady(true)} />
          </div>
        )}
      </div>

      {/* hero text */}
      <div className="relative z-10 text-center max-w-lg sm:max-w-3xl mx-auto px-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-snug">
          AI Voice Agents That<br className="hidden sm:inline" />
          Talk Like Humans
        </h1>
        <p className="text-gray-700 text-base sm:text-lg md:text-xl">
          Deploy lifelike conversational agents in minutes. No code required.
        </p>
      </div>

      {/* phone mockup */}
      <div
        className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md
                   h-[400px] sm:h-[450px] md:h-[500px] mt-6 px-4"
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
        }}
      >
        <div className="relative w-full h-full">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
};
