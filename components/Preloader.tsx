// Preloader.tsx
import { useEffect, useState } from 'react';

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
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-gradient-to-br from-white to-indigo-100
        transition-opacity duration-500
        ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
    >
      <div className="max-w-sm w-full text-center px-4">
        {/* Simple spinner */}
        <div className="mb-6">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
        </div>

        {/* Darker, sharper text */}
        <h2 className="text-3xl font-raleway text-gray-900 mb-2">
          CONVIS AI
        </h2>
        <p className="text-gray-700 mb-6">
          loading...
        </p>

        {/* Refined progress bar */}
        <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-gray-600 mt-3 text-sm font-medium">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
};

export default Preloader;
