"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Loader2, AlertCircle } from "lucide-react";

export default function AuditForm({ onAuditComplete }: { onAuditComplete: (data: any) => void }) {
  const [email, setEmail] = useState("");
  const [subscriptions, setSubscriptions] = useState([
    { tool: "chatgpt", tier: "plus", seats: 1 }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedForm = localStorage.getItem("credex_formState");
    if (savedForm) {
      try {
        const { savedEmail, savedSubs } = JSON.parse(savedForm);
        if (savedEmail) setEmail(savedEmail);
        if (savedSubs && savedSubs.length > 0) setSubscriptions(savedSubs);
      } catch (e) {
        console.error("Failed to parse form state", e);
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "credex_formState", 
        JSON.stringify({ savedEmail: email, savedSubs: subscriptions })
      );
    }
  }, [email, subscriptions, isLoaded]);

  const availableTools = [
    { id: "chatgpt", name: "ChatGPT" },
    { id: "claude", name: "Claude" },
    { id: "gemini", name: "Gemini" },
    { id: "cursor", name: "Cursor" },
    { id: "github_copilot", name: "GitHub Copilot" }
  ];

  const availableTiers: Record<string, string[]> = {
    chatgpt: ["plus", "team", "enterprise"],
    claude: ["pro", "team"],
    gemini: ["advanced", "enterprise"],
    cursor: ["pro", "business"],
    github_copilot: ["individual", "business"]
  };

  const updateSubscription = (index: number, field: string, value: string | number) => {
    const updated = [...subscriptions];
    updated[index] = { ...updated[index], [field]: value };
    
    if (field === "tool") {
      const validTiers = availableTiers[value as string] || [];
      if (!validTiers.includes(updated[index].tier)) {
        updated[index].tier = validTiers[0] || "standard";
      }
    }
    setSubscriptions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/v1/audit/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subscriptions })
      });

      if (!response.ok) throw new Error("Failed to calculate audit.");
      
      const data = await response.json();
      onAuditComplete(data);
    } catch (err: any) {
      setError(err.message || "A network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Your Tech Stack</h2>
        <p className="text-sm text-slate-400 mt-2">Map out your current AI infrastructure for analysis.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Work Email</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            placeholder="you@company.com"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">Active Subscriptions</label>
          
          {subscriptions.map((sub, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-3 p-4 bg-black/20 border border-white/5 rounded-2xl relative group">
              <div className="flex-1">
                <label className="block text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Tool</label>
                <select 
                  value={sub.tool}
                  onChange={(e) => updateSubscription(index, "tool", e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                >
                  {availableTools.map(t => <option key={t.id} value={t.id} className="bg-slate-900">{t.name}</option>)}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Tier</label>
                <select 
                  value={sub.tier}
                  onChange={(e) => updateSubscription(index, "tier", e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                >
                  {(availableTiers[sub.tool] || []).map(tier => (
                    <option key={tier} value={tier} className="bg-slate-900">{tier.charAt(0).toUpperCase() + tier.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div className="w-full sm:w-24">
                <label className="block text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Seats</label>
                <input 
                  type="number" 
                  min="1"
                  value={sub.seats}
                  onChange={(e) => updateSubscription(index, "seats", parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {subscriptions.length > 1 && (
                <button 
                  type="button"
                  onClick={() => setSubscriptions(subscriptions.filter((_, i) => i !== index))}
                  className="absolute -right-2 -top-2 sm:static sm:mt-6 p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-full transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        <button 
          type="button" 
          onClick={() => setSubscriptions([...subscriptions, { tool: "chatgpt", tier: "plus", seats: 1 }])}
          className="flex items-center gap-2 text-sm text-indigo-400 font-medium hover:text-indigo-300 transition-colors py-2"
        >
          <Plus size={16} /> Add another tool
        </button>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-start gap-3 text-sm">
            <AlertCircle className="shrink-0 mt-0.5" size={18} />
            <p>{error}</p>
          </div>
        )}

        <hr className="border-white/10 my-6" />

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full py-4 px-4 bg-white text-black font-bold rounded-xl transition-all focus:ring-4 focus:ring-indigo-500/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:bg-slate-200"
        >
          {isSubmitting ? (
            <><Loader2 size={18} className="animate-spin text-black cursor-pointer" /> Analyzing Infrastructure...</>
          ) : "Analyze Spend"}
        </button>
      </form>
    </div>
  );
}
