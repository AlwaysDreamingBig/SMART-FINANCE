import { NextFunction, Request, Response } from 'express';
import { throwAppError } from '../../../middleware/errorHandler';
import { AppErrorMessage } from '../../../common/enums/app-error.enum';
import { HTTPSTATUS } from '../../../config/http.config';
import { TotpService } from './totp.service';
import QRCode from 'qrcode';

export class TotpController {
  /**
   * Generate a QR code URL for the user to configure their Google Authenticator.
   */
  static async generateQRCode(req: Request, res: Response, next: NextFunction) {
    try {
      const {userId} = req.body;

      const qrCodeURL = await TotpService.generateQRCodeURL(userId);
      
      if (!qrCodeURL) {
        throwAppError(AppErrorMessage.GENERATE_QR_ERROR, HTTPSTATUS.INTERNAL_SERVER_ERROR);
      }

      res.status(HTTPSTATUS.OK).json({ result: qrCodeURL });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Verify the OTP entered by the user.
   */
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, userId } = req.body;

      const isValid = await TotpService.verifyOTP(userId, token);

      if (!isValid) {
        throwAppError(AppErrorMessage.IVALID_OTP, HTTPSTATUS.BAD_REQUEST);
      }

      res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
      next(error);
    }
  }
}
