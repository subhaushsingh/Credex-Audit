# System Architecture

## Data Flow Diagram
```mermaid
graph TD
    Client[Next.js Frontend] -->|Submit Audit Data| RateLimiter[Express Rate Limiter]
    RateLimiter --> Validator[Zod Schema Validation]
    Validator --> Engine[Audit Math Engine]
    Engine --> AI[Anthropic API - Summary]
    Engine --> DB[(Supabase DB - Leads)]
    AI --> Response[Audit Results Page]
    DB --> Email[Resend - Confirmation Email]