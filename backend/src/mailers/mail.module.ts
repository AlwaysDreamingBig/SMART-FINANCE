import express from 'express';
import { mailController } from './mail.controller';

const mailRouter = express.Router();

mailRouter.post('/send-verification', mailController.sendVerificationEmail);
mailRouter.post('/send-resetlink', mailController.sendResetPasswordEmail);

export const mailRodule = mailRouter;
