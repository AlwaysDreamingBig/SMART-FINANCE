import express from 'express';
import { mailController } from './mail.controller';

const mailRouter = express.Router();

mailRouter.post('/send-verification', mailController.sendVerificationEmail);

export const mailRodule = mailRouter;
