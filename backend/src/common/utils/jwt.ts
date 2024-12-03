import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { config } from "../../config/app.config";

// Error Handling
import { throwHttpError } from "../../middleware/errorHandler";
import { AppErrorMessage } from "../enums/app-error.enum";
import { HTTPSTATUS } from "../../config/http.config";

// Common base interface for all user types
interface BaseUserPayload {
  userId: string;
  sessionId: string;
  role: string; // This will help differentiate the roles
}

// Admin Payload type with additional admin-specific fields
export type AdminAccessTPayload = BaseUserPayload & {
  role: 'admin'; // Specific role for admin
  adminPermissions: string[]; // Admin-specific permissions
};

// Manager Payload type with additional manager-specific fields
export type ManagerAccessTPayload = BaseUserPayload & {
  role: 'manager'; // Specific role for manager
  managerLevel: string; // Manager-specific level or area of responsibility
};

// Developer Payload type with additional developer-specific fields
export type DeveloperAccessTPayload = BaseUserPayload & {
  role: 'developer'; // Specific role for developer
  techStack: string[]; // Developer's tech stack
};

// Client Payload type with additional client-specific fields
export type ClientAccessTPayload = BaseUserPayload & {
  role: 'client'; // Specific role for client
  clientType: string; // Client-specific type (e.g., individual or business)
};

// Extend SignOptions to include secret and audience per user type
type SignOptsAndSecret = SignOptions & {
  secret: string;
  audience: string | string[];
};

// Default JWT signing options
const defaults: SignOptions = {
  audience: ["user"], // Default audience
};

// Define signing options for different user types
export const accessTokenSignOptions: SignOptsAndSecret = {
  expiresIn: config.JWT.EXPIRES_IN,
  secret: config.JWT.SECRET,
  audience: "user", // Default audience for access tokens
};

export const adminAccessTokenSignOptions: SignOptsAndSecret = {
  expiresIn: config.JWT.ADMIN_EXPIRES_IN,
  secret: config.JWT.ADMIN_SECRET,
  audience: "admin", // Admin-specific audience
};

export const managerAccessTokenSignOptions: SignOptsAndSecret = {
  expiresIn: config.JWT.MANAGER_EXPIRES_IN,
  secret: config.JWT.MANAGER_SECRET,
  audience: "manager", // Manager-specific audience
};

export const developerAccessTokenSignOptions: SignOptsAndSecret = {
  expiresIn: config.JWT.DEV_EXPIRES_IN,
  secret: config.JWT.DEV_SECRET,
  audience: "developer", // Developer-specific audience
};

export const clientAccessTokenSignOptions: SignOptsAndSecret = {
  expiresIn: config.JWT.EXPIRES_IN,
  secret: config.JWT.SECRET,
  audience: "client", // Client-specific audience
};

export const refreshTokenSignOptions: SignOptsAndSecret = {
  expiresIn: config.JWT.REFRESH_EXPIRES_IN,
  secret: config.JWT.REFRESH_SECRET,
  audience: "user", // Default audience for refresh tokens
};

export const adminRefreshTokenSignOptions: SignOptsAndSecret = {
  expiresIn: config.JWT.ADMIN_REFRESH_EXPIRES_IN,
  secret: config.JWT.ADMIN_REFRESH_SECRET,
  audience: "admin", // Default audience for refresh tokens
};

export const managerRefreshTokenSignOptions: SignOptsAndSecret = {
  expiresIn: config.JWT.MANAGER_REFRESH_EXPIRES_IN,
  secret: config.JWT.MANAGER_REFRESH_SECRET,
  audience: "manager", // Default audience for refresh tokens
};

export const developerRefreshTokenSignOptions: SignOptsAndSecret = {
  expiresIn: config.JWT.DEV_REFRESH_EXPIRES_IN,
  secret: config.JWT.DEV_REFRESH_SECRET,
  audience: "developer", // Default audience for refresh tokens
};

export const clientRefreshTokenSignOptions: SignOptsAndSecret = {
  expiresIn: config.JWT.REFRESH_EXPIRES_IN,
  secret: config.JWT.REFRESH_SECRET,
  audience: "client", // Default audience for refresh tokens
};

// Function to sign JWT token based on user type and session
export const signJwtToken = (
  payload: AdminAccessTPayload | ManagerAccessTPayload | DeveloperAccessTPayload | ClientAccessTPayload | BaseUserPayload,
  options?: SignOptsAndSecret
) => {
  const { secret, ...opts } = options || accessTokenSignOptions;

  if (!secret) {
    throwHttpError(
      AppErrorMessage.AUTH_TOKEN_ERROR, HTTPSTATUS.BAD_REQUEST
    );
  }

  try {
    return jwt.sign(payload, secret, {
      ...defaults,
      ...opts,
    });
  } catch (error) {
    throwHttpError(
      AppErrorMessage.AUTH_TOKEN_ERROR, HTTPSTATUS.INTERNAL_SERVER_ERROR
    );
  }
};

// Function to verify a JWT token
export const verifyJwtToken = (
    token: string,
    options: VerifyOptions & { key: string }
  ): any => {
    try {
      // Use type assertion to tell TypeScript the decoded token will be of the expected type
      const decoded = jwt.verify(token, options.key, options) as 
        | AdminAccessTPayload
        | ManagerAccessTPayload
        | DeveloperAccessTPayload
        | ClientAccessTPayload;
  
      // Now TypeScript knows that `decoded` has the `role` field
      const { role } = decoded;
  
      // Implement role-based access control (RBAC)
      if (role === 'admin') {
        // Logic for admin
      } else if (role === 'manager') {
        // Logic for manager
      } else if (role === 'developer') {
        // Logic for developer
      } else if (role === 'client') {
        // Logic for client
      }
  
      return decoded;
    } catch (error) {
      throwHttpError(
        AppErrorMessage.AUTH_INVALID_TOKEN, HTTPSTATUS.INTERNAL_SERVER_ERROR
      );
    }
  };
  
