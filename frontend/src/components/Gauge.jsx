import React from 'react';
import { motion } from 'framer-motion';

const Gauge = ({ score }) => {
    // Score is 0-100
    // 0 = Real, 100 = AI

    const isAi = score > 50;
    const color = isAi ? '#ef4444' : '#22c55e'; // Red for AI, Green for Real
    const label = isAi ? 'AI Generated' : 'Human Made';

    // Calculate circumference for SVG circle
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center relative">
            <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="96"
                        cy="96"
                        r={radius}
                        stroke="#27272a"
                        strokeWidth="12"
                        fill="transparent"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        cx="96"
                        cy="96"
                        r={radius}
                        stroke={color}
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeLinecap="round"
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-4xl font-bold text-white"
                    >
                        {score}%
                    </motion.span>
                    <span className="text-zinc-500 text-sm uppercase tracking-wider mt-1">Probability</span>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-4 text-center"
            >
                <h3 className="text-2xl font-bold" style={{ color }}>{label}</h3>
                <p className="text-zinc-400 text-sm mt-1">Based on metadata and visual analysis</p>
            </motion.div>
        </div>
    );
};

export default Gauge;
