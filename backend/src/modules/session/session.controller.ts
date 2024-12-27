import { NextFunction, Request, Response } from "express";
import { sessionService } from "./session.service";
import { HTTPSTATUS } from "../../config/http.config";

class SessionController {

    async createSession(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { userId } = req.body;
        const userAgent = req.headers["user-agent"] || "Unknown";

        try {
            const session = await sessionService.createSession(userId, userAgent);
            res.status(HTTPSTATUS.CREATED).json({
                message: "Operation successful.",
                result: session
            });
        } catch (error) {
            next(error);
        }
    }

    async getSessions(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;

        try {
            const sessions = await sessionService.getSessionsByUserId(userId);
            res.status(HTTPSTATUS.OK).json({
                message: "Operation successful.",
                result: sessions
            });
        } catch (error) {
            res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ message: "Error fetching sessions", error });
        }
    }

    async getSingleSession(req: Request, res: Response): Promise<void> {
        const { userId, _id  } = req.params;

        try {
            const session = await sessionService.getSessionById(userId, _id);
            res.status(HTTPSTATUS.OK).json({
                message: "Operation successful.",
                result: session
            });
        } catch (error) {
            res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ message: "Error fetching sessions", error });
        }
    }

    async deleteSession(req: Request, res: Response): Promise<void> {
        const { userId, sessionId } = req.params;

        try {
            const session = await sessionService.deleteSession(sessionId, userId);
            if (!session) {
                res.status(404).json({ message: "Session not found" });
                return;
            }
            res.status(HTTPSTATUS.OK).json({ message: "Session deleted successfully" });
        } catch (error) {
            res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ message: "Error deleting session", error });
        }
    }

    async deleteSessions(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;

        try {
            const result = await sessionService.deleteSessionsByUserId(userId);
            res.status(HTTPSTATUS.OK).json({ message: `${result.deletedCount} sessions deleted` });
        } catch (error) {
            res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ message: "Error deleting sessions", error });
        }
    }

    async createAdminSession(req: Request, res: Response): Promise<void> {
        const { userId } = req.body;
        const userAgent = req.headers["user-agent"] || "Unknown";
    
        try {
          const session = await sessionService.createAdminSession(userId, userAgent);
          res.status(HTTPSTATUS.CREATED).json({
                message: "Operation successful.",
                result: session
            });
        } catch (error) {
          res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ message: "Error creating admin session", error });
        }
      }
    
    async logAdminAction(req: Request, res: Response): Promise<void> {
        const { sessionId } = req.params;
        const { action } = req.body;

        try {
            const updatedSession = await sessionService.logAdminAction(sessionId, action);
            res.status(HTTPSTATUS.OK).json({
                message: "Operation successful.",
                result: updatedSession
            });
        } catch (error) {
            res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ message: "Error logging admin action", error });
        }
    }

    async createManagerSession(req: Request, res: Response): Promise<void> {
        const { userId } = req.body;
        const userAgent = req.headers["user-agent"] || "Unknown";

        try {
            const session = await sessionService.createManagerSession(userId, userAgent);
            res.status(HTTPSTATUS.CREATED).json({
                message: "Operation successful.",
                result: session
            });
        } catch (error) {
            res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ message: "Error creating manager session", error });
        }
    }

    async logTeamManagementAction(req: Request, res: Response): Promise<void> {
        const { sessionId } = req.params;
        const { action } = req.body;

        try {
            const updatedSession = await sessionService.logTeamManagementAction(sessionId, action);
            res.status(HTTPSTATUS.OK).json({
  message: "Operation successful.",
  result: updatedSession
});
        } catch (error) {
            res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ message: "Error logging team management action", error });
        }
    }

    async createDeveloperSession(req: Request, res: Response): Promise<void> {
        const { userId } = req.body;
        const userAgent = req.headers["user-agent"] || "Unknown";

        try {
            const session = await sessionService.createDeveloperSession(userId, userAgent);
            res.status(HTTPSTATUS.CREATED).json({
                message: "Operation successful.",
                result: session
            });
        } catch (error) {
            res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ message: "Error creating developer session", error });
        }
    }

    async logDevelopmentAction(req: Request, res: Response): Promise<void> {
        const { sessionId } = req.params;
        const { action } = req.body;

        try {
            const updatedSession = await sessionService.logDevelopmentAction(sessionId, action);
            res.status(HTTPSTATUS.OK).json({
  message: "Operation successful.",
  result: updatedSession
});
        } catch (error) {
            res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ message: "Error logging development action", error });
        }
    }
        
    async createClientSession(req: Request, res: Response): Promise<void> {
        const { userId } = req.body;
        const userAgent = req.headers["user-agent"] || "Unknown";

        try {
            const session = await sessionService.createClientSession(userId, userAgent);
            res.status(HTTPSTATUS.CREATED).json({
                message: "Operation successful.",
                result: session
            });
        } catch (error) {
            res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ message: "Error creating client session", error });
        }
    }

    async logClientReportAction(req: Request, res: Response): Promise<void> {
        const { sessionId } = req.params;
        const { action } = req.body;

        try {
            const updatedSession = await sessionService.logClientReportAction(sessionId, action);
            res.status(HTTPSTATUS.OK).json({
  message: "Operation successful.",
  result: updatedSession
});
        } catch (error) {
            res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ message: "Error logging client report action", error });
        }
    }
}

export const sessionController = new SessionController();
