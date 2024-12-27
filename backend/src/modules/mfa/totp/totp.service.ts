import { authenticator } from 'otplib'; // Use authenticator for generating secrets
import { UserService } from '../../user/user.service';
import { decryptSecret, encryptSecret } from '../../../common/utils/crypto';
import { throwAppError } from '../../../middleware/errorHandler';

// Set global options for TOTP generation (you can adjust these if needed)
authenticator.options = {
  digits: 6, // OTP length (6 digits is standard)
  step: 30,  // Time step in seconds (default is 30)
  window: 1, // Allowed window for OTP verification (default is 1)
};

export class TotpService {

  /**
   * Generate a new TOTP secret for the user.
   * @returns {string} - The generated secret
   */
  static generateSecret(): string {
    return authenticator.generateSecret(); // Use authenticator to generate a secret
  }

  /**
   * Generate a QR code URL that can be used by the user in Google Authenticator.
   * This URL is unique to the user and will contain the secret.
   * @param user - The user for whom the QR code is generated
   * @returns {string} - The QR code URL
   */
  static async generateQRCodeURL(userId: string): Promise<string> {
    const result = await UserService.findUserById(userId);

    const User = result?.user;
    const secret = this.generateSecret();
    
    if(User) {
      
      const label = `SMARTFinance App (${User.email})`;
      const issuer = 'SMARTFinance App';
  
        // Encrypt the secret before saving it to the database
        const encryptedSecret = encryptSecret(secret);
        User.userPreferences.totp.totpSecret = encryptedSecret;
        await User.save();
  
        return authenticator.keyuri(User.email, issuer, secret);
      
    } else {
      return '';
    }
  }

  /**
   * Verify the OTP entered by the user.
   * @param userId - The user whose secret will be used for verification
   * @param token - The OTP entered by the user
   * @returns {boolean} - Whether the OTP is valid or not
   */
  static async verifyOTP(userId: string, token: string): Promise<boolean> {

    const result =  await UserService.findUserById(userId);
    const User = result?.user;

    if (User) {
      // Verify if the entered OTP matches the expected value based on the user's secret
      const decryptedSecret = decryptSecret(User.userPreferences.totp.totpSecret);
      const verify =  authenticator.verify({ token, secret: decryptedSecret });

      if(verify) {
        User.userPreferences.totp.isTotpVerified = true;
        User.save();
      }

      return verify;

    } else {
      return false;
    }
 
  }

  /**
   *  Save the TOTP secret to the user if needed (for manual integration or updates).
   * @param user - The user to save the secret to
   * @param secret - The secret to save
   */
  static async saveUserSecret(userId: string, secret: string): Promise<void> {
    const result =  await UserService.findUserById(userId);
    const User = result?.user;

    if (User) {
      User.userPreferences.totp.totpSecret = secret; // Save the secret to the user's model
      User.save(); 
    }
  }

  /** */
  static async enableTOTP(userId: string, enable: boolean): Promise<void> {
    const result =  await UserService.findUserById(userId);
    const User = result?.user;

    if (User) {
      User.userPreferences.totp.enable = enable;
      User.save(); 
    }
  }
}
