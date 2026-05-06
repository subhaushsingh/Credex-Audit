# Credex Audit
Stop overpaying for AI—Credex Audit analyzes your requirements, eliminates redundant seats, and instantly surfaces heavily discounted enterprise credits.

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js (App Router), Tailwind CSS |
| **Backend** | Node.js / Express.js |
| **Validation** | Zod |
| **Database** | Supabase (PostgreSQL) |
| **AI Provider** | Anthropic / OpenAI |

## 🧠 Engineering Decisions & Trade-offs

1. **Decoupled Architecture:** I chose a standalone Express server over Next.js API routes to implement custom middleware (rate-limiting, HPP) and to ensure a clean SIGTERM shutdown process that serverless environments often abstract away.
2. **Runtime Validation (Zod):** To maintain high iteration speed during this 7-day build, I utilized JavaScript with Zod for schema validation. This provides the safety of type checking at the API boundary without the build-step overhead of TypeScript.
3. **Defensive API:** Implemented `hpp` (HTTP Parameter Pollution) and a strict `10kb` JSON payload limit to protect the lead-generation endpoint from common exploitation patterns.