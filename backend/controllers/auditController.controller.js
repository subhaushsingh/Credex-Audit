import { generateExecutiveSummary } from '../services/aiService.service.js';
import { calculateAudit, saveAnonymousAudit } from '../services/auditService.service.js';
import { captureLead } from '../services/leadService.service.js';
import { supabase } from '../services/leadService.service.js';

export const generateAuditReport = async (req, res, next) => {
  try {
    const { subscriptions } = req.body;

    const auditResults = calculateAudit(subscriptions);
    const summary = await generateExecutiveSummary(auditResults);
    const auditId = await saveAnonymousAudit(auditResults, summary);

    return res.status(200).json({
      success: true,
      auditId: auditId,
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

export const captureEmailLead = async (req, res, next) => {
  try {
    const { auditId, email, auditResults, executiveSummary } = req.body;

    if (!auditId || !email) {
      return res.status(400).json({ 
        success: false, 
        message: "auditId and email are required" 
      });
    }

    captureLead(auditId, email, auditResults, executiveSummary).catch(err =>
      console.error('[Lead Capture Failed--from captureEmailLead]', err.message)
    );

    return res.status(200).json({
      success: true,
      message: "Lead captured and report emailed successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicAudit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('leads').select('*').eq('id', id).single();
    
    if (error || !data) return res.status(404).json({ success: false, message: "Audit not found" });
    
    return res.status(200).json({ 
      success: true, 
      data: data.audit_payload, 
      executiveSummary: data.executive_summary 
    });
  } catch (error) {
    next(error);
  }
};