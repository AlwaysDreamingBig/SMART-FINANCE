import { config } from "../../config/app.config";
import { HTTPSTATUS } from "../../config/http.config";
import { throwHttpError } from "../../middleware/errorHandler";
import { AppErrorMessage } from "../enums/app-error.enum";
import { verifyJwtToken } from "./jwt";
import jwt from "jsonwebtoken";


// Function to verify refresh token
/**
 * 
 * @param Token is the token to verify
 * @param type is the type of token refresh | access
 * @returns is the payload
 */
export async function verifyToken(Token: string, type: string) {
    try {
        // Decode the token without verifying
    const decoded = jwt.decode(Token) as { aud?: string };
      if (!decoded || !decoded.aud) {
        throwHttpError(
          AppErrorMessage.AUTH_INVALID_TOKEN,
          HTTPSTATUS.UNPROCESSABLE_ENTITY
        );    
      }
  
      const { aud } = decoded;
  
      // Map user role to the appropriate secret
      let secret: string;
      switch (aud) {
        case "admin":
            if(type === "refresh") {
                secret = config.JWT.ADMIN_REFRESH_SECRET;
            } else{
                secret = config.JWT.ADMIN_SECRET;
            }
          break;
        case "manager":
          if(type === "refresh") {
            secret = config.JWT.MANAGER_REFRESH_SECRET;
          } else{
              secret = config.JWT.MANAGER_SECRET;
          }
          break;
        case "developer":
          if(type === "refresh") {
            secret = config.JWT.DEV_REFRESH_SECRET;
          } else{
              secret = config.JWT.DEV_SECRET;
          }
          break;
        case "client":
          if(type === "refresh") {
            secret = config.JWT.REFRESH_SECRET;
          } else{
              secret = config.JWT.SECRET;
          }
          break;
        default:
          if(type === "refresh") {
            secret = config.JWT.REFRESH_SECRET; // Default for generic users
          } else{
              secret = config.JWT.SECRET;
          }
      }
  
      // Fully verify the token with the mapped secret
      const payload = verifyJwtToken(Token, {
        key: secret,
        audience: aud, // Ensure audience matches the role
      });
  
      if (!payload || !payload.sessionId) {
        throwHttpError(
          AppErrorMessage.AUTH_INVALID_TOKEN,
          HTTPSTATUS.NO_CONTENT
        );
      }
  
      return payload; // Successfully verified payload
    } catch (error) {
      throwHttpError(
        AppErrorMessage.AUTH_INVALID_TOKEN,
        HTTPSTATUS.BAD_REQUEST
      );
    }
  }
  