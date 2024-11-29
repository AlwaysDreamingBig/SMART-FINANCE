import { Request, Response, NextFunction } from 'express';
import { HTTPSTATUS } from '../config/http.config';

// Custom error types
class CustomHttpError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

// Custom error types
class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

// Middleware to handle errors
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Set default to internal server error
  let statusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR;
  let message = 'Something went wrong.';

  // Check for custom error type
  if (err instanceof CustomHttpError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.name === 'ValidationError') {
    statusCode = HTTPSTATUS.BAD_REQUEST;
    message = 'Invalid request data.';
  } else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    statusCode = HTTPSTATUS.UNAUTHORIZED;
    message = 'Unauthorized access or token expired.';
  } else if (err.name === 'SyntaxError' && err.status === 400) {
    statusCode = HTTPSTATUS.BAD_REQUEST;
    message = 'Bad JSON syntax in the request body.';
  }

  // Log the error (can be adjusted for logging frameworks)
  console.error(err);

  // Send the error response to the client
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message,
    error: err.name || 'UnknownError',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Show stack trace in development
  });
};

// CustomError for throwing specific errors
export const throwHttpError = (message: string, statusCode: number) => {
  throw new CustomHttpError(message, statusCode);
};

export const throwAppError = (message: string, statusCode: number) => {
  throw new AppError(message, statusCode);
};
