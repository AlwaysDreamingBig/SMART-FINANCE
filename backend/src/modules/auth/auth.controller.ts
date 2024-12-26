import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { HTTPSTATUS } from "../../config/http.config";
import { VerificationCodeService } from "../../common/utils/create-verification-code";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.register(req.body); // Register user
      res.status(HTTPSTATUS.CREATED).json({
        message: "User registered successfully",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      next(error); // Pass error to the error handler middleware
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      // Extract login data from request body and headers
      const { email, password, role } = req.body; // Include role if necessary
      const userAgent = req.headers["user-agent"];

      // Call AuthService login with userData as a single object
      const result = await AuthService.login({ email, password, role, userAgent });

      if (result){
        // Create cookie with accessToken
        switch (result.user.__t) {
          case "Administrators":
            res.cookie("adminRefreshToken", result.refreshToken, { httpOnly: true, secure: true, sameSite: "strict", path: "/", });
            break;
          case "Managers":
            res.cookie("managerRefreshToken", result.refreshToken, { httpOnly: true, secure: true, sameSite: "strict", path: "/", });
            break;
          case "Developers":
            res.cookie("developerRefreshToken", result.refreshToken, { httpOnly: true, secure: true, sameSite: "strict", path: "/", });
            break;
          case "Clients":
            res.cookie("clientRefreshToken", result.refreshToken, { httpOnly: true, secure: true, sameSite: "strict", path: "/", });
            break;
          default:
            res.cookie("refreshToken", result.refreshToken, { httpOnly: true, secure: true, sameSite: "strict", path: "/", });
        }
        
        // Respond with success message and tokens
        res.status(HTTPSTATUS.OK).json({
          message: "Login successful",
          user: result.user,
          tokens: {
            accessToken: result.accessToken,
            //refreshToken: result.refreshToken,
          },
        });
      }
    } catch (error) {
      next(error); // Pass error to error handler middleware
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      // Extract login data from request body and headers
      const { token, type } = req.body; 

      // Call AuthService
      const result = await AuthService.refreshToken(token, type);

      if (result){
        // Respond with success message and tokens
        res.status(HTTPSTATUS.OK).json({
          message: "New Tokens were created successfully!",
          result: result
        });
      }
    } catch (error) {
      next(error); // Pass error to error handler middleware
    }
  }

  static async verifyEmail(req: Request, res: Response, next: NextFunction) {

    try {
      // Extract login data from request body and headers
      const { code } = req.body; 

      // Call AuthService
      const result = await AuthService.verifyEmail(code);

      if (result){
        // Respond with success message and tokens
        res.status(HTTPSTATUS.OK).json({
          message: "Email verification successful!",
          result: result
        });
      }
    } catch (error) {
      next(error); // Pass error to error handler middleware
    }
  }

  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      // Extract data from request body and headers
      const { email } = req.body; 

      // Call AuthService
      const result = await AuthService.forgotPassword(email);

      if (result){
        // Respond with success message and tokens
        res.status(HTTPSTATUS.OK).json({
          message: "Verification Link sent successfully!",
          result: result
        });
      }
    } catch (error) {
      next(error); // Pass error to error handler middleware
    }
  }
  static async TEST(req: Request, res: Response, next: NextFunction) {
    try {
      // Extract data from request body and headers
      const { userId, type } = req.body; 

      // Call AuthService
      const result = await VerificationCodeService.createVerificationCode(userId, type);

      if (result){
        // Respond with success message and tokens
        res.status(HTTPSTATUS.OK).json({
          message: "Verification Code created successfully!",
          result: result
        });
      }
    } catch (error) {
      next(error); // Pass error to error handler middleware
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      // Extract login data from request body and headers
      const { token, newPassword } = req.body; 

      // Call AuthService
      const result = await AuthService.resetPassword(token, newPassword);

      if (result){
        // Respond with success message and tokens
        res.status(HTTPSTATUS.OK).json({
          message: "Password reset successful!",
          result: result
        });
      }
    } catch (error) {
      next(error); // Pass error to error handler middleware
    }
  }
}
