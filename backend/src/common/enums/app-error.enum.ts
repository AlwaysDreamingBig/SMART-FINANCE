const enum AppErrorMessage {
    // Authentication Errors
    AUTH_EMAIL_ALREADY_EXISTS = "The email address is already registered.",
    AUTH_WRONG_PASSWORD = "The provided password or email is incorrect.",
    AUTH_EMAIL_NOT_VERIFIED = "Please verify your email before trying to login.",
    AUTH_TOKEN_ERROR = "Error signing the token.",
    AUTH_INVALID_TOKEN = "The provided token is invalid.",
    AUTH_USER_NOT_FOUND = "The user could not be found.",
    AUTH_NOT_FOUND = "Authentication information is missing.",
    AUTH_TOO_MANY_ATTEMPTS = "Too many login attempts. Please try again later.",
    AUTH_UNAUTHORIZED_ACCESS = "Unauthorized access. Please log in.",
    AUTH_TOKEN_NOT_FOUND = "No authentication token found.",
  
    // Access Control Errors
    ACCESS_FORBIDDEN = "You do not have permission to access this resource.",
    ACCESS_UNAUTHORIZED = "Authentication is required to access this resource.",
  
    // Validation and Resource Errors
    VALIDATION_ERROR = "There was a validation error with the provided data.",
    RESOURCE_NOT_FOUND = "The requested resource could not be found.",
  
    // System Errors
    INTERNAL_SERVER_ERROR = "An unexpected error occurred. Please try again later.",
    VERIFICATION_ERROR = "Verification failed. Please check your input.",
  }
  
  export { AppErrorMessage };  