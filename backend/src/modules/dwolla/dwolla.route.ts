import express from "express";
import { DwollaController } from "./dwolla.controller";
import {
  addFundingSourceSchema,
  createCustomerSchema,
  createTransferSchema,
  validateRequestBody,
} from "../../common/validators/dwolla.validators";

const dwollaRouter = express.Router();

// dwollaRouter.get("/get-env", DwollaController.getDwollaEnv);

dwollaRouter.post("/customers", DwollaController.createCustomer);
dwollaRouter.post("/funding-sources", DwollaController.addFundingSource);
dwollaRouter.post("/transfers", DwollaController.createTransfer);
dwollaRouter.get("/auth/ondemand", DwollaController.getOnDemandAuthorization);

// Customer Routes
dwollaRouter.post(
  "/customers",
  validateRequestBody(createCustomerSchema),
  DwollaController.createCustomer
);
dwollaRouter.get("/customers/:customerUrl", DwollaController.getCustomer);
dwollaRouter.patch("/customers/:customerUrl", DwollaController.updateCustomer);
dwollaRouter.post(
  "/customers/:customerUrl/suspend",
  DwollaController.suspendCustomer
);
dwollaRouter.post(
  "/customers/:customerUrl/verify",
  DwollaController.verifyCustomer
);

// Funding Source Routes
dwollaRouter.post(
  "/funding-sources",
  validateRequestBody(addFundingSourceSchema),
  DwollaController.addFundingSource
);
dwollaRouter.get(
  "/funding-sources/:fundingSourceUrl",
  DwollaController.getFundingSource
);
dwollaRouter.delete(
  "/funding-sources/:fundingSourceUrl",
  DwollaController.removeFundingSource
);
dwollaRouter.post(
  "/funding-sources/verify-microdeposits",
  DwollaController.verifyFundingSource
);

// Transfer Routes
dwollaRouter.post(
  "/transfers",
  validateRequestBody(createTransferSchema),
  DwollaController.createTransfer
);
dwollaRouter.get("/transfers/:transferUrl", DwollaController.getTransfer);
dwollaRouter.post(
  "/transfers/:transferUrl/cancel",
  DwollaController.cancelTransfer
);
dwollaRouter.get(
  "/customers/:customerUrl/transfers",
  DwollaController.listTransfers
);

// Webhook Routes
dwollaRouter.post("/webhooks", DwollaController.createWebhook);
dwollaRouter.get("/webhooks", DwollaController.listWebhooks);

// Refund Routes
dwollaRouter.post("/refunds", DwollaController.createRefund);

// Balance Routes
dwollaRouter.get(
  "/funding-sources/:fundingSourceUrl/balance",
  DwollaController.getBalance
);

// On-Demand Authorization
dwollaRouter.get("/auth/ondemand", DwollaController.getOnDemandAuthorization);

export const dwollaRoute = dwollaRouter;
