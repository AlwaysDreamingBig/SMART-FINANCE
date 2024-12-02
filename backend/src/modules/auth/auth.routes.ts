import { Router } from "express";
import { AuthController } from "./auth.controller";

const registerRoute = Router();

// User registration route
registerRoute.post("/register", AuthController.register);

export default registerRoute;
