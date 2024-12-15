import { Router } from "express";
import { AuthController } from "./auth.controller";

const registerRoute = Router();

// User registration route
registerRoute.post("/register", AuthController.register);
registerRoute.post("/login", AuthController.login);
registerRoute.post("/refresh-token", AuthController.refreshToken);
registerRoute.post("/verify-email", AuthController.verifyEmail);
registerRoute.post("/forgot-password", AuthController.forgotPassword);
registerRoute.post("/test", AuthController.TEST);


export default registerRoute;
