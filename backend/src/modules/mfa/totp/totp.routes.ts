import express from "express";
import { TotpController } from "./totp.controller";
import { authenticateJWT } from "../../../common/strategies/jwt.stratety";
import {
  isTotpEnabledd,
  isTotpVerified,
} from "../../../middleware/totp.middleware";

const totpRouter = express.Router();

// Route to generate QR code URL
totpRouter.get(
  "/generate-qr/:userId",
  authenticateJWT,
  isTotpEnabledd,
  TotpController.generateQRCode
);

// Route to verify OTP
totpRouter.post(
  "/verify/:userId",
  authenticateJWT,
  isTotpEnabledd,
  TotpController.verifyToken
);

export default totpRouter;
