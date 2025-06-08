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

  // Plaid
  FUNDING_ERROR = "Funding source Url does not exist",
  CREATE_BANK_ERROR = "Cannot create new bank account.",

  // Dwolla
  GET_ENV_ERROR = "Dwolla environment should either be set to `sandbox` or `production`",
  CREATE_FUND_ERR = "Creating a Funding Source Failed",
  CREATE_ON_DEMAND_AUTH_ERR = "Creating an On Demand Authorization Failed",
  CREATE_CUSTOMER_ERR = "Creating customer operation Failed",
  CREATE_TRANSFER_ERR = "Create transfer operation Failed",
  ADD_FUNDING_SOURCE_ERR = "Failed to add funding source. Please check the provided details and try again.",
  GET_CUSTOMER_ERR = "Failed to retrieve customer details. Ensure the customer ID is correct.",
  UPDATE_CUSTOMER_ERR = "Failed to update customer information. Please verify the provided data.",
  SUSPEND_CUSTOMER_ERR = "Failed to suspend customer account. The account may not be eligible for suspension.",
  GET_FUNDING_SOURCE_ERR = "Failed to retrieve funding source details. Verify the funding source ID.",
  REMOVE_FUNDING_SOURCE_ERR = "Failed to remove funding source. Ensure it is not currently in use.",
  INIT_MICRODEPOSITS_ERR = "Failed to initiate micro-deposits for verification. Please try again later.",
  GET_TRANSFER_ERR = "Failed to retrieve transfer details. Ensure the transfer ID is valid.",
  LIST_TRANSFERS_ERR = "Failed to fetch transfer history. Try again later.",
  CANCEL_TRANSFER_ERR = "Failed to cancel transfer. It may have already been processed.",
  CREATE_WEBHOOK_ERR = "Failed to create webhook. Ensure the provided URL is valid.",
  LIST_WEBHOOKS_ERR = "Failed to retrieve webhook list. Please try again later.",
  CREATE_REFUND_ERR = "Failed to process refund. Ensure the transaction is eligible for a refund.",
  GET_BALANCE_ERR = "Failed to retrieve account balance. Try again later.",
  VERIFY_CUSTOMER_ERR = "Failed to verify customer identity. Ensure the provided information is accurate.",
  VERIFY_MICRODEPOSITS_ERR = "Failed to verify micro-deposits. Please ensure the amounts entered are correct and try again.",
  PROCESS_WEBHOOK_ERR = "Failed to process webhook. Ensure the payload is valid and the event type is supported.",
  VERIFY_SIGNATURE_ERR = "Signature verification failed",

  // Truelayer
  TRUELAYER_INIT_AUTH_ERR = "Failed to initiate auth flow",
  TRUELAYER_CALLBACK_ERR = "TrueLayer callback error",
  TRUELAYER_INVALID_CODE = "Invalid authorization code",
  TRUELAYER_FAIL_CALLBACK = "Failed to handle callback",
  TRUELAYER_FAIL_REFRESH = "Failed to refresh token",
  TRUELAYER_FAIL_REAUTH = "Failed to start reauthentication",
  TRUELAYER_NO_ACC_ID = "Account ID is required",
  TRUELAYER_FAIL_DISC = "Failed to disconnect account",
  TRUELAYER_FAIL_STATUS = "Failed to check token status",

  UNAUTHORIZED = "Unauthorized",
}

export { AppErrorMessage };
