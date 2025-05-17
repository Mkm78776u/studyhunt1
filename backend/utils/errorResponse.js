/**
 * Custom error class for API responses
 */
export default class ErrorResponse extends Error {
  /**
   * @param {string} message Error message
   * @param {number} statusCode HTTP status code
   * @param {object} details Additional error details
   */
  constructor(message, statusCode, details = {}) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Format error for API response
   */
  toJSON() {
    return {
      success: false,
      error: this.message,
      ...(Object.keys(this.details).length > 0 && { details: this.details }),
      stack: process.env.NODE_ENV === 'development' ? this.stack : undefined
    };
  }
}se;