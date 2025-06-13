// components/CallPanel.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";

interface Agent {
  name: string;
  avatar: string;
  subtitle: string;
}

const CallPanel: React.FC = () => {
  const agents: Agent[] = [
    {
      name: "Lisa",
      avatar: "/Flux_Schnell_A_cuttingedge_AI_voice_agent_for_the_call_center__0.jpg",
      subtitle: "Human-like conversational AI",
    },
    {
      name: "Rohan",
      avatar: "/Flux_Schnell_A_highly_detailed_photorealistic_portrait_of_a_mo_2.jpg",
      subtitle: "24/7 Support Specialist",
    },
    {
      name: "Mei",
      avatar: "/AlbedoBase_XL_A_cuttingedge_AI_voice_agent_for_the_call_center_3.jpg",
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
    <div className="flex flex-col gap-3 w-full">
      {agents.map((agent) => {
        const isActive = agent.name === active;
        const disabled = active !== null && !isActive;

        return (
          <div
            key={agent.name}
            className={`
              ${disabled ? "opacity-90 pointer-events-none" : ""}
              bg-gray-900 backdrop-blur-md rounded-2xl shadow-lg
              px-3 py-3 flex items-center justify-between
              transition
            `}
          >
            {/* Avatar + Text (fixed to 2 lines max) */}
            <div className="flex items-center space-x-3 flex-1 min-w-0 rounded-2xl">
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
                <p className="text-white font-medium text-sm opacity-90 truncate">
                  {agent.name}
                </p>
                <p className="text-white text-xs opacity-60 truncate">
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

            {/* Action buttons */}
            <div className="flex-shrink-0 flex items-center space-x-2">
              {isActive ? (
                <>
                  <button
                    onClick={hangUp}
                    className="
                      p-2 rounded-full bg-red-500
                      hover:scale-105 hover:brightness-110
                      transition
                    "
                    aria-label="Hang up"
                  >
                    <Phone className="w-5 h-5 text-white rotate-[135deg]" />
                  </button>
                  {(status === "busy" || status === "declined") && (
                    <button
                      onClick={() => startCall(agent.name)}
                      className="
                        px-3 py-1 text-xs bg-blue-500
                        hover:scale-105 hover:brightness-110
                        text-white rounded-full
                        transition
                      "
                    >
                      Retry
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => startCall(agent.name)}
                  disabled={disabled}
                  className="
                    p-2 rounded-full bg-green-500
                    disabled:opacity-50
                    hover:scale-105 hover:brightness-110
                    transition
                  "
                  aria-label={`Call ${agent.name}`}
                >
                  <Phone className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CallPanel;