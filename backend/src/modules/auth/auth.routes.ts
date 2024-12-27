import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authenticateJWT } from "../../common/strategies/jwt.stratety";

const registerRoute = Router();

// User registration route
registerRoute.post("/register", AuthController.register);
registerRoute.post("/login", AuthController.login);
registerRoute.post("/refresh-token", AuthController.refreshToken);
registerRoute.post("/verify-email", AuthController.verifyEmail);
registerRoute.post("/forgot-password", AuthController.forgotPassword);
registerRoute.post("/reset-password", AuthController.resetPassword);
registerRoute.post("/test", AuthController.TEST);
registerRoute.post("/logout/", authenticateJWT, AuthController.logout);


export default registerRoute;
