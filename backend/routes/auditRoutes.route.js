import express from 'express';
import { generateAuditReport } from '../controllers/auditController.controller.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { auditRequestSchema } from '../validations/auditSchema.js';

const router = express.Router();

router.post(
  '/calculate',
  validateRequest(auditRequestSchema),
  generateAuditReport
);

export default router;
