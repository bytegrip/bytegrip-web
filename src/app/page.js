'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Optional: Add any initialization logic here
    const timeout = setTimeout(() => {
      const letters = document.querySelectorAll('.letter');
      letters.forEach((letter, index) => {
        setTimeout(() => {
          letter.classList.add('active');
        }, index * 150);
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) return null;

  return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
              <motion.div
                  key={i}
                  className="absolute rounded-full bg-blue-500/10"
                  style={{
                    width: Math.random() * 300 + 50,
                    height: Math.random() * 300 + 50,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.2, 1],
                    opacity: [0, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.2,
                  }}
              />
          ))}
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxMDEwMTAiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMzBhMzAgMzAgMCAxIDEtNjAgMCAzMCAzMCAwIDAgMSA2MCAweiIgc3Ryb2tlPSIjMjAyMDIwIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>

        {/* Content container */}
        <motion.div
            className="z-10 relative flex flex-col items-center justify-center p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 overflow-hidden flex">
            <span className="sr-only">WIP</span>
            {['W', 'I', 'P'].map((letter, index) => (
                <motion.span
                    key={index}
                    className={`pb-6 letter inline-block ${letter === ' ' ? 'w-4' : ''}`}
                    initial={{
                      y: '100%',
                      opacity: 0,
                      rotateZ: Math.random() * 20 - 10,
                    }}
                    animate={{
                      y: '0%',
                      opacity: 1,
                      rotateZ: 0,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5 + index * 0.1,
                      ease: [0.215, 0.61, 0.355, 1]
                    }}
                >
                  {letter}
                </motion.span>
            ))}
          </h1>

        </motion.div>

        {/* Animated circles in the background */}
        <div className="fixed inset-0 -z-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
          </svg>
        </div>

        {/* Style */}
        <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        .letter {
          display: inline-block;
          transform-origin: bottom center;
          color: white;
          text-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
        }
        
        .letter.active {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
      </main>
  );
}
