import React, { useState } from 'react';
import UploadZone from './components/UploadZone';
import AnalysisDashboard from './components/AnalysisDashboard';
import { ShieldCheck } from 'lucide-react';

function App() {
  const [file, setFile] = useState(null);

  return (
    <div className="min-h-screen bg-background text-white p-6 md:p-12 font-sans selection:bg-primary/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">TruthLens <span className="text-zinc-600 font-normal">AI Detector</span></h1>
          </div>
          <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Documentation</a>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center">
          {!file ? (
            <div className="w-full max-w-3xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="space-y-4">
                <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 pb-2">
                  Is it Real or AI?
                </h2>
                <p className="text-xl text-zinc-400 max-w-xl mx-auto">
                  Advanced forensic analysis to detect AI-generated content in images and videos.
                </p>
              </div>

              <div className="pt-8">
                <UploadZone onFileSelect={setFile} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left">
                {[
                  { title: "Metadata Scan", desc: "Checks for hidden signatures from tools like Midjourney & Stable Diffusion." },
                  { title: "Visual Analysis", desc: "Analyzes pixel patterns, noise distribution, and lighting consistency." },
                  { title: "Deepfake Detection", desc: "Identifies facial inconsistencies and temporal artifacts in videos." }
                ].map((feature, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-surface border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-zinc-400">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <AnalysisDashboard file={file} onReset={() => setFile(null)} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
