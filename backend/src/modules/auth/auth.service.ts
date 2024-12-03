import { HTTPSTATUS } from "../../config/http.config";
import { BaseUserModel } from "../../database/models/user.model";
import { AdminModel } from "../../database/models/admin/admin.user.model";  // Import Admin model
import { throwHttpError } from "../../middleware/errorHandler";
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
        },
      };
    }
  }

}
