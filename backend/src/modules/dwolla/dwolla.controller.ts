import { NextFunction, Request, Response } from "express";
import {
  AddFundingSourceParams,
  CreateRefundParams,
  CustomerUpdateParams,
  NewDwollaCustomerParams,
  TransferParams,
  VerifyMicroDepositParams,
  WebhookSubscriptionParams,
} from "../../types";
import { dwollaService } from "./dwolla.service";

export const DwollaController = {
  // async getDwollaEnv(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const env = dwollaService.getEnvironment();

  //     res.status(200).json({
  //       success: true,
  //       env,
  //       message: "Dwolla environment retrieved successfully.",
  //     });
  //   } catch (error) {
  //     console.error("Get environment error:", error);
  //     next(error);
  //   }
  // },

  async createCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customerData: NewDwollaCustomerParams = req.body;
      const customerUrl = await dwollaService.createDwollaCustomer(
        customerData
      );

      res.status(201).json({
        success: true,
        customerUrl,
        message: "Dwolla customer created successfully",
      });
    } catch (error) {
      console.error("Customer creation failed:", error);
      next(error);
    }
  },

  async addFundingSource(req: Request, res: Response, next: NextFunction) {
    try {
      const params: AddFundingSourceParams = {
        dwollaCustomerId: req.body.dwollaCustomerId,
        processorToken: req.body.processorToken,
        bankName: req.body.bankName,
      };

      const fundingSourceUrl = await dwollaService.addFundingSource(params);

      res.status(201).json({
        success: true,
        fundingSourceUrl,
        message: "Funding source added successfully",
      });
    } catch (error) {
      console.error("Funding source addition failed:", error);
      next(error);
    }
  },

  async createTransfer(req: Request, res: Response, next: NextFunction) {
    try {
      const transferParams: TransferParams = {
        sourceFundingSourceUrl: req.body.sourceFundingSourceUrl,
        destinationFundingSourceUrl: req.body.destinationFundingSourceUrl,
        amount: req.body.amount,
      };

      const transferUrl = await dwollaService.createTransfer(transferParams);

      res.status(201).json({
        success: true,
        transferUrl,
        message: "Transfer initiated successfully",
      });
    } catch (error) {
      console.error("Transfer creation failed:", error);
      next(error);
    }
  },

  async getOnDemandAuthorization(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const authLinks = await dwollaService.createOnDemandAuthorization();

      res.status(200).json({
        success: true,
        authLinks,
        message: "On-demand authorization retrieved",
      });
    } catch (error) {
      console.error("Authorization retrieval failed:", error);
      next(error);
    }
  },

  // Customer Management
  async getCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customerUrl = req.params.customerUrl;
      const customer = await dwollaService.getCustomer(customerUrl);
      res.json({ success: true, customer });
    } catch (error) {
      next(error);
    }
  },

  async updateCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customerUrl = req.params.customerUrl;
      const updateData: CustomerUpdateParams = req.body;
      await dwollaService.updateCustomer(customerUrl, updateData);
      res.json({ success: true, message: "Customer updated successfully" });
    } catch (error) {
      next(error);
    }
  },

  async suspendCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customerUrl = req.params.customerUrl;
      await dwollaService.suspendCustomer(customerUrl);
      res.json({ success: true, message: "Customer suspended successfully" });
    } catch (error) {
      next(error);
    }
  },

  // Funding Source Management
  async getFundingSource(req: Request, res: Response, next: NextFunction) {
    try {
      const fundingSourceUrl = req.params.fundingSourceUrl;
      const fundingSource = await dwollaService.getFundingSource(
        fundingSourceUrl
      );
      res.json({ success: true, fundingSource });
    } catch (error) {
      next(error);
    }
  },

  async removeFundingSource(req: Request, res: Response, next: NextFunction) {
    try {
      const fundingSourceUrl = req.params.fundingSourceUrl;
      await dwollaService.removeFundingSource(fundingSourceUrl);
      res.json({
        success: true,
        message: "Funding source removed successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  async verifyFundingSource(req: Request, res: Response, next: NextFunction) {
    try {
      const params: VerifyMicroDepositParams = req.body;
      await dwollaService.verifyMicroDeposits(params);
      res.json({
        success: true,
        message: "Micro-deposits verified successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  // Transfer Management
  async getTransfer(req: Request, res: Response, next: NextFunction) {
    try {
      const transferUrl = req.params.transferUrl;
      const transfer = await dwollaService.getTransfer(transferUrl);
      res.json({ success: true, transfer });
    } catch (error) {
      next(error);
    }
  },

  async listTransfers(req: Request, res: Response, next: NextFunction) {
    try {
      const customerUrl = req.params.customerUrl;
      const transfers = await dwollaService.listTransfers(customerUrl);
      res.json({ success: true, transfers });
    } catch (error) {
      next(error);
    }
  },

  async cancelTransfer(req: Request, res: Response, next: NextFunction) {
    try {
      const transferUrl = req.params.transferUrl;
      await dwollaService.cancelTransfer(transferUrl);
      res.json({ success: true, message: "Transfer cancelled successfully" });
    } catch (error) {
      next(error);
    }
  },

  // Webhook Management
  async createWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      const params: WebhookSubscriptionParams = req.body;
      const webhookUrl = await dwollaService.createWebhookSubscription(params);
      res.status(201).json({ success: true, webhookUrl });
    } catch (error) {
      next(error);
    }
  },

  async listWebhooks(req: Request, res: Response, next: NextFunction) {
    try {
      const webhooks = await dwollaService.listWebhookSubscriptions();
      res.json({ success: true, webhooks });
    } catch (error) {
      next(error);
    }
  },

  // Refunds
  async createRefund(req: Request, res: Response, next: NextFunction) {
    try {
      const params: CreateRefundParams = req.body;
      const refundUrl = await dwollaService.createRefund(params);
      res.status(201).json({ success: true, refundUrl });
    } catch (error) {
      next(error);
    }
  },

  // Balance
  async getBalance(req: Request, res: Response, next: NextFunction) {
    try {
      const fundingSourceUrl = req.params.fundingSourceUrl;
      const balance = await dwollaService.getBalance(fundingSourceUrl);
      res.json({ success: true, balance });
    } catch (error) {
      next(error);
    }
  },

  // Verification
  async verifyCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customerUrl = req.params.customerUrl;
      await dwollaService.verifyCustomer(customerUrl);
      res.json({ success: true, message: "Customer verification initiated" });
    } catch (error) {
      next(error);
    }
  },

  async processWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      const signature = req.headers["x-request-signature-sha-256"] as string;
      const webhookSecret = process.env.DWOLLA_WEBHOOK_SECRET!;

      // Stringify the body exactly as received
      const rawBody = JSON.stringify(req.body);

      const isValid = dwollaService.verifyWebhookSignature(
        rawBody,
        signature,
        webhookSecret
      );

      if (!isValid) {
        return res.status(401).json({
          success: false,
          error: "Invalid webhook signature",
        });
      }

      // Process valid webhook
      const event = req.body;
      // Add your webhook handling logic here

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Webhook processing failed:", error);
      next(error);
    }
  },
};
