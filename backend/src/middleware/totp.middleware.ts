import { Request, Response, NextFunction } from 'express';
import { throwAppError } from './errorHandler';
import { UserService } from '../modules/user/user.service';
import { AppErrorMessage } from '../common/enums/app-error.enum';
import { HTTPSTATUS } from '../config/http.config';


// Middleware to ensure TOTP is verified for sensitive routes
export const isTotpVerified = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        const result = await UserService.findUserById(userId);
      
        const User = result?.user;

        const MFAenable = User?.userPreferences.enable2FA;

        if (!MFAenable) {
            throwAppError(AppErrorMessage.MFA_DISABLED, HTTPSTATUS.FORBIDDEN);
        }
      
        const totpVerified = User?.userPreferences.totp.isTotpVerified;
      
        if (!totpVerified) {
          throwAppError(AppErrorMessage.TOTP_VERIFICATION_FAIL, HTTPSTATUS.FORBIDDEN);
        }
      
        next();
    } catch (error) {
        next(error);
    }
};