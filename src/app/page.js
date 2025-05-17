'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
    const [mounted, setMounted] = useState(false);
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
    const text = "FemboyZee";

    useEffect(() => {
        setMounted(true);

        // Animation interval for continuous 3D rotation
        const interval = setInterval(() => {
            setRotation(prev => ({
                x: prev.x,
                y: prev.y + 1, // Continuously rotate around Y axis
                z: prev.z,
            }));
        }, 30);

        return () => {
            clearInterval(interval);
        };
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

            {/* Content container with 3D effect */}
            <motion.div
                className="z-10 relative flex flex-col items-center justify-center p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                {/* 3D Spinning Text Container */}
                <div
                    className="perspective-1000 text-center mb-8"
                    style={{
                        perspective: "1000px",
                        transformStyle: "preserve-3d",
                    }}
                >
                    <motion.h1
                        className="text-5xl md:text-7xl font-extrabold tracking-tight inline-block"
                        style={{
                            transformStyle: "preserve-3d",
                            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
                        }}
                    >
                        <span className="sr-only">{text}</span>
                        {text.split('').map((letter, index) => (
                            <motion.span
                                key={index}
                                className={`letter inline-block ${letter === ' ' ? 'w-4' : ''}`}
                                initial={{
                                    opacity: 0,
                                    textShadow: "0 0 0 rgba(255,255,255,0)",
                                }}
                                animate={{
                                    opacity: 1,
                                    textShadow: "0 0 20px rgba(59, 130, 246, 0.8)",
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.5 + index * 0.1,
                                    ease: [0.215, 0.61, 0.355, 1]
                                }}
                                style={{
                                    color: `hsl(${210 + index * 15}, 80%, 70%)`,
                                    display: 'inline-block',
                                    transformStyle: 'preserve-3d',
                                    transform: `translateZ(${Math.sin(index) * 10 + 20}px)`,
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </motion.h1>
                </div>
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
                .perspective-1000 {
                    perspective: 1000px;
                }

                .letter {
                    display: inline-block;
                    transform-origin: center center;
                    backface-visibility: hidden;
                }

                @keyframes float {
                    0% { transform: translateY(0px) translateZ(20px); }
                    50% { transform: translateY(-10px) translateZ(30px); }
                    100% { transform: translateY(0px) translateZ(20px); }
                }

                @keyframes glow {
                    0% { text-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
                    50% { text-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6); }
                    100% { text-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
                }

                .letter {
                    animation: glow 3s ease-in-out infinite;
                }
            `}</style>
        </main>
    );
}