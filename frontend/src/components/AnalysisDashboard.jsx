import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import Gauge from './Gauge';

const AnalysisDashboard = ({ file, onReset }) => {
    const [status, setStatus] = useState('scanning'); // scanning, complete, error
    const [result, setResult] = useState(null);

    useEffect(() => {
        const analyzeFile = async () => {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('https://automatic-doodle-nded.onrender.com/analyze', {
                    method: 'POST',
                    body: formData,
                });


                if (!response.ok) throw new Error('Analysis failed');

                const data = await response.json();
                setResult(data);
                setStatus('complete');
            } catch (error) {
                console.error(error);
                setStatus('error');
            }
        };

        analyzeFile();
    }, [file]);

    return (
        <div className="w-full max-w-4xl mx-auto mt-8">
            <AnimatePresence mode="wait">
                {status === 'scanning' && (
                    <motion.div
                        key="scanning"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col items-center justify-center p-12 bg-surface rounded-2xl border border-zinc-800 relative overflow-hidden"
                    >
                        {/* Scanning Animation Line */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="w-full h-1 bg-primary/50 shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-scan absolute top-0" />
                        </div>

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-700 mb-6 animate-pulse">
                                <Scan className="w-10 h-10 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Analyzing Media</h2>
                            <p className="text-zinc-400">Checking metadata and visual patterns...</p>
                        </div>
                    </motion.div>
                )}

                {status === 'complete' && result && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {/* Left Column: Gauge & Score */}
                        <div className="bg-surface p-8 rounded-2xl border border-zinc-800 flex flex-col items-center justify-center">
                            <Gauge score={result.confidence} />
                        </div>

                        {/* Right Column: Details */}
                        <div className="bg-surface p-8 rounded-2xl border border-zinc-800 flex flex-col">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Info className="text-primary" size={20} />
                                Analysis Report
                            </h3>

                            <div className="space-y-4">
                                <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                                    <span className="text-zinc-500 text-xs uppercase tracking-wider block mb-1">Filename</span>
                                    <span className="text-zinc-200 font-mono text-sm truncate block">{result.filename}</span>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-sm text-zinc-400 uppercase tracking-wider font-semibold">Reasoning</p>
                                    {result.reasoning.map((reason, index) => (
                                        <div key={index} className="flex items-start gap-3 p-3 bg-zinc-900/30 rounded-lg">
                                            {result.is_ai ? (
                                                <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                                            ) : (
                                                <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                                            )}
                                            <p className="text-zinc-300 text-sm">{reason}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={onReset}
                                className="mt-auto pt-8 w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-colors"
                            >
                                Analyze Another File
                            </button>
                        </div>
                    </motion.div>
                )}

                {status === 'error' && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center p-12 bg-surface rounded-2xl border border-danger/20"
                    >
                        <AlertTriangle className="w-16 h-16 text-danger mb-4" />
                        <h2 className="text-xl font-bold text-white">Analysis Failed</h2>
                        <p className="text-zinc-400 mt-2 text-center">Could not connect to the analysis server. Make sure the backend is running.</p>
                        <button
                            onClick={onReset}
                            className="mt-6 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                        >
                            Try Again
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AnalysisDashboard;

