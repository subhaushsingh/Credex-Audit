import { describe, it, expect } from '@jest/globals';
import { calculateAudit } from '../services/auditService.service.js';

describe('Audit Engine Core Logic', () => {

  // TEST 1
  it('should accurately calculate total spend with no redundancies', () => {
    const mockInput = [{ tool: 'chatgpt', tier: 'plus', seats: 1 }];
    const result = calculateAudit(mockInput);
    expect(result.summary.totalCurrentSpend).toBe(20);
    expect(result.summary.optimizedMonthlySpend).toBe(20);
    expect(result.credexOffer.eligible).toBe(false);
  });

  // TEST 2
  it('should detect redundant General LLMs and flag the cheaper one as waste', () => {
    const mockInput = [
      { tool: 'chatgpt', tier: 'plus', seats: 1 },
      { tool: 'claude', tier: 'pro', seats: 1 }
    ];

    const result = calculateAudit(mockInput);

    expect(result.summary.totalCurrentSpend).toBe(40);
    expect(result.flags.redundancies.length).toBe(1);
    expect(result.summary.optimizedMonthlySpend).toBe(20);
  });

  // TEST 3
  it('should explicitly flag GitHub Copilot as redundant if Cursor is present', () => {
    const mockInput = [
      { tool: 'cursor', tier: 'pro', seats: 1 },
      { tool: 'github_copilot', tier: 'individual', seats: 1 }
    ];

    const result = calculateAudit(mockInput);

    expect(result.flags.optimizations.length).toBe(1);
    expect(result.flags.optimizations[0].potentialSavings).toBe(10);
    expect(result.summary.optimizedMonthlySpend).toBe(20);
  });

  // TEST 4
  it('should apply a 30% Credex discount when initial spend exceeds $500', () => {
    const mockInput = [{ tool: 'chatgpt', tier: 'team', seats: 20 }];

    const result = calculateAudit(mockInput);

    expect(result.summary.totalCurrentSpend).toBe(600);
    expect(result.credexOffer.eligible).toBe(true);
    expect(result.credexOffer.discountPercentage).toBe(30);
    expect(result.credexOffer.estimatedMonthlyWithCredex).toBe(420);
  });

  // TEST 5
  it('should handle an empty array gracefully without crashing', () => {
    const mockInput = [];

    const result = calculateAudit(mockInput);

    expect(result.summary.totalCurrentSpend).toBe(0);
    expect(result.summary.optimizedMonthlySpend).toBe(0);
    expect(result.flags.redundancies.length).toBe(0);
  });

  // TEST 6
  it('should calculate redundancies proportional to the number of seats', () => {
    const mockInput = [
      { tool: 'chatgpt', tier: 'plus', seats: 10 }, // $200
      { tool: 'claude', tier: 'pro', seats: 10 }    // $200
    ];

    const result = calculateAudit(mockInput);

    expect(result.summary.totalCurrentSpend).toBe(400);
    expect(result.summary.optimizedMonthlySpend).toBe(200);
    expect(result.flags.redundancies[0].potentialSavings).toBe(200);
  });

  // TEST 7
  it('should handle triple redundancies in the same category', () => {
    const mockInput = [
      { tool: 'chatgpt', tier: 'plus', seats: 1 },
      { tool: 'claude', tier: 'pro', seats: 1 },
      { tool: 'gemini', tier: 'pro', seats: 1 }
    ];

    expect(result.summary.totalCurrentSpend).toBe(59.99);
    expect(result.summary.optimizedMonthlySpend).toBe(19.99);
    expect(result.flags.redundancies.length).toBe(2);

    expect(result.summary.totalCurrentSpend).toBe(60);
    expect(result.summary.optimizedMonthlySpend).toBe(20);
    expect(result.flags.redundancies.length).toBe(2);
  });

  // TEST 8
  it('should use correct pricing for different tiers of the same tool', () => {
    const mockInput = [{ tool: 'chatgpt', tier: 'pro', seats: 1 }];  // $100

    expect(result.summary.totalCurrentSpend).toBe(100);
  });

  // TEST 9
  it('should not apply Credex discount if spend is exactly $499', () => {
    const mockInput = [
      { tool: 'chatgpt', tier: 'team', seats: 16 },
      { tool: 'github_copilot', tier: 'business', seats: 1 }
    ];

    const result = calculateAudit(mockInput);
    expect(result.summary.totalCurrentSpend).toBe(499);
    expect(result.credexOffer.eligible).toBe(false);
  });

  // TEST 10
  it('should attempt to parse seats as numbers if passed as strings', () => {
    const mockInput = [{ tool: 'chatgpt', tier: 'plus', seats: "5" }];

    const result = calculateAudit(mockInput);
    expect(result.summary.totalCurrentSpend).toBe(100);
  });

});
