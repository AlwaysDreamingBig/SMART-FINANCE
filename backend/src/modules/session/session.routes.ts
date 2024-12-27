import express from "express";
import { sessionController } from "./session.controller";

const sessionRouter = express.Router();

// BaseSession routes
sessionRouter.post("/create", sessionController.createSession);
sessionRouter.get("/:userId", sessionController.getSessions);
sessionRouter.get("/:userId/:_id", sessionController.getSingleSession);
sessionRouter.delete("/delete/:userId/:sessionId", sessionController.deleteSession);
sessionRouter.delete("/delete/:userId", sessionController.deleteSessions);

// ManagerSession routes
sessionRouter.post("/manager", sessionController.createManagerSession);
sessionRouter.patch("/manager/:sessionId/log-action", sessionController.logTeamManagementAction);

// DeveloperSession routes
sessionRouter.post("/developer", sessionController.createDeveloperSession);
sessionRouter.patch("/developer/:sessionId/log-action", sessionController.logDevelopmentAction);

// ClientSession routes
sessionRouter.post("/client", sessionController.createClientSession);
sessionRouter.patch("/client/:sessionId/log-action", sessionController.logClientReportAction);

// AdminSession routes
sessionRouter.post("/admin", sessionController.createAdminSession);
sessionRouter.patch("/admin/:sessionId/log-action", sessionController.logAdminAction);

export const sessionRoute = sessionRouter;
