import nodemailer from 'nodemailer';
import { getVerificationEmailTemplate } from './templates/verification.template';
import { config } from '../config/app.config';
import { getForgotPasswordTemplate } from './templates/forgot-password.template';

class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail', // email provider
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS,
    },
  });

  async sendVerificationEmail(to: string, verificationCode: string): Promise<void> {
    const htmlTemplate = getVerificationEmailTemplate(verificationCode);

    const mailOptions = {
      from: `"Smart Finance" <${config.EMAIL_USER}>`,
      to,
      subject: 'Email Verification',
      html: htmlTemplate,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Verification email sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Could not send email');
    }
  }

  async sendResetPasswordEmail(to: string, ResetLink: string): Promise<void> {
    const htmlTemplate = getForgotPasswordTemplate(ResetLink);

    const mailOptions = {
      from: `"Smart Finance" <${config.EMAIL_USER}>`,
      to,
      subject: 'Password Reset',
      html: htmlTemplate,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Reset password email sent to ${to}`);

    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Could not send email');
    }
  }
}

export const mailService = new MailService();
