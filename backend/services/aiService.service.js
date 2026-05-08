import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
console.log("Groq Key loaded:", !!process.env.GROQ_API_KEY);

export const generateExecutiveSummary = async (auditData) => {
  const { summary, flags, credexOffer } = auditData;
  const { totalCurrentSpend, optimizedMonthlySpend } = summary;
  const { redundancies, optimizations } = flags;
  const { eligible, totalPotentialSavings } = credexOffer;

  const redundancyList = redundancies.map(r => r.message).join(' ');
  const optimizationList = optimizations.map(o => o.message).join(' ');

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a professional financial auditor. Write a strictly 100-word executive summary."
        },
        {
          role: "user",
          content: `Monthly Spend: $${totalCurrentSpend}. Optimized Spend: $${optimizedMonthlySpend}. Total Potential Savings: $${totalPotentialSavings}. Redundancies: ${redundancyList} Optimizations: ${optimizationList} Eligible for Credex Credits: ${eligible}. Pitch 'Credex Credits' if eligible.`
        }
      ],
      max_tokens: 150,
      temperature: 0.2,
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error("Groq API Error:", error.message);
    return `Your audit is complete. You are spending $${totalCurrentSpend} monthly and could save $${totalPotentialSavings} with optimizations. Review the breakdown below.`;
  }
};