# Reflection

## 1. The hardest bug you hit this week, and how you debugged it
The most challenging bug I encountered was a silent failure during the deployment phase, where the Next.js frontend on Vercel was completely unable to communicate with the Express backend on Render, despite both services showing as "live." The frontend simply threw a generic "Failed to fetch" error. 

My initial hypothesis was that the Render free tier had spun down and timed out the request. I tested this by hitting the `/health` endpoint , which returned a 200 OK instantly. My second hypothesis was that the nested JSON payload being sent to the `/calculate` endpoint was exceeding the `10kb` limit I set in `express.json()`. I checked the network tab, but the payload was only a few hundred bytes. 

Finally, I hypothesized a CORS configuration issue. I checked the preflight `OPTIONS` request in the browser's Network tab and saw it was being blocked. I compared the Vercel origin header (`https://credex-audit-seven.vercel.app`) with my backend `ALLOWED_ORIGIN` environment variable (`https://credex-audit-seven.vercel.app/`). The bug was a single trailing slash. Because I was using strict string matching (`.includes()`), the browser's origin did not match the environment variable. I fixed this by writing a defensive sanitization utility in my `app.js` that automatically strips trailing slashes from allowed origins before evaluating the request.

## 2. A decision you reversed mid-week, and what made you reverse it
Initially, I planned to build the entire application—both frontend and backend—using Next.js App Router and Serverless API Routes. It seemed like the fastest way to ship an MVP in 7 days without worrying about configuring two separate deployment pipelines. 

However, halfway through Day 1, I reversed this decision and completely decoupled the architecture, spinning up a standalone Node.js/Express server for the backend. I made this pivot for two reasons. [cite_start]First, the assignment requires strict abuse protection[cite: 87]. Implementing robust, memory-based rate limiting and HTTP Parameter Pollution (HPP) protection is significantly easier and more predictable in a long-running Express process than in ephemeral serverless functions. 

Second, serverless environments often abstract away the process lifecycle. I wanted explicit control over graceful shutdowns (`SIGTERM`/`SIGINT`) to ensure that if the app is scaling or deploying, any active Supabase database connections or Resend email dispatch streams are closed cleanly. While decoupling cost me deployment speed, it resulted in a much more resilient, production-ready backend architecture.

## 3. What you would build in week 2 if you had it
If I had a second week, I would prioritize shifting this tool from a "single-use diagnostic" to a "recurring financial dashboard." 

[cite_start]First, I would build the Benchmark Mode mentioned in the prompt[cite: 97]. Right now, telling a user they spend $50/developer is helpful, but telling them "Companies your size average $25/developer" creates urgency. I would use the data collected in Week 1 to generate anonymous industry averages to power this feature.

Second, I would implement OAuth (Google/GitHub) to allow users to save their audits over time. This transforms the product from a static calculator into a historical tracking tool, allowing founders to see a graph of their AI spend over multiple quarters. 

[cite_start]Finally, I would add a PDF Export feature [cite: 95] generated via Puppeteer. In B2B SaaS, the person running the audit (Engineering Manager) is rarely the person holding the credit card (CFO/Founder). Giving the engineer a clean, branded PDF report makes it frictionless for them to forward the Credex optimization recommendations to the ultimate decision-maker, highly increasing the viral lead-generation loop.

## 4. How you used AI tools
I leaned on AI to accelerate my development velocity, treating it as a pair programmer for specific domains. I primarily used AI for UI/UX frontend fixes—specifically asking it to generate complex Framer Motion staggering animations and refine the Tailwind v4 "Glassmorphism" aesthetic. I also used it for ideation on my `TESTS.md` suite, asking it to suggest edge cases I might have missed (like string coercion in seat numbers). Lastly, I provided the AI with my Express `server.js` file and asked it to act as a security auditor to find critical vulnerabilities, which is how I decided to implement `hpp` and `helmet`.

[cite_start]I explicitly did *not* trust the AI with the core mathematical audit engine[cite: 78]. I hardcoded the logic and arrays because LLMs are notoriously unreliable at deterministic arithmetic, and hallucinating financial savings would destroy the tool's credibility.

**When the AI was wrong:** I asked the AI to scaffold a Jest test file for my ES modules. It provided a script that failed instantly with a `FATAL: Missing SUPABASE_URL` error. The AI failed to recognize that because my service file had top-level environment variable checks, importing the file into Jest would crash the suite before the tests even ran. I had to catch this and manually bypass the architecture using dynamic `await import()` combined with mocked `process.env` injections.

## 5. Self-rating on a 1-10 scale
* [cite_start]**Discipline: 9/10.** I maintained a strict, decoupled architecture and pushed commits across multiple distinct calendar days[cite: 216], resisting the urge to cram or take shortcuts on security.
* **Code Quality: 8/10.** I implemented strict Zod runtime validation, layered controller/service architecture, and achieved a 100% pass rate on 10 Jest test cases. It would be a 10 if I had used full TypeScript instead of JSDoc/Zod.
* **Design Sense: 9/10.** I pivoted away from a basic UI to build a premium, pitch-black Glassmorphism interface that legitimately feels like a high-end B2B SaaS product founders would trust.
* **Problem-solving: 9/10.** I successfully navigated tricky ES Module mocking in Jest, resolved nested data unwrapping bugs between Next.js and Express, and implemented a functional fallback for the Anthropic API.
* [cite_start]**Entrepreneurial Thinking: 8/10.** I treated this strictly as a lead-generation asset, focusing heavily on the "Time-to-Value" for the user (no login required) [cite: 41] while prioritizing the Credex high-spend upsell hook in the UI.