import { config } from "../../config/app.config";
import { AdminSessionModel } from "../../database/models/admin/admin.session.model";
import { ManagerSessionModel } from "../../database/models/manager/manager.session.model";
import { DeveloperSessionModel } from "../../database/models/developer/developer.session.model";
import { ClientSessionModel } from "../../database/models/client/client.session.model";
import { BaseSessionModel } from "../../database/models/session.model";
import { convertToMilliseconds, ONE_DAY_IN_MS } from "./date-time";
import { throwHttpError } from "../../middleware/errorHandler";
import { HTTPSTATUS } from "../../config/http.config";

// Function to check the session
export async function checkSession(sessionId: string, role: string) {
  let session;
  const now = Date.now();

  switch (role) {
    case "admin":
      session = await AdminSessionModel.findById(sessionId);
      break;
    case "manager":
      session = await ManagerSessionModel.findById(sessionId);
      break;
    case "developer":
      session = await DeveloperSessionModel.findById(sessionId);
      break;
    case "client":
      session = await ClientSessionModel.findById(sessionId);
      break;
    default:
      session = await BaseSessionModel.findById(sessionId); // Fallback for base user
  }

  if (!session) {
    throwHttpError("Session not found", HTTPSTATUS.NOT_FOUND);
  } else {
    // Check if the session is expired
    if (session.expiredAt.getTime() <= now) {
        throwHttpError("Session expired", HTTPSTATUS.SESSION_EXPIRED);
    }

    // Determine if the session requires a refresh
    const sessionRequireRefresh = session.expiredAt.getTime() - now <= ONE_DAY_IN_MS;

    // Optionally extend session expiration if it’s nearing expiry
    if (sessionRequireRefresh) {
        const additionalTime = convertToMilliseconds(config.JWT.REFRESH_EXPIRES_IN);
        
        // Extend the session expiration by the calculated additional time
        session.expiredAt = new Date(session.expiredAt.getTime() + additionalTime);

        // Save the updated session
        await session.save();
    }

    return { session, sessionRequireRefresh };
  }
}
