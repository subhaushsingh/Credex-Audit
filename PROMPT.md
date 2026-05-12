# LLM Prompts & Engineering

**Verified:** 2026-05-12

---

## 1. The Executive Summary Prompt

This prompt powers the personalized AI summary on the Audit Results page. I opted to use the **Groq API (`llama-3.1-8b-instant`)** for this feature because its ultra-low latency ensures the dashboard renders instantly without forcing the user to stare at a loading spinner.

### System Message

```text
You are a professional financial auditor. Write a strictly 100-word executive summary.
```

### User Message

```text
Monthly Spend: ${totalCurrentSpend}. 
Optimized Spend: ${optimizedMonthlySpend}. 
Total Potential Savings: ${totalPotentialSavings}. 
Redundancies: ${redundancyList} 
Optimizations: ${optimizationList} 
Eligible for Credex Credits: ${eligible}. 
Pitch 'Credex Credits' if eligible.
```

### Parameters

- `max_tokens: 150`
  - Acts as a hard ceiling to enforce the 100-word constraint.

- `temperature: 0.2`
  - Ensures highly deterministic, factual, and professional output without creative fluff.

---

## 2. Why I Wrote It This Way

### Persona Injection

Setting the system role to `"professional financial auditor"` forces the LLM to adopt a serious, B2B tone rather than sounding like a generic chatbot.

### Data-Driven Guardrails

Instead of passing raw JSON to the LLM and asking it to do math, I passed pre-computed variables such as:

- `totalPotentialSavings`
- `redundancyList`

The math is handled by a deterministic JavaScript engine; the LLM is strictly relegated to formatting that math into a narrative. This prevents hallucinated savings numbers.

### Conditional Pitching

The prompt dynamically includes the `eligible` boolean. If `true`, it explicitly commands the LLM to pitch **Credex Credits**, acting as an automated sales hook.

---

## 3. What I Tried That Didn't Work

### Higher Temperatures (`0.7+`)

Initially, I used default temperature settings. The LLM would occasionally:

- invent tools the user wasn't using
- offer generic startup advice
- drift away from the provided financial numbers

Lowering the temperature to `0.2` fixed this entirely.

### Asking the LLM to Calculate the Waste

I originally tried feeding the LLM the raw list of tools and asking it to identify redundancies and calculate waste.

This approach was inconsistent and produced incorrect calculations with high confidence.

That failure reinforced the architectural decision to:

- keep all financial logic deterministic inside the Node.js service
- use the LLM strictly for natural-language generation

---

## 4. Fallback Strategy

To ensure the app remains functional if the Groq API rate-limits or fails, I implemented a graceful `try/catch` fallback in the backend controller.

If the API throws an error, the user immediately receives a templated response containing their exact mathematical results:

```text
"Your audit is complete. You are spending $X monthly and could save $Y with optimizations. Review the breakdown below."
```

This guarantees:

- zero dashboard downtime
- consistent UX
- mathematically reliable output even without AI generation