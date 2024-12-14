import { Request, Response } from 'express';
import { mailService } from './mail.service';

class MailController {
  async sendVerificationEmail(req: Request, res: Response): Promise<void> {
    const { email, verificationCode } = req.body;

    if (!email || !verificationCode) {
      res.status(400).json({ message: 'Email and verification code are required' });
      return;
    }

    try {
      await mailService.sendVerificationEmail(email, verificationCode);
      res.status(200).json({ message: 'Verification email sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send verification email' });
    }
  }

  async sendResetPasswordEmail(req: Request, res: Response): Promise<void> {
    const { email, ResetLink } = req.body;

    if (!email || !ResetLink) {
      res.status(400).json({ message: 'Email and verification link are required' });
      return;
    }

    try {
      await mailService.sendResetPasswordEmail(email, ResetLink);
      res.status(200).json({ message: 'Verification email sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send verification email' });
    }
  }
}

export const mailController = new MailController();
