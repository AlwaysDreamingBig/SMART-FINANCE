import express from "express";
import { plaidController } from "./plaid.controller";

const plaidRouter = express.Router();

plaidRouter.get("/link-token/:userId", plaidController.createPlaidLink);

export const plaidRoute = plaidRouter;
