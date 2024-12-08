import { Router } from "express";
import { AuthController } from "./auth.controller";

const registerRoute = Router();

// User registration route
registerRoute.post("/register", AuthController.register);
registerRoute.post("/login", AuthController.login);
registerRoute.post("/refresh-token", AuthController.refreshToken);

export default registerRoute;
