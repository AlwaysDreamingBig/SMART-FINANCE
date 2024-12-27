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
    AUTH_USER_UPDATE_FAILED = "Cannot update user's permission level.",
    AUTH_INSUFFICIENT_PERMISSIONS = "You do not have the necessary permission level!",
    AUTH_UPDATER_LEVEL_TOO_LOW = "Updater's permission level too low",
  
    // Validation and Resource Errors
    VALIDATION_ERROR = "There was a validation error with the provided data.",
    RESOURCE_NOT_FOUND = "The requested resource could not be found.",
    VERIF_EMAIL_CODE_ERROR = "The given code does not exist or is not valid anymore",
    USER_UPDATE_ERROR = "Cannot update the user properties.",
  
    // System Errors
    INTERNAL_SERVER_ERROR = "An unexpected error occurred. Please try again later.",
    VERIFICATION_ERROR = "Verification failed. Please check your input.",
    CREATE_CODE_ERROR = "An error occured when generating the verification code",

    // Password Reset errors
    TOKEN_NOT_FOUND = "The reset password link has expired or is not valid anymore.",
    USER_PASSWORD_UPDATE_ERROR = "Cannot update the user password.",

    // Session
    SESSION_NOT_FOUND = "Session not found",

    //MFA
    GENERATE_QR_ERROR = "Failed to generate QR code URL",
    IVALID_OTP = "Invalid OTP",
    MFA_DISABLED = "TOTP verification required",
    TOTP_VERIFICATION_FAIL = "TOTP verification required",

  }
  
  export { AppErrorMessage };  