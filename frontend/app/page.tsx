"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuditForm from "../components/AuditForm";
import AuditResults from "../components/AuditResults";

export default function Home() {
  const [auditData, setAuditData] = useState<any | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedIsStarted = localStorage.getItem("credex_isStarted");
    const savedAuditData = localStorage.getItem("credex_auditData");

    if (savedIsStarted) setIsStarted(JSON.parse(savedIsStarted));
    if (savedAuditData) setAuditData(JSON.parse(savedAuditData));
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("credex_isStarted", JSON.stringify(isStarted));
      localStorage.setItem("credex_auditData", JSON.stringify(auditData));
    }
  }, [isStarted, auditData, isMounted]);

  const handleGoHome = (e: React.MouseEvent) => {
    e.preventDefault(); 
    setIsStarted(false);
    setAuditData(null);
    localStorage.removeItem("credex_isStarted");
    localStorage.removeItem("credex_auditData");
  };

  if (!isMounted) return null; 

  return (
    <main className="min-h-screen bg-transparent text-slate-200 overflow-hidden relative font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

        <header className="flex items-center justify-between py-6 mb-12">
          <a 
            onClick={handleGoHome}
            className="flex gap-[8px] items-center -translate-y-1 cursor-pointer" 
            href="/" 
            data-discover="true"
          >
            <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-2.5">
              <path d="M29.1273 9.94472C31.5201 11.5758 32.3367 14.4527 32.1936 17.2658C32.0483 20.1199 30.928 23.2817 28.9699 26.1543C27.0117 29.027 24.4777 31.226 21.8741 32.4045C19.3079 33.5658 16.3315 33.8572 13.9388 32.2262C11.5461 30.5952 10.7294 27.7182 10.8725 24.9051C11.0178 22.0509 12.1385 18.8885 14.0967 16.0158C16.055 13.1432 18.5885 10.9449 21.192 9.76646C23.7582 8.60497 26.7345 8.31367 29.1273 9.94472Z" stroke="#086841" strokeWidth="4"></path>
              <path d="M27.0331 4.86983C33.5605 9.31935 33.8542 18.9905 28.9713 26.154C24.0882 33.3176 14.9783 36.5796 8.45079 32.13C1.92339 27.6804 1.63001 18.0085 6.51312 10.845C11.3963 3.68178 20.5057 0.420458 27.0331 4.86983Z" stroke="#086841" strokeWidth="4"></path>
            </svg>
            <p className="text-[#086841] text-[30px] font-semibold font-pp-mori-semibold mt-2 ">credex<span className="italic">Audit</span></p>
          </a>
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
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Stop<span className="relative inline-block"> <span className=" relative z-10 font-palanquin font-medium italic text-orange-500 dark:text-orange-400">wasting</span><svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="14"
                  viewBox="0 0 200 14"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 Q 50 2, 100 7 T 198 6"
                    stroke="currentColor"
                    className="text-orange-500"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg></span> money on <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-indigo-500">
                  redundant AI tools.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-jakarta tracking-tight ">
                Instantly identify overlapping subscriptions, calculate your exact annual waste, and see if you qualify for exclusive enterprise consolidation discounts.
              </p>

              <button
                onClick={() => setIsStarted(true)}
                className="
    group relative inline-flex items-center justify-center
    px-8 py-4 overflow-hidden rounded-xl
    font-bold text-white transition-all duration-300
    hover:scale-105 active:scale-95"
              >
                <span
                  className="
      absolute left-0 top-0 h-12 w-12 rounded-full
      bg-orange-400 transition-all duration-300
      group-hover:w-full"
                ></span>
                <span
                  className="relative z-10 flex items-center gap-2 text-base font-bold ">
                  Run Free Financial Audit
                  <svg
                    width="15"
                    height="10"
                    viewBox="0 0 13 10"
                    className="
        transition-transform duration-300
        -translate-x-1 group-hover:translate-x-0"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 5 L11 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <polyline
                      points="8 1 12 5 8 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
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
                auditId={auditData.auditId} 
                isPublicView={false}
                onReset={() => {
                  setAuditData(null);
                  setIsStarted(false);
                  localStorage.removeItem("credex_isStarted");
                  localStorage.removeItem("credex_auditData");
                  localStorage.removeItem("credex_formState");
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}