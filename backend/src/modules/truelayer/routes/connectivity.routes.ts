import express from "express";
import { ConnectivityController } from "../controllers/connectivity.controller";

const connectivityRouter = express.Router();

// Authentication flow
connectivityRouter.get("/auth/:userId", ConnectivityController.initiateAuth);
connectivityRouter.get(
  "/auth/callback/:userId",
  ConnectivityController.handleCallback
);

// Token management
connectivityRouter.post(
  "/token/refresh/:userId",
  ConnectivityController.refreshToken
);
connectivityRouter.get(
  "/token/status/:userId",
  ConnectivityController.checkTokenStatus
);

// Connection management
connectivityRouter.post(
  "/reauth/:userId",
  ConnectivityController.reauthenticate
);
connectivityRouter.delete(
  "/disconnect/:userId",
  ConnectivityController.disconnectAccount
);

export default connectivityRouter;
