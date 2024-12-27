import { AppErrorMessage } from "../../common/enums/app-error.enum";
import { HTTPSTATUS } from "../../config/http.config";
import { AdminSessionDocument, AdminSessionModel } from "../../database/models/admin/admin.session.model";
import { ClientSessionDocument, ClientSessionModel } from "../../database/models/client/client.session.model";
import { DeveloperSessionDocument, DeveloperSessionModel } from "../../database/models/developer/developer.session.model";
import { ManagerSessionDocument, ManagerSessionModel } from "../../database/models/manager/manager.session.model";
import { BaseSessionDocument, BaseSessionModel } from "../../database/models/session.model";
import { BaseUserModel } from "../../database/models/user.model";
import { throwAppError, throwHttpError } from "../../middleware/errorHandler";
import { UserService } from "../user/user.service";


class SessionService {
  // BaseSession methods
  async createSession(userId: string, userAgent?: string) {

    const user =  await UserService.findUserById(userId);

    console.log(user)

    if(user) {
        let __t;

        if ("__t" in user && user.__t) {
            __t = user.__t;
        } else {
            __t = "Base User";
        }
        
        let session;
    
        // Create a session for the user type
        switch (__t) {
          case "Administrators":
            session = await AdminSessionModel.create({
              userId: userId,
              userAgent: userAgent || "unknown",
            });
            break;
          case "Managers":
            session = await ManagerSessionModel.create({
              userId: userId,
              userAgent: userAgent || "unknown",
            });
            break;
          case "Developers":
            session = await DeveloperSessionModel.create({
              userId: userId,
              userAgent: userAgent || "unknown",
            });
            break;
          case "Clients":
            session = await ClientSessionModel.create({
              userId: userId,
              userAgent: userAgent || "unknown",
            });
            break;
          default:
            session = await BaseSessionModel.create({
              userId: userId,
              userAgent: userAgent || "unknown",
            });
        }
        
        return session;
    }

  }

  async getSessionsByUserId(userId: string) {

    const user =  await UserService.findUserById(userId);

    if (user) {
        let __t;

        if ("__t" in user && user.__t) {
            __t = user.__t;
        } else {
            __t = "Base User";
        }

        switch (__t) {
            case "Administrators":
                return await AdminSessionModel.find({ userId }).sort({ createdAt: -1 });
            case "Managers":
                return await ManagerSessionModel.find({ userId }).sort({ createdAt: -1 });
            case "Developers":
                return await DeveloperSessionModel.find({ userId }).sort({ createdAt: -1 });
            case "Clients":
                return await ClientSessionModel.find({ userId }).sort({ createdAt: -1 });
            default:
                return await BaseSessionModel.find({ userId }).sort({ createdAt: -1 });
        }   
    } 
  }

  async getSessionById(userId: string, sessionId: string) {

    const user =  await UserService.findUserById(userId);

    if (user) {
        let __t;

        if ("__t" in user && user.__t) {
            __t = user.__t;
        } else {
            __t = "Base User";
        }
    
        let session;

        switch (__t) {
            case "Administrators":
                session = await AdminSessionModel.findById(sessionId);
                break;
            case "Managers":
                session =  await ManagerSessionModel.findById(sessionId);
                break;
            case "Developers":
                 session =  DeveloperSessionModel.findById(sessionId);
                 break;
            case "Clients":
                session =  await ClientSessionModel.findById(sessionId);
                break;
            default:
                session =  await BaseSessionModel.findById(sessionId);
                break;
        }  
        
        return session;

    }
  }

  async deleteSession(sessionId: string, userId: string) {

    const user =  await UserService.findUserById(userId);

    if(user) {
        let __t;

        if ("__t" in user && user.__t) {
            __t = user.__t;
        } else {
            __t = "Base User";
        }
    
        switch (__t) {
            case "Administrators":
                return await AdminSessionModel.findByIdAndDelete(sessionId);
            case "Managers":
                return await ManagerSessionModel.findByIdAndDelete(sessionId);
            case "Developers":
                return await DeveloperSessionModel.findByIdAndDelete(sessionId);
            case "Clients":
                return await ClientSessionModel.findByIdAndDelete(sessionId);
            default:
                return await BaseSessionModel.findByIdAndDelete(sessionId);
        }  
    }
  }

