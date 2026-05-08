import { ZodError } from 'zod';
import { AppError } from '../utils/AppError.js';

export const validateRequest = (schema) => (req, res, next) => {
  if (!schema) {
    console.error("CRITICAL: No schema passed to validateRequest middleware!");
    return next(new Error("Internal Server Error: Missing validation schema"));
  }

  try {
    schema.parse(req.body); 
    next();
  } catch (error) {
    console.error("Validation Catch Block hit:", error.name, error.message);

    if (error instanceof ZodError) {
      const issues = error.issues ?? error.errors ?? []; 
      const formattedErrors = issues.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      return next(AppError.validationError("Invalid audit request data", formattedErrors));
    }

    next(error);
  }
};
