// components/CallPanel.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";

// ——— GlassEffect & GlassFilter ———
interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const GlassEffect: React.FC<GlassEffectProps> = ({
  children,
  className = "",
  style = {},
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl transition-all duration-700 ${className}`}
    style={{
      boxShadow: "0 6px 6px rgba(0,0,0,0.2), 0 0 20px rgba(0,0,0,0.1)",
      transitionTimingFunction: "cubic-bezier(0.175,0.885,0.32,2.2)",
      ...style,
    }}
  >
    {/* 1) backdrop blur */}
    <div
      className="absolute inset-0 rounded-2xl"
      style={{
        WebkitBackdropFilter: "blur(6px)",
        backdropFilter: "blur(6px)",
        isolation: "isolate",
      }}
    />
    {/* 2) SVG distortion */}
    <div
      className="absolute inset-0 rounded-2xl"
      style={{ filter: "url(#glass-distortion)" }}
    />
    {/* 3) frosted overlay */}
    <div
      className="absolute inset-0 rounded-2xl"
      style={{ background: "rgba(255,255,255,0.15)" }}
    />
    {/* 4) inset highlights */}
    <div
      className="absolute inset-0 rounded-2xl"
      style={{
        boxShadow:
          "inset 2px 2px 1px rgba(255,255,255,0.4), inset -1px -1px 1px rgba(255,255,255,0.4)",
      }}
    />
    <div className="relative z-10 w-full">{children}</div>
  </div>
);

const GlassFilter: React.FC = () => (
  <svg style={{ display: "none" }}>
    <filter
      id="glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.001 0.005"
        numOctaves="1"
        seed="17"
        result="turbulence"
      />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="5"
        specularConstant="1"
        specularExponent="100"
        lightingColor="white"
        result="specLight"
      >
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="litImage"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="200"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

interface Agent {
  name: string;
  avatar: string;
  subtitle: string;
}

const CallPanel: React.FC = () => {
  const agents: Agent[] = [
    {
      name: "Lisa",
      avatar:
        "/Flux_Schnell_A_cuttingedge_AI_voice_agent_for_the_call_center__0.jpg",
      subtitle: "Human-like conversational AI",
    },
    {
      name: "Rohan",
      avatar:
        "/Flux_Schnell_A_highly_detailed_photorealistic_portrait_of_a_mo_2.jpg",
      subtitle: "24/7 Support Specialist",
    },
    {
      name: "Mei",
      avatar:
        "/AlbedoBase_XL_A_cuttingedge_AI_voice_agent_for_the_call_center_3.jpg",
      subtitle: "Language & Culture Expert",
    },
  ];

  const [active, setActive] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "connecting" | "ringing" | "inCall" | "busy" | "declined"
  >("idle");
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    if (status === "connecting") {
      const t = window.setTimeout(() => setStatus("ringing"), 2000);
      return () => clearTimeout(t);
    }
    if (status === "ringing") {
      const t = window.setTimeout(() => {
        const r = Math.random();
        setStatus(r < 0.2 ? "busy" : r < 0.4 ? "declined" : "inCall");
      }, 3000);
      return () => clearTimeout(t);
    }
    if (status === "inCall") {
      timerRef.current = window.setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [active, status]);

  const startCall = useCallback((name: string) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActive(name);
    setStatus("connecting");
    setSeconds(0);
  }, []);

  const hangUp = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActive(null);
    setStatus("idle");
    setSeconds(0);
  }, []);

  const fmt = (s: number) => {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <>
      <GlassFilter />
      <div className="flex flex-col gap-4 w-full">
        {agents.map((agent) => {
          const isActive = agent.name === active;
          const disabled = active !== null && !isActive;
          return (
            <GlassEffect
              key={agent.name}
              className={`px-4 py-3 ${
                disabled ? "opacity-50 pointer-events-none" : ""
              } hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={agent.avatar}
                      alt={agent.name}
                      width={40}
                      height={40}
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">
                      {agent.name}
                    </p>
                    <p className="text-white text-xs opacity-70 truncate">
                      {isActive
                        ? status === "connecting"
                          ? "Connecting..."
                          : status === "ringing"
                          ? "Ringing..."
                          : status === "inCall"
                          ? fmt(seconds)
                          : status === "busy"
                          ? "Agent busy"
                          : "Call declined"
                        : agent.subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isActive ? (
                    <>
                      <button
                        onClick={hangUp}
                        className="p-2 rounded-full bg-red-500 hover:scale-105 hover:brightness-110 transition"
                        aria-label="Hang up"
                      >
                        <Phone className="w-5 h-5 text-white rotate-[135deg]" />
                      </button>
                      {(status === "busy" || status === "declined") && (
                        <button
                          onClick={() => startCall(agent.name)}
                          className="px-3 py-1 text-xs bg-blue-500 text-white rounded-full hover:scale-105 hover:brightness-110 transition"
                        >
                          Retry
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => startCall(agent.name)}
                      disabled={disabled}
                      className="p-2 rounded-full bg-green-500 disabled:opacity-50 hover:scale-105 hover:brightness-110 transition"
                      aria-label={`Call ${agent.name}`}
                    >
                      <Phone className="w-5 h-5 text-white" />
                    </button>
                  )}
                </div>
              </div>
            </GlassEffect>
          );
        })}
      </div>
    </>
  );
};

export default CallPanel;
