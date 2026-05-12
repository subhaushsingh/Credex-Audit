# Metrics & Instrumentation

## 1. The North Star Metric
**Qualified Consultations Booked.**

For an audit tool that a user might only interact with once a quarter, measuring Daily Active Users (DAU) or Session Length is a vanity trap. The sole purpose of this product is to serve as a top-of-funnel B2B lead generation asset for Credex. 

Therefore, the North Star metric is the absolute number of users who complete an audit, discover they are bleeding cash, and successfully book a call with the Credex sales team to purchase discounted credits. If this number is growing, the tool is a commercial success, regardless of bounce rates or total traffic.

## 2. Three Input Metrics Driving the North Star
To ensure we are on track to hit the North Star, we must monitor the funnel that feeds it:

1. **Audit Completion Rate (Activation):** The percentage of unique landing page visitors who successfully fill out the form and generate an audit result. This measures whether the UI is frictionless and the value proposition is clear.
2. **High-Intent Lead Capture Rate:** The percentage of users with >$500/month in identified savings who submit their email. This measures whether the "Credex Offer" hook is compelling enough to trade contact information for.
3. **Viral Share Rate (K-Factor):** The number of new unique visitors generated per completed audit via the public share URL. This measures the tool's organic growth loop and whether the Open Graph visual previews are effectively driving curiosity.

## 3. What I Would Instrument First
Before spending a dime on marketing, I would instrument **Input Field Drop-off tracking** using a tool like PostHog. Because the form state persists and captures multiple tools, I need to know exactly where users abandon the process. Do they quit when asked for "team size"? Do they get confused by the "tier" dropdowns? Pinpointing the exact point of friction allows for rapid UI iterations to maximize the Audit Completion Rate.

## 4. The Pivot Trigger
**If the "Average Identified Savings per Audit" falls below $100/month after 500 completed audits.**

This is a critical failure threshold. The entire GTM and economic model relies on the premise that startups are blindly overspending on AI. If the data shows that the market is actually highly optimized and most startups are already on the correct tiers, then the core value proposition of "finding waste" is invalid. At this threshold, I would pivot the product away from a "Savings Calculator" and turn it entirely into a "Benchmark Tool" (e.g., telling them how their efficient stack compares to competitors).