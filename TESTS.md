# Automated Testing Suite

## 🧪 How to Run the Tests

Because the backend is a standalone Express application utilizing ES Modules, the test suite is located in the `backend` directory and utilizes Node's experimental VM modules flag.

To run the full suite locally:

```bash
cd backend
npm run test
```

> **Note:** These tests also run automatically on every push to the `main` branch via our GitHub Actions CI pipeline (`.github/workflows/ci.yml`).

---

## 📁 `backend/__tests__/auditService.test.js`

This file contains the core logic validation for the Audit Engine. It ensures that all financial calculations, redundancy detections, and Credex discount triggers are **100% mathematically accurate**.

### ✅ Coverage Breakdown (10/10 Passing)

#### 1. should accurately calculate total spend with no redundancies

- **Covers:** Baseline spend accumulation.
- Verifies that single tools without overlaps are calculated at face value.

---

#### 2. should detect redundant General LLMs and flag the cheaper one as waste

- **Covers:** Category-based redundancy.
- Ensures that if a user has both ChatGPT Plus and Claude Pro, the engine flags one as unnecessary waste.

---

#### 3. should explicitly flag GitHub Copilot as redundant if Cursor is present

- **Covers:** Domain-specific overrides.
- Proves the engine understands that Cursor natively replaces Copilot.

---

#### 4. should apply a 30% Credex discount when initial spend exceeds \$500

- **Covers:** The high-spend hook.
- Verifies the dynamic 30% discount logic applies correctly to enterprise-scale usage.

---

#### 5. should handle an empty array gracefully without crashing

- **Covers:** Error handling / edge cases.
- Ensures the engine returns zeros safely if a user submits an empty form.

---

#### 6. should calculate redundancies proportional to the number of seats

- **Covers:** Seat scaling math.
- Verifies that waste is calculated as:

```text
Tool Price × Seats
```

instead of only the base price.

---

#### 7. should handle triple redundancies in the same category

- **Covers:** Complex overlap logic.
- Ensures that if three tools in the same category are present, the engine successfully isolates one and flags the other two as waste.

---

#### 8. should use correct pricing for different tiers of the same tool

- **Covers:** Dynamic pricing lookup.
- Proves the engine references the correct `PRICING_DATA.md` tier (e.g., ChatGPT `"team"` vs `"plus"`).

---

#### 9. should not apply Credex discount if spend is exactly \$499

- **Covers:** Strict boundary conditions.
- Ensures the \$500 trigger is treated as an absolute threshold.

---

#### 10. should attempt to parse seats as numbers if passed as strings

- **Covers:** Type coercion.
- Adds a layer of defensiveness against malformed frontend payloads before Zod validation catches it.