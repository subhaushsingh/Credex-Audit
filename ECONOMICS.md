# Unit Economics & Path to $1M ARR

## 1. The Value of a Converted Lead
Credex sells discounted AI infrastructure credits (e.g., Cursor, Claude, ChatGPT Enterprise). To calculate the value of a lead, we must estimate our margins on those credits. 

**Assumptions:**
- The target user (Series A/B startup) spends an average of $5,000/month on AI infrastructure.
- Credex provides these credits at a 20% discount ($4,000/month).
- Credex sources these credits at a 30% discount, netting a 10% profit margin on the gross volume.
- **Monthly Gross Margin per Customer:** $500.
- **Annual Recurring Revenue (ARR) per Customer:** $6,000.
- **Customer Lifetime (Estimated):** 24 months.
- **Lifetime Value (LTV):** $12,000.

## 2. Customer Acquisition Cost (CAC) by Channel
Based on the Go-To-Market strategy of $0 paid spend, our CAC is purely the time-cost of outreach.

- **Channel 1: Fractional CFO Outreach (Direct Sales)**
  - Assuming 1 hour of outbound prospecting yields 10 DMs.
  - 10 DMs -> 2 meetings -> 1 deployed audit to a client -> 0.5 closed deals.
  - At a hypothetical founder time-value of $100/hr, **CAC = $200**.
  - *LTV:CAC Ratio:* $12,000 : $200 (60:1, highly profitable but unscalable without hiring).

- **Channel 2: "Roast My Stack" Reddit/X Threads (Inbound/Viral)**
  - 2 hours of writing personalized roasts generates 400 visits.
  - 400 visits -> 120 audits -> 15 leads -> 1 closed deal.
  - **CAC = $200** (Time cost).

## 3. Conversion Thresholds for Profitability
Since the product is a free diagnostic tool, the variable cost to run an audit is essentially zero (Render free tier + fractional cents for the Groq API). Therefore, the business is profitable on the very first converted user. 

However, to optimize the sales team's time, we need a high-converting funnel. The target conversion rates are:
- **Landing Page to Completed Audit:** 30% (Frictionless, no login required).
- **Audit Completed to Lead Capture:** 10% (Users who trigger the ">$500 savings" threshold and submit email).
- **Lead Capture to Consultation Booked:** 20% (Driven by the automated Resend email sequence with calendar link).
- **Consultation to Credit Purchase:** 40% (High close rate because the savings are mathematically proven before the call).

*Net Funnel:* For every 1,000 visitors, we get 300 audits -> 30 leads -> 6 meetings -> **2.4 closed customers ($14,400 ARR).**

## 4. The Path to $1M ARR in 18 Months
To reach $1,000,000 in ARR, Credex needs **167 active enterprise customers** (assuming our $6,000 ARR/customer average).

**What must be true to achieve this?**
1. **The CFO Trojan Horse Must Work:** We cannot rely purely on organic Reddit posts for 18 months. We need 10 Fractional CFOs actively using this tool across their portfolios, bringing us ~5 new clients a month.
2. **Self-Serve Enterprise:** Currently, the tool requires a "Consultation Booked." To hit 167 customers, we need to eliminate the human bottleneck by Month 6, allowing startups to purchase the discounted credits directly from the audit results page via Stripe.
3. **Traffic Velocity:** At our current funnel metrics (2.4 customers per 1,000 visitors), we need approximately **70,000 total landing page visitors** over the next 18 months (~3,800/month). This requires spinning up an SEO strategy (e.g., programmatic pages for "GitHub Copilot vs. Cursor Pricing") by Month 3 to replace manual outbound hustle.