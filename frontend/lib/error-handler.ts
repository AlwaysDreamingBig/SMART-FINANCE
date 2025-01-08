type HttpError = {
  success: boolean;
  statusCode: number;
  message: string;
  error: string;
  stack: string;
};

export const extractHttpErrorMessage = (errorString: string): string => {
  try {
    // Find the start of the JSON part
    const jsonPartStart = errorString.indexOf("{");
    if (jsonPartStart === -1) {
      return "Error: JSON part not found in the error string";
    }

    // Extract the JSON part of the string
    const jsonString = errorString.substring(jsonPartStart);

    // Parse the JSON string into an object
    const errorObj: HttpError = JSON.parse(jsonString);

    // Check if the message field exists
    if (errorObj.message) {
      const message = errorObj.message;

      // Custom handling for password format errors
      if (message.includes("Password must include")) {
        return "Password format error: Please ensure your password meets all the required criteria.";
      }

      // Custom handling for password match errors
      if (message.includes("Passwords must match")) {
        return "Password mismatch: Please ensure both passwords are identical.";
      }

      return message; // Return the original message if no specific handling is required
    } else {
      return "Error: Message field not found in the JSON object";
    }
  } catch (error: unknown) {
    // Handle any parsing errors or missing message field
    if (error instanceof Error) {
      return `Error extracting message: ${error.message}`;
    }
    return "Unknown error occurred while extracting message";
  }
};
