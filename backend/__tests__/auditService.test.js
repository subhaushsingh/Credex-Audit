import { describe, it, expect, jest } from '@jest/globals';

// Mock env
process.env.SUPABASE_URL = 'https://mock-supabase-url.com';
process.env.SUPABASE_SERVICE_KEY = 'mock-service-key';

// Mock leadService before any imports
jest.unstable_mockModule('../services/leadService.service.js', () => ({
  captureLead: jest.fn(),
  supabase: {},
}));

// Dynamically import the service AFTER the env vars are set
const { calculateAudit } = await import('../services/auditService.service.js');

describe('Audit Engine Core Logic', () => {

  it('should accurately calculate total spend with no redundancies', () => {
    const mockInput = [{ tool: 'chatgpt', tier: 'plus', seats: 1 }];
    const result = calculateAudit(mockInput);
    expect(result.summary.totalCurrentSpend).toBe(20);
    expect(result.summary.optimizedMonthlySpend).toBe(20);
    expect(result.credexOffer.eligible).toBe(false);
  });

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

  it('should apply a 30% Credex discount when initial spend exceeds $500', () => {
    const mockInput = [{ tool: 'chatgpt', tier: 'team', seats: 20 }];
    const result = calculateAudit(mockInput);
    expect(result.summary.totalCurrentSpend).toBe(600);
    expect(result.credexOffer.eligible).toBe(true);
    expect(result.credexOffer.discountPercentage).toBe(30);
    expect(result.credexOffer.estimatedMonthlyWithCredex).toBe(420);
  });

  it('should handle an empty array gracefully without crashing', () => {
    const mockInput = [];
    const result = calculateAudit(mockInput);
    expect(result.summary.totalCurrentSpend).toBe(0);
    expect(result.summary.optimizedMonthlySpend).toBe(0);
    expect(result.flags.redundancies.length).toBe(0);
  });

  it('should calculate redundancies proportional to the number of seats', () => {
    const mockInput = [
      { tool: 'chatgpt', tier: 'plus', seats: 10 },
      { tool: 'claude', tier: 'pro', seats: 10 }
    ];
    const result = calculateAudit(mockInput);
    expect(result.summary.totalCurrentSpend).toBe(400);
    expect(result.summary.optimizedMonthlySpend).toBe(200);
    expect(result.flags.redundancies[0].potentialSavings).toBe(200);
  });

  it('should handle triple redundancies in the same category', () => {
    const mockInput = [
      { tool: 'chatgpt', tier: 'plus', seats: 1 },
      { tool: 'claude', tier: 'pro', seats: 1 },
      { tool: 'chatgpt', tier: 'plus', seats: 1 }
    ];
    const result = calculateAudit(mockInput);
    expect(result.summary.totalCurrentSpend).toBe(60); 
    expect(result.summary.optimizedMonthlySpend).toBe(20);
    expect(result.flags.redundancies.length).toBe(2);
  });

  it('should use correct pricing for different tiers of the same tool', () => {
    const mockInput = [{ tool: 'chatgpt', tier: 'team', seats: 1 }]; 
    const result = calculateAudit(mockInput);
    expect(result.summary.totalCurrentSpend).toBe(30);
  });

  it('should not apply Credex discount if spend is exactly $499', () => {
    const mockInput = [
      { tool: 'chatgpt', tier: 'team', seats: 16 },
      { tool: 'github_copilot', tier: 'business', seats: 1 }
    ];
    const result = calculateAudit(mockInput);
    expect(result.summary.totalCurrentSpend).toBe(499);
    expect(result.credexOffer.eligible).toBe(false);
  });

  it('should attempt to parse seats as numbers if passed as strings', () => {
    const mockInput = [{ tool: 'chatgpt', tier: 'plus', seats: "5" }];
    const result = calculateAudit(mockInput);
    expect(result.summary.totalCurrentSpend).toBe(100);
  });

});