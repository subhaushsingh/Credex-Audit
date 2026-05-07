import { AI_PRICING, AI_CATEGORIES } from '../utils/pricingData.js';

export const calculateAudit = (subscriptions) => {
  let totalCurrentSpend = 0;
  let optimizedSpend = 0;
  const redundancies = [];
  const optimizations = [];
  
  const categoryMap = {};

  subscriptions.forEach(sub => {
    const toolData = AI_PRICING[sub.tool];
    if (!toolData) return;

    const costPerSeat = toolData.tiers[sub.tier] || 0;
    const lineItemTotal = costPerSeat * sub.seats;
    totalCurrentSpend += lineItemTotal;

    if (!categoryMap[toolData.category]) {
      categoryMap[toolData.category] = [];
    }
    categoryMap[toolData.category].push({ 
      name: toolData.name, 
      cost: lineItemTotal, 
      seats: sub.seats 
    });
  });

  Object.keys(categoryMap).forEach(category => {
    const toolsInCat = categoryMap[category];
    if (toolsInCat.length > 1) {
      toolsInCat.sort((a, b) => b.cost - a.cost);
      const primary = toolsInCat[0];
      const wastefulTools = toolsInCat.slice(1);

      wastefulTools.forEach(tool => {
        redundancies.push({
          message: `Redundant ${category} detected: You are paying for ${tool.name} while also using ${primary.name}.`,
          potentialSavings: tool.cost
        });
      });
    }
  });

  const toolNames = subscriptions.map(s => s.tool);
  if (toolNames.includes('cursor') && toolNames.includes('github_copilot')) {
    optimizations.push({
      message: "Cursor users rarely need a separate GitHub Copilot license as Cursor handles autocompletion and chat natively.",
      potentialSavings: subscriptions.find(s => s.tool === 'github_copilot').seats * AI_PRICING.github_copilot.tiers[subscriptions.find(s => s.tool === 'github_copilot').tier]
    });
  }

  const redundancySavings = redundancies.reduce((acc, r) => acc + r.potentialSavings, 0);
  const specificOptimizationSavings = optimizations.reduce((acc, o) => acc + o.potentialSavings, 0);
  
  optimizedSpend = totalCurrentSpend - redundancySavings - specificOptimizationSavings;

  const isHighSpend = totalCurrentSpend > 500;
  const credexDiscountRate = isHighSpend ? 0.30 : 0.20;
  const credexPrice = optimizedSpend * (1 - credexDiscountRate);

  
  return {
    summary: {
      totalCurrentSpend: Number(totalCurrentSpend.toFixed(2)),
      optimizedMonthlySpend: Number(optimizedSpend.toFixed(2)),
      annualWaste: Number(((totalCurrentSpend - optimizedSpend) * 12).toFixed(2))
    },
    flags: {
      redundancies,
      optimizations
    },
    credexOffer: {
      eligible: isHighSpend,
      discountPercentage: credexDiscountRate * 100,
      estimatedMonthlyWithCredex: Number(credexPrice.toFixed(2)),
      totalPotentialSavings: Number((totalCurrentSpend - credexPrice).toFixed(2))
    }
  };
};
