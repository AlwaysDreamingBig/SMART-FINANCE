import { NextFunction, Request, Response } from "express";
import { throwAppError } from "../../../middleware/errorHandler";
import { AppErrorMessage } from "../../../common/enums/app-error.enum";
import { HTTPSTATUS } from "../../../config/http.config";
import ConnectivityService from "../services/connectivity.service";
import { UserService } from "../../user/user.service";

export class ConnectivityController {
  /**
   * Initiates the TrueLayer authentication flow
   */
  static async initiateAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      if (!userId) {
        throwAppError(AppErrorMessage.UNAUTHORIZED, HTTPSTATUS.UNAUTHORIZED);
      }

      const result = await ConnectivityService.initiateBankAuthFlow(userId);
      res.redirect(result.authUrl);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles the callback from TrueLayer after authentication
   */
  static async handleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { code, error: callbackError } = req.query;

      if (!userId) {
        throwAppError(AppErrorMessage.UNAUTHORIZED, HTTPSTATUS.UNAUTHORIZED);
      }

      if (callbackError) {
        throwAppError(
          `TrueLayer callback error: ${callbackError}`,
          HTTPSTATUS.BAD_REQUEST
        );
      }

      if (typeof code !== "string") {
        throwAppError("Invalid authorization code", HTTPSTATUS.BAD_REQUEST);
      }

      const response = await ConnectivityService.exchangeCodeForToken(
        code as string,
        userId
      );

      // Update user connection status
      const userResult = await UserService.findUserById(userId);
      if (userResult?.user) {
        userResult.user.truelayerConnected = true;
        await userResult.user.save();
      }

      res.status(HTTPSTATUS.OK).json(response.token);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Refreshes the access token
   */
  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      if (!userId) {
        throwAppError(AppErrorMessage.UNAUTHORIZED, HTTPSTATUS.UNAUTHORIZED);
      }

      const result = await ConnectivityService.refreshAccessToken(userId);
      res.status(HTTPSTATUS.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Checks token status
   */
  static async checkTokenStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.params;
      if (!userId) {
        throwAppError(AppErrorMessage.UNAUTHORIZED, HTTPSTATUS.UNAUTHORIZED);
      }

      const isExpired = await ConnectivityService.isTokenExpired(userId);
      res.status(HTTPSTATUS.OK).json({ isExpired });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles reauthorization for expired connections
   */
  static async reauthenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      if (!userId) {
        throwAppError(AppErrorMessage.UNAUTHORIZED, HTTPSTATUS.UNAUTHORIZED);
      }

      const result =
        await ConnectivityService.reauthorizeExpiredConnection(userId);
      res.redirect(result.reauthUrl);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Disconnects a linked account
   */
  static async disconnectAccount(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.params;

      if (!userId) {
        throwAppError(AppErrorMessage.UNAUTHORIZED, HTTPSTATUS.UNAUTHORIZED);
      }

      const result = await ConnectivityService.disconnectLinkedAccount(userId);

      // Update user connection status
      const userResult = await UserService.findUserById(userId);
      if (userResult?.user) {
        userResult.user.truelayerConnected = false;
        await userResult.user.save();
      }

      res.status(HTTPSTATUS.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}
