"use client";

import React, { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const PhoneMockup: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [heroAnimationData, setHeroAnimationData] = useState<any>(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch("/hero.json");
        const data = await response.json();
        setHeroAnimationData(data);
      } catch (error) {
        console.error("Failed to load animation:", error);
      }
    };
    loadAnimation();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
      {/* Floating Dot Lottie (behind the phone) */}
      {heroAnimationData && (
        <div
          className="
            absolute -top-[35px] sm:-top-[36px] md:-top-[44px]
            left-[calc(85%+15px)] -translate-x-1/2
            w-1/2 sm:w-1/2 md:w-2/5 lg:w-1/3 
            aspect-square 
            opacity-100
            z-0
          "
        >
          <DotLottieReact
            src="https://lottie.host/28678e3a-1882-46c3-ae84-ed44b5204a05/falHxt8bTU.lottie"
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}

      {/* iPhone mockup container */}
      <div className="relative overflow-hidden pb-[100%] z-10">
        <Image
          src="/iphone-mockup.svg"
          alt="iPhone Mockup"
          fill
          className="absolute inset-0 object-cover object-top"
          priority
        />

        {/* Notification + Form on top of the phone */}
        <div className="absolute inset-0 flex flex-col items-center pt-16 sm:pt-20 px-4 sm:px-7 z-20">
          <div className="w-full max-w-[240px] sm:max-w-[280px] mt-2 sm:mt-4">
            {/* Notification */}
            <div
              className="
                bg-white/95 backdrop-blur-sm rounded-xl p-3 mb-3 sm:mb-4
                shadow-sm border border-gray-200
              "
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-900">
                      Call Sampark AI
                    </span>
                    <span className="text-[10px] text-gray-500">now</span>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-0.5">
                    Talk to Our AI Agents
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div
              className="
                bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-4
                shadow-sm border border-gray-200
              "
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="relative">
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter Phone Number"
                      className="
                        w-full px-3 py-2 text-sm sm:text-base 
                        bg-gray-50 border border-gray-200 rounded-lg 
                        text-gray-900 placeholder-gray-500 
                        focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent
                      "
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-1 h-3 bg-blue-500 animate-pulse rounded-sm" />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="
                      w-full bg-gray-900 text-white py-2 rounded-lg 
                      text-sm font-semibold hover:bg-gray-800 
                      transition-colors duration-200
                    "
                  >
                    Let's Talk
                  </button>
                </form>
              ) : (
                <div className="text-center py-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs text-gray-900 font-medium">
                    You are now receiving a call from Sampark AI.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
