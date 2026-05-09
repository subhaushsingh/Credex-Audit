"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  RefreshCcw,
  TrendingDown,
  DollarSign,
  Sparkles,
  Zap,
  BrainCircuit,
} from "lucide-react";

interface Redundancy {
  message: string;
  potentialSavings: number;
}

interface Optimization {
  message: string;
  potentialSavings: number;
}

interface Summary {
  totalCurrentSpend: number;
  optimizedMonthlySpend: number;
  annualWaste: number;
}

interface CredexOffer {
  eligible: boolean;
  discountPercentage: number;
  estimatedMonthlyWithCredex: number;
  totalPotentialSavings: number;
}

interface AuditPayload {
  summary: Summary;
  flags: {
    redundancies: Redundancy[];
    optimizations: Optimization[];
  };
  credexOffer: CredexOffer;
  aiSummary?: string;
}

interface AuditResultsProps {
  data: { data?: AuditPayload } | AuditPayload;
  onReset: () => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AuditResults({ data, onReset }: AuditResultsProps) {
  const payload: AuditPayload | null =
    "data" in data && data.data ? data.data : (data as AuditPayload);

  if (!payload?.summary) {
    return (
      <div className="p-8 text-center bg-red-900/20 border border-red-500/20 rounded-3xl mt-8">
        <p className="text-red-400 font-bold mb-4">
          Error: Invalid data received from server.
        </p>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { summary, flags, credexOffer, aiSummary } = payload;
  const hasInsights =
    flags.redundancies.length > 0 || flags.optimizations.length > 0;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 w-full max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          variants={item}
          className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl flex flex-col justify-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <DollarSign size={40} />
          </div>
          <p className="text-sm font-medium text-slate-400 mb-1">
            Current Monthly Spend
          </p>
          <p className="text-4xl font-bold text-white">
            ${summary.totalCurrentSpend}
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className="bg-emerald-900/20 backdrop-blur-xl p-6 rounded-3xl border border-emerald-500/20 shadow-xl flex flex-col justify-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <CheckCircle2 size={40} className="text-emerald-400" />
          </div>
          <p className="text-sm font-medium text-emerald-400/80 mb-1">
            Optimized Spend
          </p>
          <p className="text-4xl font-bold text-emerald-400">
            ${summary.optimizedMonthlySpend}
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className="bg-red-900/20 backdrop-blur-xl p-6 rounded-3xl border border-red-500/20 shadow-xl flex flex-col justify-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <TrendingDown size={40} className="text-red-400" />
          </div>
          <p className="text-sm font-medium text-red-400/80 mb-1">
            Projected Annual Waste
          </p>
          <p className="text-4xl font-bold text-red-400">
            ${summary.annualWaste}
          </p>
        </motion.div>
      </div>

      <motion.div variants={item}>
        {hasInsights ? (
          <div className="bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="text-amber-400" size={20} /> Actionable Insights
            </h3>
            <ul className="space-y-4">
              {flags.redundancies.map((flag, idx) => (
                <li
                  key={`red-${idx}`}
                  className="flex items-start gap-4 p-4 bg-black/20 rounded-2xl border border-white/5 hover:bg-black/30 transition-colors"
                >
                  <div className="bg-amber-500/20 p-2.5 rounded-xl shrink-0 border border-amber-500/20">
                    <AlertTriangle size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {flag.message}
                    </p>
                    <p className="text-sm font-bold text-emerald-400 mt-2">
                      Save ${flag.potentialSavings}/mo
                    </p>
                  </div>
                </li>
              ))}
              {flags.optimizations.map((flag, idx) => (
                <li
                  key={`opt-${idx}`}
                  className="flex items-start gap-4 p-4 bg-black/20 rounded-2xl border border-white/5 hover:bg-black/30 transition-colors"
                >
                  <div className="bg-blue-500/20 p-2.5 rounded-xl shrink-0 border border-blue-500/20">
                    <TrendingDown size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {flag.message}
                    </p>
                    <p className="text-sm font-bold text-emerald-400 mt-2">
                      Save ${flag.potentialSavings}/mo
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-emerald-900/20 backdrop-blur-xl p-6 rounded-3xl border border-emerald-500/20 text-emerald-300 flex items-center gap-3 shadow-xl">
            <CheckCircle2 className="shrink-0" />
            <p>
              Your tech stack is perfectly optimized! No redundant tools
              detected.
            </p>
          </div>
        )}
      </motion.div>

      {aiSummary && (
        <motion.div
          variants={item}
          className="bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 shadow-xl"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BrainCircuit className="text-violet-400" size={20} /> AI Executive
            Summary
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">{aiSummary}</p>
        </motion.div>
      )}

      <motion.div
        variants={item}
        className={`p-6 md:p-8 rounded-3xl border backdrop-blur-xl relative overflow-hidden ${
          credexOffer.eligible
            ? "bg-indigo-600/20 border-indigo-500/30 shadow-[0_0_30px_rgba(79,70,229,0.15)]"
            : "bg-white/5 border-white/10"
        }`}
      >
        {credexOffer.eligible && (
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none" />
        )}

        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white relative z-10">
          <Sparkles
            className={credexOffer.eligible ? "text-indigo-400" : "text-slate-500"}
            size={20}
          />
          Credex Partnership Offer
        </h3>

        <div className="relative z-10">
          {credexOffer.eligible ? (
            <div>
              <p className="text-indigo-200/80 mb-6 max-w-2xl text-sm leading-relaxed">
                Because your baseline spend exceeds $500, you automatically
                qualify for our Enterprise consolidation program. Transfer your
                billing to Credex to unlock these rates.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 p-5 rounded-2xl border border-indigo-500/20">
                  <p className="text-xs text-indigo-300/70 uppercase tracking-wider mb-1 font-semibold">
                    Discount Unlocked
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {credexOffer.discountPercentage}% OFF
                  </p>
                </div>
                <div className="bg-black/30 p-5 rounded-2xl border border-emerald-500/20">
                  <p className="text-xs text-emerald-400/70 uppercase tracking-wider mb-1 font-semibold">
                    New Monthly Total
                  </p>
                  <p className="text-3xl font-bold text-emerald-400">
                    ${credexOffer.estimatedMonthlyWithCredex}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400 leading-relaxed">
              Spend must exceed $500/mo to qualify for the Credex Enterprise
              consolidation discount. Optimize your current stack to save money
              immediately!
            </p>
          )}
        </div>
      </motion.div>

      <motion.div variants={item} className="flex justify-center pt-6">
        <button
          onClick={onReset}
          className="group flex items-center gap-2 px-6 py-3 text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white rounded-xl transition-all font-medium shadow-sm"
        >
          <RefreshCcw
            size={16}
            className="group-hover:-rotate-180 transition-transform duration-500"
          />
          Run Another Audit
        </button>
      </motion.div>
    </motion.div>
  );
}