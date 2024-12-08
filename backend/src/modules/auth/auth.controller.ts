import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { HTTPSTATUS } from "../../config/http.config";

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
        // Respond with success message and tokens
        res.status(HTTPSTATUS.OK).json({
          message: "Login successful",
          user: result.user,
          tokens: {
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
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
      const { token } = req.body; 

      // Call AuthService
      const result = await AuthService.refreshToken(token);

      if (result){
        // Respond with success message and tokens
        res.status(HTTPSTATUS.OK).json({
          message: "New  Tokens were created successfully!",
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
}
