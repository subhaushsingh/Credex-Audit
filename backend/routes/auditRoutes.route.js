import express from 'express';
import { generateAuditReport, captureEmailLead, getPublicAudit } from '../controllers/auditController.controller.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { auditRequestSchema, leadCaptureSchema } from '../validations/auditSchema.js';

const router = express.Router();

router.post(
  '/calculate',
  validateRequest(auditRequestSchema),
  generateAuditReport
);

router.post(
  '/capture-lead',
  validateRequest(leadCaptureSchema),
  captureEmailLead
);

router.get('/:id', getPublicAudit);

export default router;