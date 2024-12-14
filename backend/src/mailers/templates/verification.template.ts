export const getVerificationEmailTemplate = (verificationCode: string): string => `
<html>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <table style="width: 100%; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
      <tr>
        <td style="text-align: center;">
          <h2 style="color: #333;">Email Verification</h2>
        </td>
      </tr>
      <tr>
        <td>
          <p style="color: #555; line-height: 1.5;">
            Thank you for signing up! Please use the following code to verify your email:
          </p>
          <p style="text-align: center; font-size: 24px; font-weight: bold; color: #333;">
            ${verificationCode}
          </p>
          <p style="color: #555; line-height: 1.5;">
            If you did not request this email, please ignore it.
          </p>
        </td>
      </tr>
      <tr>
        <td style="text-align: center; padding-top: 20px;">
          <small style="color: #888;">© 2024 [Your App Name]. All rights reserved.</small>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
