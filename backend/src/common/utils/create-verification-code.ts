import { HTTPSTATUS } from "../../config/http.config";
import VerificationCodeModel from "../../database/models/verification.model";
import { throwAppError } from "../../middleware/errorHandler";
import { AppErrorMessage } from "../enums/app-error.enum";
import { VerificationEnum } from "../enums/verification-code.enum";
import { generateUniqueCode } from "./generates-code";


export class VerificationCodeService {
  // Function to create a new verification code
  static async createVerificationCode(userId: any, type: VerificationEnum): Promise<any> {
    // Generate a unique verification code (e.g., 6 digits alphanumeric)
    const code = generateUniqueCode(8);

    // Set expiration time (e.g., 15 minutes from now)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from current time

    try {
      // Create a new verification code document
      const verificationCode = new VerificationCodeModel({
        userId,
        code,
        type,
        expiresAt,
      });

      // Save the verification code to the database
      const savedVerificationCode = await verificationCode.save();

      // Return the saved verification code document (excluding sensitive information like the code)
      return {
        id: savedVerificationCode._id,
        userId: savedVerificationCode.userId,
        type: savedVerificationCode.type,
        expiresAt: savedVerificationCode.expiresAt,
        code: savedVerificationCode.code,
      };
    } catch (error) {
      // Handle any errors that occur during the save process
      throwAppError(AppErrorMessage.CREATE_CODE_ERROR, HTTPSTATUS.BAD_REQUEST);
    }
  }
}
