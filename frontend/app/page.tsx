"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuditForm from "../components/AuditForm";
import AuditResults from "../components/AuditResults";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function Home() {
  const [auditData, setAuditData] = useState<any | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  return (
  <main className="min-h-screen bg-transparent text-slate-200 overflow-hidden relative font-sans">
      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        <header className="flex items-center justify-between py-6 mb-12 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-500/20 p-2 rounded-lg border border-indigo-500/30">
              <ShieldCheck className="text-indigo-400" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Credex<span className="text-indigo-400">Audit</span></span>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {!isStarted ? (
            <motion.div 
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center pt-10 pb-20"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6">
                <Sparkles size={14} /> AI Spend Optimization Engine
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Stop wasting money on <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  redundant AI tools.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                Instantly identify overlapping subscriptions, calculate your exact annual waste, and see if you qualify for exclusive enterprise consolidation discounts.
              </p>
              
              <button 
                onClick={() => setIsStarted(true)}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-indigo-600 rounded-xl overflow-hidden transition-all hover:bg-indigo-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] focus:outline-none focus:ring-4 focus:ring-indigo-500/30"
              >
                Run Free Financial Audit
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ) : !auditData ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <AuditForm onAuditComplete={(data) => setAuditData(data)} />
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AuditResults 
                data={auditData} 
                onReset={() => {
                  setAuditData(null);
                  setIsStarted(false);
                }} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
