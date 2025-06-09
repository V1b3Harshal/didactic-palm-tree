// components/call.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";

interface Agent {
  name: string;
  bgColor: string;      // you can drop this now if you don't need the colored border
  avatar: string;       // path relative to /public
}

const CallPanel: React.FC = () => {
  const agents: Agent[] = [
    { name: "Aisha", bgColor: "bg-blue-500",   avatar: "/toolxox.com-qLW6i.jpg" },
    { name: "Rohan", bgColor: "bg-green-500",  avatar: "/toolxox.com-TQMeR.jpg" },
    { name: "Mei",   bgColor: "bg-purple-500", avatar: "/toolxox.com-TXNK8.jpg" },
  ];

  const [currentCallAgent, setCurrentCallAgent] = useState<string | null>(null);
  const [callStatus, setCallStatus] = useState<
    "idle" | "connecting" | "ringing" | "inCall" | "busy" | "declined"
  >("idle");
  const [callSeconds, setCallSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (callStatus === "connecting") {
      const t = window.setTimeout(() => setCallStatus("ringing"), 2000);
      return () => clearTimeout(t);
    }
    if (callStatus === "ringing") {
      const t = window.setTimeout(() => {
        const outcome = Math.random();
        if (outcome < 0.2) setCallStatus("busy");
        else if (outcome < 0.4) setCallStatus("declined");
        else setCallStatus("inCall");
      }, 3000);
      return () => clearTimeout(t);
    }
    if (callStatus === "inCall") {
      timerRef.current = window.setInterval(() => {
        setCallSeconds((s) => s + 1);
      }, 1000);
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
    }
  }, [callStatus]);

  const startCall = useCallback((agentName: string) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setCurrentCallAgent(agentName);
    setCallStatus("connecting");
    setCallSeconds(0);
  }, []);

  const hangUp = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setCurrentCallAgent(null);
    setCallStatus("idle");
    setCallSeconds(0);
  }, []);

  const formatDuration = (secs: number) => {
    const mm = String(Math.floor(secs / 60)).padStart(2, "0");
    const ss = String(secs % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  return (
    <div className="flex flex-col space-y-1 sm:space-y-2 md:space-y-3 w-full">
      {agents.map((agent) => {
        const isActive   = agent.name === currentCallAgent;
        const isDisabled = currentCallAgent !== null && !isActive;

        return (
          <div
            key={agent.name}
            className={`
              relative flex items-center justify-between
              bg-gray-900 bg-opacity-90
              rounded-2xl
              px-2 sm:px-3 md:px-4
              py-1 sm:py-2 md:py-3
              shadow-md
              w-full
              ${isDisabled ? "filter blur-sm" : ""}
            `}
          >
            {isActive ? (
              // ─── Active Call Interface ─────────────────────────
              <div className="flex-1 flex items-center">
                {/* Avatar */}
                <div className="flex-shrink-0 mr-1 sm:mr-2 md:mr-3">
                  <Image
                    src={agent.avatar}
                    alt={`${agent.name} avatar`}
                    width={40}
                    height={40}
                    className="rounded-full w-6 h-6 sm:w-8 sm:h-10 md:w-10 md:h-10 object-cover"
                  />
                </div>

                {/* Name + status/duration */}
                <div className="flex-1 flex flex-col">
                  <span className="text-white text-[10px] sm:text-xs md:text-sm font-medium">
                    {agent.name}
                  </span>
                  <span className="text-gray-300 text-[10px] sm:text-xs md:text-sm mt-0.5">
                    {callStatus === "connecting" && "Connecting..."}
                    {callStatus === "ringing"    && "Ringing..."}
                    {callStatus === "inCall"      && formatDuration(callSeconds)}
                    {callStatus === "busy"        && "Agent is busy"}
                    {callStatus === "declined"    && "Call declined"}
                  </span>
                </div>

                {/* Hang-Up Button */}
                <button
                  onClick={hangUp}
                  className="
                    w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8
                    flex items-center justify-center
                    bg-red-500 hover:bg-red-600
                    rounded-full transition
                    ml-1 sm:ml-2 md:ml-3
                  "
                  aria-label="Hang up"
                >
                  <Phone className="w-3 h-3 sm:w-4 md:w-4 text-white transform rotate-[135deg]" />
                </button>

                {(callStatus === "busy" || callStatus === "declined") && (
                  <button
                    onClick={() => startCall(agent.name)}
                    className="
                      ml-1 sm:ml-2 md:ml-3
                      px-1 sm:px-2 md:px-3
                      py-0.5
                      bg-blue-500 hover:bg-blue-600
                      text-white
                      text-[10px] sm:text-xs md:text-sm
                      rounded-full transition
                    "
                  >
                    Try Again
                  </button>
                )}
              </div>
            ) : (
              // ─── Notification Card ─────────────────────────────
              <>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-1 sm:mr-2 md:mr-3">
                    <Image
                      src={agent.avatar}
                      alt={`${agent.name} avatar`}
                      width={50}
                      height={50}
                      className="rounded-full w-6 h-6 sm:w-8 sm:h-10 md:w-10 md:h-10 object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-white text-[10px] sm:text-xs md:text-sm font-medium">
                      {agent.name} – Talk to Our AI Agent
                    </span>
                    <p className="text-gray-300 text-[10px] sm:text-xs md:text-sm mt-0.5">
                      Experience Live Demo Calls
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => startCall(agent.name)}
                  disabled={isDisabled}
                  className={`
                    w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8
                    flex items-center justify-center
                    bg-green-500 hover:bg-green-600
                    rounded-full transition
                    ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                  aria-label={`Call ${agent.name}`}
                >
                  <Phone className="w-3 h-3 sm:w-4 md:w-4 text-white" />
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CallPanel;
