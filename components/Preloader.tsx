import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  .pyramid-loader {
    position: relative;
    width: 72px;
    height: 72px;
    transform-style: preserve-3d;
    transform: rotateX(-20deg);
  }

  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    animation: spin 4s linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotateY(360deg);
    }
  }

  .side {
    width: 70px;
    height: 70px;
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    margin: auto;
    transform-origin: center top;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }

  .side1 {
    transform: rotateZ(-30deg) rotateY(90deg);
    background: conic-gradient(#e0115f, #ff6f61, #e0115f);
  }

  .side2 {
    transform: rotateZ(30deg) rotateY(90deg);
    background: conic-gradient(#ff6f61, #e0115f, #ff6f61);
  }

  .side3 {
    transform: rotateX(30deg);
    background: conic-gradient(#e0115f, #ff6f61, #e0115f);
  }

  .side4 {
    transform: rotateX(-30deg);
    background: conic-gradient(#ff6f61, #e0115f, #ff6f61);
  }

  .shadow {
    width: 60px;
    height: 60px;
    background: #ff6f61;
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    margin: auto;
    transform: rotateX(90deg) translateZ(-40px);
    filter: blur(12px);
  }
`;

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        return Math.min(100, prev + Math.random() * 15);
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <StyledWrapper>
      <div
        className={`
          fixed inset-0 z-50 flex items-center justify-center
          bg-gradient-to-br from-white to-indigo-100
          transition-opacity duration-500
          ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
      >
        {/* center everything in a column with equal spacing */}
        <div className="flex flex-col items-center justify-center gap-6 w-full max-w-xs px-4">
          {/* Pyramid loader */}
          <div className="pyramid-loader">
            <div className="wrapper">
              <span className="side side1" />
              <span className="side side2" />
              <span className="side side3" />
              <span className="side side4" />
              <span className="shadow" />
            </div>
          </div>

          {/* Title & subtitle */}
          <div className="text-center">
            <h2 className="text-3xl font-raleway text-gray-900">
              CONVIS AI
            </h2>
            <p className="text-gray-700 mt-1">loading...</p>
          </div>

          {/* Progress bar */}
          <div className="w-full">
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-sm font-medium text-gray-600 mt-1">
              {Math.round(progress)}%
            </p>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default Preloader;
