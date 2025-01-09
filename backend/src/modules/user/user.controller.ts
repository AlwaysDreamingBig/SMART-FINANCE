import { NextFunction, Request, Response } from "express";
import { HTTPSTATUS } from "../../config/http.config";
import { TotpService } from "../mfa/totp/totp.service";
import { UserService } from "./user.service";

class UserController {
  async enableTOTP(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { userId, enable } = req.body;

    try {
      if (enable) {
        await UserService.enableMfa(userId, enable);
      }

      const session = await TotpService.enableTOTP(userId, enable);
      res.status(HTTPSTATUS.CREATED).json({
        message: "OTP modification successful.",
        result: session,
      });
    } catch (error) {
      next(error);
    }
  }

  async enableMfa(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { userId, enable } = req.body;

    try {
      const session = await UserService.enableMfa(userId, enable);
      res.status(HTTPSTATUS.CREATED).json({
        message: "MFA modification successful.",
        result: session,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
