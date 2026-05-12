import { z } from 'zod';
import { AI_PRICING } from '../utils/pricingData.js';

const validTools = Object.keys(AI_PRICING);

export const subscriptionItemSchema = z.object({
  tool: z.string().refine((val) => validTools.includes(val), {
    message: `Invalid tool. Must be one of: ${validTools.join(', ')}`
  }),
  tier: z.string().min(1, "Tier is required").max(50),
  seats: z.coerce.number().int().positive("Seats must be a positive integer of 1 or more")
});

export const auditRequestSchema = z.object({
  subscriptions: z.array(subscriptionItemSchema)
    .min(1, "You must submit at least one active subscription to run an audit.")
});

export const leadCaptureSchema = z.object({
  auditId: z.string({ required_error: "Audit ID is required" }),
  email: z.string().email("Invalid email address"),
  auditResults: z.any(), 
  executiveSummary: z.string().optional()
});