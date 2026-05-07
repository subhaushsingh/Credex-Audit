import { calculateAudit } from '../services/auditService.service.js';

export const generateAuditReport = async (req, res, next) => {
  try {
    const { subscriptions } = req.body;

    const auditResults = calculateAudit(subscriptions);

    return res.status(200).json({
      success: true,
      data: auditResults
    });
  } catch (error) {
    next(error); 
  }
};
