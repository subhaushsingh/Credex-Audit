import { AppError } from '../utils/AppError.js';

export const globalErrorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        type: err.name,
        message: err.message,
        details: err.details || undefined,
      }
    });
  }

  console.error('UNEXPECTED ERROR:', err);

  return res.status(500).json({
    success: false,
    error: {
      type: 'ServerError',
      message: 'Something went critically wrong on our end.'
    }
  });
};