  async deleteSessionsByUserId(userId: string): Promise<{ deletedCount?: number }> {
    const user =  await UserService.findUserById(userId);

    if(user) {
        let __t;

        if ("__t" in user && user.__t) {
            __t = user.__t;
        } else {
            __t = "Base User";
        }
    
        switch (__t) {
            case "Administrators":
                return await AdminSessionModel.deleteMany({ userId });
            case "Managers":
                return await ManagerSessionModel.deleteMany({ userId });
            case "Developers":
                return await DeveloperSessionModel.deleteMany({ userId });
            case "Clients":
                return await ClientSessionModel.deleteMany({ userId });
            default:
                return await BaseSessionModel.deleteMany({ userId });
        }
    } else {
        return { deletedCount: -1 }; // Default value for no sessions deleted
    };
  }

  // AdminSession methods
  async createAdminSession(userId: string, userAgent?: string): Promise<AdminSessionDocument> {
    return await AdminSessionModel.create({ userId, userAgent });
  }

  async logAdminAction(sessionId: string, action: string) {
    const session = await AdminSessionModel.findById(sessionId);
    if (!session) {
        throwHttpError(AppErrorMessage.SESSION_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
    }
    session?.logAdminAction(action);
  }

  async getLogAdminAction(sessionId: string) {
    const session = await AdminSessionModel.findById(sessionId);
    if (!session) {
        throwHttpError(AppErrorMessage.SESSION_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
    }
    return session?.adminLogs;
  }

  // ManagerSession methods
  async createManagerSession(userId: string, userAgent?: string): Promise<ManagerSessionDocument> {
    return await ManagerSessionModel.create({ userId, userAgent });
  }

  async logTeamManagementAction(sessionId: string, action: string) {
    const session = await ManagerSessionModel.findById(sessionId);
    if (!session) {
        throwHttpError(AppErrorMessage.SESSION_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
    }
    session?.logTeamManagementAction(action);
  }

  async getLogTeamManagementAction(sessionId: string) {
    const session = await ManagerSessionModel.findById(sessionId);
    if (!session) {
        throwHttpError(AppErrorMessage.SESSION_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
    }
    return session?.teamManagementLogs;
  }

  // DeveloperSession methods
  async createDeveloperSession(userId: string, userAgent?: string): Promise<DeveloperSessionDocument> {
    return await DeveloperSessionModel.create({ userId, userAgent });
  }

  async logDevelopmentAction(sessionId: string, action: string) {
    const session = await DeveloperSessionModel.findById(sessionId);
    if (!session) {
        throwHttpError(AppErrorMessage.SESSION_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
    }
    session?.logDevelopmentAction(action);
  }

  async getLogDevelopmentAction(sessionId: string) {
    const session = await DeveloperSessionModel.findById(sessionId);
    if (!session) {
        throwHttpError(AppErrorMessage.SESSION_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
    }
    return session?.developmentLogs;
  }

  // ClientSession methods
  async createClientSession(userId: string, userAgent?: string): Promise<ClientSessionDocument> {
    return await ClientSessionModel.create({ userId, userAgent });
  }

  async logClientReportAction(sessionId: string, action: string) {
    const session = await ClientSessionModel.findById(sessionId);
    if (!session) {
        throwHttpError(AppErrorMessage.SESSION_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
    }
    session?.logClientReportAction(action);
  }

  async getLogClientReportAction(sessionId: string) {
    const session = await ClientSessionModel.findById(sessionId);
    if (!session) {
        throwHttpError(AppErrorMessage.SESSION_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
    }
    return session?.clientReportLogs;
  }
}

export const sessionService = new SessionService();
