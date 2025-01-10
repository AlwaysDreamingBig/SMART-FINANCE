import { NextFunction, Request, Response } from "express";
import { mailService } from "./mail.service";
import { HTTPSTATUS } from "../config/http.config";
import { throwAppError } from "../middleware/errorHandler";
import { UserService } from "../modules/user/user.service";
import { VerificationCodeService } from "../common/utils/create-verification-code";
import { VerificationEnum } from "../common/enums/verification-code.enum";

class MailController {
  async sendVerificationEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      // Validate email input
      if (!email) {
        throwAppError("Email is required.", HTTPSTATUS.BAD_REQUEST);
      }

      // Fetch the user by email
      const responseData = await UserService.findUserByEmail(email);
      if (!responseData || !responseData.user) {
        throwAppError(
          "Cannot fetch user to send verification email.",
          HTTPSTATUS.NOT_FOUND
        );
      }

      const userId = responseData?.user?._id;

      // Generate a verification code
      const verification = await VerificationCodeService.createVerificationCode(
        userId,
        VerificationEnum.EMAIL_VERIFICATION
      );
      if (!verification || !verification.code) {
        throwAppError(
          "Failed to generate verification code.",
          HTTPSTATUS.INTERNAL_SERVER_ERROR
        );
      }

      // Send the verification email
      await mailService.sendVerificationEmail(email, verification.code);

      // Respond with success
      res.status(200).json({
        message: "Verification email sent successfully",
      });
    } catch (error) {
      // Pass the error to the error-handling middleware
      next(error);
    }
  }

  async sendResetPasswordEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, ResetLink } = req.body;

      if (!email || !ResetLink) {
        res
          .status(400)
          .json({ message: "Email and verification link are required" });
        return;
      }

      // Fetch the user by email
      const responseData = await UserService.findUserByEmail(email);
      if (!responseData || !responseData.user) {
        throwAppError(
          "Cannot fetch user to send verification email.",
          HTTPSTATUS.NOT_FOUND
        );
      }

      await mailService.sendResetPasswordEmail(email, ResetLink);
      res.status(200).json({ message: "Reset link sent successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export const mailController = new MailController();
