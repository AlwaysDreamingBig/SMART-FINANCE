import express from "express";
import { plaidController } from "./plaid.controller";

const plaidRouter = express.Router();

plaidRouter.get("/link-token/:userId", plaidController.createPlaidLink);
plaidRouter.post(
  "/exchange-token/:userId",
  plaidController.exchangePublicToken
);

export const plaidRoute = plaidRouter;
