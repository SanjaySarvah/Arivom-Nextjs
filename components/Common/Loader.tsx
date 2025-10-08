import React from 'react';
import logoSrc from "../../public/assets/arivom-logo-latest.png"
import Image from 'next/image';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white relative overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Loader Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container with Animation */}
        <div className="relative mb-8">
          {/* Rotating Ring */}
          {/* <div className="absolute inset-0 -m-6 animate-spin-slow">
            <div className="w-full h-full rounded-full border-4 border-transparent border-t-blue-500 border-r-green-500"></div>
          </div> */}

          {/* Pulse Ring */}
          <div className="absolute inset-0 -m-4 animate-ping opacity-30">
            <div className="w-full h-full rounded-full bg-blue-400"></div>
          </div>

          {/* Logo */}
          <div className="relative animate-float">
            <Image
              src={logoSrc}
              alt="Arivom Logo"
              width={200}
              height={200}
              className="drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Loading Text with Animation */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 bg-clip-text text-transparent animate-gradient">
            ARIVOM
          </h2>

          {/* Loading Dots Animation */}
          <div className="flex items-center justify-center space-x-2">
            <p className="text-gray-600 text-lg font-medium">Loading</p>
            <div className="flex space-x-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 rounded-full animate-progress"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        :global(.animate-spin-slow) {
          animation: spin-slow 3s linear infinite;
        }

        :global(.animate-float) {
          animation: float 3s ease-in-out infinite;
        }

        :global(.animate-gradient) {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        :global(.animate-progress) {
          animation: progress 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;
