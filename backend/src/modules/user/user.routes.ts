import express from "express";
import { userController } from "./user.controller";

const userRouter = express.Router();

userRouter.post("/totp/enable/:userId", userController.enableTOTP);
userRouter.post("/mfa/enable/:userId", userController.enableMfa);

export const userRoute = userRouter;
