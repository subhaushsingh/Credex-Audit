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

});
