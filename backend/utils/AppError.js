export class AppError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message)
    this.name = "AppError"
    this.statusCode = statusCode
    this.details = details      
    this.isOperational = true   
  }

  // 400 - Bad Request
  static badRequest(message, details = null) {
    return new AppError(message, 400, details)
  }

  // 401 - Unauthenticated
  static unauthorized(message = "Authentication required") {
    return new AppError(message, 401)
  }

  // 403 - Authenticated but not allowed
  static forbidden(message = "Access denied") {
    return new AppError(message, 403)
  }

  // 404 - Not found
  static notFound(message = "Resource not found") {
    return new AppError(message, 404)
  }

  // 409 - Conflict
  static conflict(message = "Resource already exists") {
    return new AppError(message, 409)
  }

  // 422 - Validation failed
  static validationError(message, details = null) {
    return new AppError(message, 422, details)
  }

  // 500 - Internal server error
  static internal(message = "Internal server error") {
    return new AppError(message, 500)
  }
}