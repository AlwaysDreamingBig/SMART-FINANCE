import { HTTPSTATUS } from "../../config/http.config";
import { BaseUserModel } from "../../database/models/user.model";
import { AdminModel } from "../../database/models/admin/admin.user.model";  // Import Admin model
import { throwAppError, throwHttpError } from "../../middleware/errorHandler";
import { ManagerModel } from "../../database/models/manager/manager.user.model";
import { DeveloperModel } from "../../database/models/developer/developer.user.model";
import { ClientModel } from "../../database/models/client/client.user.model";
import { registerSchema, validateSchema } from "../../common/validators/auth.validators";
import { AppErrorMessage } from "../../common/enums/app-error.enum";
import { AdminSessionModel } from "../../database/models/admin/admin.session.model";
import { ManagerSessionModel } from "../../database/models/manager/manager.session.model";
import { DeveloperSessionModel } from "../../database/models/developer/developer.session.model";
import { ClientSessionModel } from "../../database/models/client/client.session.model";
import { BaseSessionModel } from "../../database/models/session.model";
import { accessTokenSignOptions, adminAccessTokenSignOptions, AdminAccessTPayload, adminRefreshTokenSignOptions, clientAccessTokenSignOptions, ClientAccessTPayload, clientRefreshTokenSignOptions, developerAccessTokenSignOptions, DeveloperAccessTPayload, developerRefreshTokenSignOptions, managerAccessTokenSignOptions, ManagerAccessTPayload, managerRefreshTokenSignOptions, refreshTokenSignOptions, signJwtToken } from "../../common/utils/jwt";
import { verifyToken } from "../../common/utils/verify-token";
import { checkSession } from "../../common/utils/check-session";
import jwt from "jsonwebtoken";
import VerificationCodeModel from "../../database/models/verification.model";
import { VerificationEnum } from "../../common/enums/verification-code.enum";
import { mailService } from "../../mailers/mail.service";
import { VerificationCodeService } from "../../common/utils/create-verification-code";
import { config } from "../../config/app.config";
import { hashValue } from "../../common/utils/bcrypt";

export class AuthService {

   /**
   * Handles user registration logic
   * @param email - User's email
   * @param name - User's name
   * @param password - User's password
   * @param role - Information about the user's role
   * @returns User details, access token, and refresh token
   * @throws HTTPError if login fails
   */
  static async register(userData: any) {
    // Validate userData using Zod
    const validData = validateSchema(registerSchema, userData);

    const { email, password, name, role } = validData;

    // Check if the user already exists
    const existingUser = await BaseUserModel.findOne({ email });
    if (existingUser) {
      // Throw a custom error if the user already exists
      throwHttpError(AppErrorMessage.AUTH_EMAIL_ALREADY_EXISTS, HTTPSTATUS.CONFLICT);
    }

    let newUser;

    // Handle different user roles and set the correct model
    if (role === "admin") {
      // Create a new admin user using AdminModel
      newUser = new AdminModel({
        email,
        password,
        name,
        isEmailVerified: false, // Email verification is pending
      });
    } else if (role === "manager") {
        // Create a new admin user using AdminModel
        newUser = new ManagerModel({
          email,
          password,
          name,
          isEmailVerified: false, // Email verification is pending
        });
    } else if (role === "developer") {
        // Create a new admin user using AdminModel
        newUser = new DeveloperModel({
          email,
          password,
          name,
          isEmailVerified: false, // Email verification is pending
        });
    } else if (role === "client") {
        // Create a new admin user using AdminModel
        newUser = new ClientModel({
          email,
          password,
          name,
          isEmailVerified: false, // Email verification is pending
        });
    } else {
      // Create a new regular user using BaseUserModel
      newUser = new BaseUserModel({
        email,
        password,
        name,
        isEmailVerified: false, // Email verification is pending
      });
    }

    // Save the user to the appropriate collection
    await newUser.save();

    const Verification = await VerificationCodeService.createVerificationCode(newUser._id, VerificationEnum.EMAIL_VERIFICATION)

    // Send verification email
    try {
      await mailService.sendVerificationEmail(email, Verification.code);
      console.log(`Verification email sent to ${email}`);
    } catch (error) {
      throwHttpError('Error sending verification email', HTTPSTATUS.INTERNAL_SERVER_ERROR);
    }

    return newUser;
  };


