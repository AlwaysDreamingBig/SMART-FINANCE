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
}
