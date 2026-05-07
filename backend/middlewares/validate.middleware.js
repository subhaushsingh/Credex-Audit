export const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); 
    next();
  } catch (error) {
    const formattedErrors = error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));

    next(AppError.validationError("Invalid audit request data", formattedErrors));
  }
};
