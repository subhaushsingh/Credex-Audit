# Credex Audit

Stop overpaying for AI — Credex Audit analyzes your current software subscriptions, eliminates redundant seats, and instantly surfaces heavily discounted enterprise credits.

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui |
| **Backend** | Node.js / Express.js |
| **Validation** | Zod |
| **Database** | Supabase (PostgreSQL) |
| **AI Provider** | Groq (`llama-3.1-8b-instant`) |
| **Email** | Resend |

## 🧠 Engineering Decisions & Trade-offs

1. **Decoupled Architecture:** Chose a standalone Express server over Next.js API routes to implement custom middleware (rate-limiting, HPP) and ensure a clean SIGTERM shutdown process that serverless environments often abstract away.

2. **Runtime Validation (Zod):** Utilized JavaScript with Zod for schema validation on the backend. Provides type-safety at the API boundary without a TypeScript build step, keeping iteration speed high during this 7-day build.

3. **Defensive API:** Implemented `hpp` (HTTP Parameter Pollution protection) and a strict `10kb` JSON payload limit to protect the lead-generation endpoint from common exploitation patterns.

4. **AI Provider Pivot (Hugging Face → Groq):** Originally integrated Hugging Face Inference API for the executive summary. Cold-start latency on free-tier models regularly exceeded 20s, causing client-side timeouts. Pivoted to Groq (`llama-3.1-8b-instant`) which consistently responds in under 2s with no cold-start penalty.

5. **Fire-and-Forget Lead Capture:** The Express controller does not `await` the Supabase upsert or Resend email calls. The API responds to the client immediately with the audit result, while lead capture completes asynchronously in the background. This keeps P99 response times low and ensures a DB or email failure never degrades the user-facing experience.

6. **State-Driven Frontend:** Built the Next.js frontend around a single `auditData` state in `page.tsx`. When null, the form renders; when populated, the results dashboard renders. No client-side routing required — the swap is instant and the mental model stays simple.

7. **Form Persistence (`useLocalStorage`):** Wrapped form state in a custom `useLocalStorage` hook so users do not lose their subscription list on accidental page refresh. Small detail, meaningful UX improvement.

8. **Strong Typing on the Frontend:** Replaced all `any` types in `AuditResults.tsx` with explicit TypeScript interfaces mirroring the backend response shape. Compile-time safety across the full data contract.