 /**
   * Handles user login logic
   * @param email - User's email
   * @param password - User's password
   * @param userAgent - Information about the user's browser or device
   * @returns User details, access token, and refresh token
   * @throws HTTPError if login fails
   */
 
 static async login(userData: { email: string; password: string; role?: string; userAgent?: string }) {
  const { email, password, userAgent } = userData;

  let __t;

  // Find the user by email
  const user = await BaseUserModel.findOne({ email });
  
  if (!user) {
    throwHttpError(AppErrorMessage.AUTH_USER_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
  } else {

    if ("__t" in user && user.__t) {
      __t = user.__t;
    } else {
      __t = "Base User";
    }

    // Check if the password is correct
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throwHttpError(AppErrorMessage.AUTH_WRONG_PASSWORD, HTTPSTATUS.UNAUTHORIZED);
    }

    /*
    // Check if the email is verified
    if (!user.isEmailVerified) {
      throwHttpError(AppErrorMessage.AUTH_EMAIL_NOT_VERIFIED, HTTPSTATUS.UNAUTHORIZED);
    }
    */

    let session;

    // Create a session for the user type
    switch (__t) {
      case "Administrators":
        session = await AdminSessionModel.create({
          userId: user._id,
          userAgent: userAgent || "unknown",
        });
        break;
      case "Managers":
        session = await ManagerSessionModel.create({
          userId: user._id,
          userAgent: userAgent || "unknown",
        });
        break;
      case "Developers":
        session = await DeveloperSessionModel.create({
          userId: user._id,
          userAgent: userAgent || "unknown",
        });
        break;
      case "Clients":
        session = await ClientSessionModel.create({
          userId: user._id,
          userAgent: userAgent || "unknown",
        });
        break;
      default:
        session = await BaseSessionModel.create({
          userId: user._id,
          userAgent: userAgent || "unknown",
        });
    }

    // Generate access and refresh tokens
    let accessTokenPayload:
    | AdminAccessTPayload
    | ManagerAccessTPayload
    | DeveloperAccessTPayload
    | ClientAccessTPayload;


  switch (__t) {
    case "Administrators":
      accessTokenPayload = {
        userId: user._id,
        sessionId: session._id,
        role: "admin", // Include role for admin-specific logic
      } as AdminAccessTPayload;
      break;
    case "Managers":
      accessTokenPayload = {
        userId: user._id,
        sessionId: session._id,
        role: "manager", // Include role for manager-specific logic
      } as ManagerAccessTPayload;
      break;
    case "Developers":
      accessTokenPayload = {
        userId: user._id,
        sessionId: session._id,
        role: "developer", // Include role for developer-specific logic
      } as DeveloperAccessTPayload;
      break;
    case "Clients":
      accessTokenPayload = {
        userId: user._id,
        sessionId: session._id,
        role: "client", // Include role for client-specific logic
      } as ClientAccessTPayload;
      break;
    default:
      accessTokenPayload = {
        userId: user._id,
        sessionId: session._id,
      } as ClientAccessTPayload;
  }
  
  const accessToken = signJwtToken(
    accessTokenPayload,
    __t === "Administrators"
      ? adminAccessTokenSignOptions
      : __t === "Managers"
      ? managerAccessTokenSignOptions
      : __t === "Developers"
      ? developerAccessTokenSignOptions
      : __t === "Clients"
      ? clientAccessTokenSignOptions
      : accessTokenSignOptions
  );

    const refreshToken = signJwtToken(accessTokenPayload, 
      __t === "Administrators"
      ? adminRefreshTokenSignOptions
      : __t === "Managers"
      ? managerRefreshTokenSignOptions
      : __t === "Developers"
      ? developerRefreshTokenSignOptions
      : __t === "Clients"
      ? clientRefreshTokenSignOptions
      : refreshTokenSignOptions
      );

      // Return the response with tokens and user details
      return {
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          __t: __t,
          session: session._id,
        },
      };
    }
  }

  /**
   * 
   * @param token the token to refresh
   * @returns a new refresh token and a new access token
   */
  static async refreshToken(token: string) {
  
    // Verify the refresh token
    const payload = await verifyToken(token, "refresh");

    if(!payload) {
      throwAppError(AppErrorMessage.VERIFICATION_ERROR, HTTPSTATUS.BAD_REQUEST) ;
    } else {

      const { role, sessionId, userId } = payload;

      // Step 2: Check session validity
      const res = await checkSession(sessionId, role);

      if(res) {

        // Step 3: Generate new access and refresh tokens
        let accessTokenPayload:
        | AdminAccessTPayload
        | ManagerAccessTPayload
        | DeveloperAccessTPayload
        | ClientAccessTPayload;

        switch (role) {
          case "admin":
            accessTokenPayload = {
              userId: userId,
              sessionId: sessionId,
              role: role, // Include role for admin-specific logic
            } as AdminAccessTPayload;
            break;
          case "Managers":
            accessTokenPayload = {
              userId: userId,
              sessionId: sessionId,
              role: role, // Include role for admin-specific logic
            } as ManagerAccessTPayload;
            break;
          case "Developers":
            accessTokenPayload = {
              userId: userId,
              sessionId: sessionId,
              role: role, // Include role for admin-specific logic
            } as DeveloperAccessTPayload;
            break;
          case "Clients":
            accessTokenPayload = {
              userId: userId,
              sessionId: sessionId,
              role: role, // Include role for admin-specific logic
            } as ClientAccessTPayload;
            break;
          default:
            accessTokenPayload = {
              userId: userId,
              sessionId: sessionId,
          } as ClientAccessTPayload;
        }

        const accessToken = signJwtToken(
          accessTokenPayload,
          role === "asmin"
            ? adminAccessTokenSignOptions
            : role === "manager"
            ? managerAccessTokenSignOptions
            : role === "developer"
            ? developerAccessTokenSignOptions
            : role === "client"
            ? clientAccessTokenSignOptions
            : accessTokenSignOptions
          );

          const refreshToken = signJwtToken(accessTokenPayload, 
            role === "admin"
            ? adminRefreshTokenSignOptions
            : role === "manager"
            ? managerRefreshTokenSignOptions
            : role === "developer"
            ? developerRefreshTokenSignOptions
            : role === "client"
            ? clientRefreshTokenSignOptions
            : refreshTokenSignOptions
            );

        return {
          AccessToken: accessToken,
          RefreshToken: refreshToken,
        };
      }
    }
  }

  /**
   * 
   * @param code the verification code
   * @returns the updated user
   */
  static async verifyEmail(code: string) {
    // Check for a valid verification code
    const validCode = await VerificationCodeModel.findValidCode(code, VerificationEnum.EMAIL_VERIFICATION);

    // If no valid code found, throw error
    if (!validCode) {
      throwAppError(
        AppErrorMessage.VERIF_EMAIL_CODE_ERROR,
        HTTPSTATUS.SERVICE_UNAVAILABLE
      );
    } else {
      // Find the user by userId
      const user = await BaseUserModel.findById(validCode.userId);

      let __t;
      let updatedUser;

      if(!user) {
        throwAppError(AppErrorMessage.AUTH_USER_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
      } else {

        if ("__t" in user && user.__t) {
          __t = user.__t;
        } else {
          __t = "Base User";
        }

        // Depending on the value of __t (discriminator), update the specific user model
        switch (__t) {
          case "Administrators":
            updatedUser = await AdminModel.findByIdAndUpdate(
              user._id,
              { isEmailVerified: true },
              { new: true }
            );
            break;
          case "Managers":
            updatedUser = await ManagerModel.findByIdAndUpdate(
              user._id,
              { isEmailVerified: true },
              { new: true }
            );
            break;
          case "Developers":
            updatedUser = await DeveloperModel.findByIdAndUpdate(
              user._id,
              { isEmailVerified: true },
              { new: true }
            );
            break;
          case "Clients":
            updatedUser = await ClientModel.findByIdAndUpdate(
              user._id,
              { isEmailVerified: true },
              { new: true }
            );
            break;
          default:
            updatedUser = await BaseUserModel.findByIdAndUpdate(
              user._id,
              { isEmailVerified: true },
              { new: true }
            );
        }

        // If user not found or unable to update, throw error
        if (!updatedUser) {
          throwAppError(
            AppErrorMessage.USER_UPDATE_ERROR,
            HTTPSTATUS.INTERNAL_SERVER_ERROR
          );
        }

        // Mark the verification code as used
        await validCode.updateOne({ usedAt: new Date() });

        // Return updated user information
        return {
          message: 'Email verified successfully',
          user: updatedUser,
        };
      }
    }
  }

  /**
   * 
   * @param email the email of the user
   * @returns the link to the reset password API
   */
  static async forgotPassword(email: string) {
    // Check if the user exists
    const user = await BaseUserModel.findOne({ email });
    
    if (!user) {
      throwHttpError(AppErrorMessage.AUTH_USER_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
    } else {

      // Generate a reset token
      const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "1h", 
      });

      // Create a new verification code document
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

      const verificationCode = new VerificationCodeModel({
        userId: user._id,
        code: resetToken,
        type: VerificationEnum.PASSWORD_RESET,
        expiresAt,
      });

      await verificationCode.save();

      // Create the reset link
      const resetLink = `${config.APP_ORIGIN}/reset-password?token=${resetToken}`;

      await mailService.sendResetPasswordEmail(user.email, resetLink);

      return resetLink;
    }
  }

  static async resetPassword(token: string, newPassword: string) {

    // Get the user id from the verificationmodel
    const verification = await VerificationCodeModel.findValidCode(token, VerificationEnum.PASSWORD_RESET);

    // hash new password 
    newPassword = await hashValue(newPassword);

    if (!verification){
      throwHttpError(AppErrorMessage.TOKEN_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
    } else {

      // Find the user by userId
      const user = await BaseUserModel.findById(verification.userId);

      let __t;
      let updatedUser;

      if(!user) {
        throwAppError(AppErrorMessage.AUTH_USER_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
      } else {

        if ("__t" in user && user.__t) {
          __t = user.__t;
        } else {
          __t = "Base User";
        }

        // Depending on the value of __t (discriminator), update the specific user model
        switch (__t) {
          case "Administrators":
            updatedUser = await AdminModel.findByIdAndUpdate(
              user._id,
              { password: newPassword },
            );
            break;
          case "Managers":
            updatedUser = await ManagerModel.findByIdAndUpdate(
              user._id,
              { password: newPassword },
            );
            break;
          case "Developers":
            updatedUser = await DeveloperModel.findByIdAndUpdate(
              user._id,
              { password: newPassword },
            );
            break;
          case "Clients":
            updatedUser = await ClientModel.findByIdAndUpdate(
              user._id,
              { password: newPassword },
            );
            break;
          default:
            updatedUser = await BaseUserModel.findByIdAndUpdate(
              user._id,
              { password: newPassword },
            );
        }

        // If user not found or unable to update, throw error
        if (!updatedUser) {
          throwAppError(
            AppErrorMessage.USER_PASSWORD_UPDATE_ERROR,
            HTTPSTATUS.INTERNAL_SERVER_ERROR
          );
        }

        //save user
        await updatedUser?.save();

        // Mark the verification code as used
        await verification.updateOne({ usedAt: new Date() });

        // Return updated user information
        return {
          message: 'Password was changed successfully',
          user: updatedUser,
        };
      }
    }
  }
}
