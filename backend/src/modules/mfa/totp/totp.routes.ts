import express from 'express';
import { TotpController } from './totp.controller';
import { authenticateJWT } from '../../../common/strategies/jwt.stratety';

const totpRouter = express.Router();

// Route to generate QR code URL
totpRouter.get('/generate-qr', authenticateJWT, TotpController.generateQRCode);

// Route to verify OTP
totpRouter.post('/verify', authenticateJWT, TotpController.verifyToken);

export default totpRouter;
