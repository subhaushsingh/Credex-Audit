import { generateExecutiveSummary } from '../services/aiService.service.js';
import { calculateAudit } from '../services/auditService.service.js';
import { captureLead } from '../services/leadService.service.js';

export const generateAuditReport = async (req, res, next) => {
  try {
    const { subscriptions, email } = req.body;

    const auditResults = calculateAudit(subscriptions);
    const summary = await generateExecutiveSummary(auditResults);

    captureLead(email, auditResults, summary);

    return res.status(200).json({
      success: true,
      data: auditResults,
      executiveSummary: summary,
      meta: {
        generatedAt: new Date().toISOString(),
        engine: "llama-3.1-8b-instant",
        isEstimated: false
      }
    });
  } catch (error) {
    next(error);
  }
};
