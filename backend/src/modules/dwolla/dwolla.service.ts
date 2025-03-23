import { Client } from "dwolla-v2";
import { AppErrorMessage } from "../../common/enums/app-error.enum";
import { HTTPSTATUS } from "../../config/http.config";
import {
  AddFundingSourceParams,
  CreateFundingSourceOptions,
  CreateRefundParams,
  CustomerUpdateParams,
  MicroDepositParams,
  NewDwollaCustomerParams,
  TransferParams,
  VerifyMicroDepositParams,
  WebhookSubscriptionParams,
} from "../../types";
import { throwAppError } from "../../middleware/errorHandler";
import { createHmac } from "crypto";
import { config } from "../../config/app.config";

class DwollaService {
  private dwollaClient: Client;

  constructor() {
    this.dwollaClient = new Client({
      environment: this.getEnvironment(),
      key: config.DWOLLA_KEY as string,
      secret: config.DWOLLA_SECRET as string,
    });
  }

  private getEnvironment(): "production" | "sandbox" | undefined {
    const environment = config.DWOLLA_ENV;

    if (environment === "production" || environment === "sandbox") {
      return environment;
    }

    throwAppError(
      "Invalid Dwolla environment configuration",
      HTTPSTATUS.INTERNAL_SERVER_ERROR
    );
  }

  async createFundingSource(
    options: CreateFundingSourceOptions
  ): Promise<string | undefined> {
    try {
      const response = await this.dwollaClient.post(
        `customers/${options.customerId}/funding-sources`,
        {
          name: options.fundingSourceName,
          plaidToken: options.plaidToken,
        }
      );
      return response.headers.get("location") as string;
    } catch (error) {
      console.error("Failed to create funding source:", error);
      throwAppError(
        AppErrorMessage.CREATE_FUND_ERR,
        HTTPSTATUS.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createOnDemandAuthorization(): Promise<any> {
    try {
      const response = await this.dwollaClient.post("on-demand-authorizations");
      return response.body._links;
    } catch (error) {
      console.error("Failed to create on-demand authorization:", error);
      throwAppError(
        AppErrorMessage.CREATE_ON_DEMAND_AUTH_ERR,
        HTTPSTATUS.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createDwollaCustomer(
    newCustomer: NewDwollaCustomerParams
  ): Promise<string | undefined> {
    try {
      const response = await this.dwollaClient.post("customers", newCustomer);
      return response.headers.get("location") as string;
    } catch (error) {
      console.error("Failed to create Dwolla customer:", error);
      throwAppError(
        AppErrorMessage.CREATE_CUSTOMER_ERR,
        HTTPSTATUS.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createTransfer(params: TransferParams): Promise<string | undefined> {
    try {
      const response = await this.dwollaClient.post("transfers", {
        _links: {
          source: { href: params.sourceFundingSourceUrl },
          destination: { href: params.destinationFundingSourceUrl },
        },
        amount: {
          currency: "USD",
          value: params.amount,
        },
      });
      return response.headers.get("location") as string;
    } catch (error) {
      console.error("Failed to create transfer:", error);
      throwAppError(
        AppErrorMessage.CREATE_TRANSFER_ERR,
        HTTPSTATUS.INTERNAL_SERVER_ERROR
      );
    }
  }

  async addFundingSource(
    params: AddFundingSourceParams
  ): Promise<string | undefined> {
    try {
      const authLinks = await this.createOnDemandAuthorization();
      return await this.createFundingSource({
        customerId: params.dwollaCustomerId,
        fundingSourceName: params.bankName,
        plaidToken: params.processorToken,
        _links: authLinks,
      });
    } catch (error) {
      console.error("Failed to add funding source:", error);
      throwAppError(
        AppErrorMessage.ADD_FUNDING_SOURCE_ERR,
        HTTPSTATUS.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Customer Management
  async getCustomer(customerUrl: string): Promise<any> {
    try {
      const response = await this.dwollaClient.get(customerUrl);
      return response.body;
    } catch (error) {
      console.error("Failed to fetch customer:", error);
      throw new Error(AppErrorMessage.GET_CUSTOMER_ERR);
    }
  }

  async updateCustomer(
    customerUrl: string,
    params: CustomerUpdateParams
  ): Promise<void> {
    try {
      await this.dwollaClient.post(customerUrl, params);
    } catch (error) {
      console.error("Failed to update customer:", error);
      throw new Error(AppErrorMessage.UPDATE_CUSTOMER_ERR);
    }
  }

  async suspendCustomer(customerUrl: string): Promise<void> {
    try {
      await this.dwollaClient.post(`${customerUrl}/suspend`);
    } catch (error) {
      console.error("Failed to suspend customer:", error);
      throw new Error(AppErrorMessage.SUSPEND_CUSTOMER_ERR);
    }
  }

  // Funding Source Management
  async getFundingSource(fundingSourceUrl: string): Promise<any> {
    try {
      const response = await this.dwollaClient.get(fundingSourceUrl);
      return response.body;
    } catch (error) {
      console.error("Failed to fetch funding source:", error);
      throw new Error(AppErrorMessage.GET_FUNDING_SOURCE_ERR);
    }
  }

  async removeFundingSource(fundingSourceUrl: string): Promise<void> {
    try {
      await this.dwollaClient.delete(fundingSourceUrl);
    } catch (error) {
      console.error("Failed to remove funding source:", error);
      throw new Error(AppErrorMessage.REMOVE_FUNDING_SOURCE_ERR);
    }
  }

  async initiateMicroDeposits(params: MicroDepositParams): Promise<void> {
    try {
      await this.dwollaClient.post(
        `funding-sources/${params.fundingSourceId}/micro-deposits`
      );
    } catch (error) {
      console.error("Failed to initiate micro-deposits:", error);
      throw new Error(AppErrorMessage.INIT_MICRODEPOSITS_ERR);
    }
  }

  async verifyMicroDeposits(params: VerifyMicroDepositParams): Promise<void> {
    try {
      await this.dwollaClient.post(
        `funding-sources/${params.fundingSourceId}/micro-deposits`,
        {
          amount1: { value: params.amount1 },
          amount2: { value: params.amount2 },
        }
      );
    } catch (error) {
      console.error("Failed to verify micro-deposits:", error);
      throw new Error(AppErrorMessage.VERIFY_MICRODEPOSITS_ERR);
    }
  }

  // Transfer Management
  async getTransfer(transferUrl: string): Promise<any> {
    try {
      const response = await this.dwollaClient.get(transferUrl);
      return response.body;
    } catch (error) {
      console.error("Failed to fetch transfer:", error);
      throw new Error(AppErrorMessage.GET_TRANSFER_ERR);
    }
  }

  async listTransfers(customerUrl: string): Promise<any[]> {
    try {
      const response = await this.dwollaClient.get(`${customerUrl}/transfers`);
      return response.body._embedded.transfers;
    } catch (error) {
      console.error("Failed to list transfers:", error);
      throw new Error(AppErrorMessage.LIST_TRANSFERS_ERR);
    }
  }

  async cancelTransfer(transferUrl: string): Promise<void> {
    try {
      await this.dwollaClient.post(`${transferUrl}/cancel`);
    } catch (error) {
      console.error("Failed to cancel transfer:", error);
      throw new Error(AppErrorMessage.CANCEL_TRANSFER_ERR);
    }
  }

  // Webhook Management
  async createWebhookSubscription(
    params: WebhookSubscriptionParams
  ): Promise<string> {
    try {
      const response = await this.dwollaClient.post("webhook-subscriptions", {
        url: params.url,
        secret: params.secret,
      });
      return response.headers.get("location") as string;
    } catch (error) {
      console.error("Failed to create webhook:", error);
      throw new Error(AppErrorMessage.CREATE_WEBHOOK_ERR);
    }
  }

  async listWebhookSubscriptions(): Promise<any[]> {
    try {
      const response = await this.dwollaClient.get("webhook-subscriptions");
      return response.body._embedded["webhook-subscriptions"];
    } catch (error) {
      console.error("Failed to list webhooks:", error);
      throw new Error(AppErrorMessage.LIST_WEBHOOKS_ERR);
    }
  }

  // Refunds
  async createRefund(params: CreateRefundParams): Promise<string> {
    try {
      const response = await this.dwollaClient.post(
        `${params.transferUrl}/refunds`,
        {
          amount: { value: params.amount, currency: "USD" },
        }
      );
      return response.headers.get("location") as string;
    } catch (error) {
      console.error("Failed to create refund:", error);
      throw new Error(AppErrorMessage.CREATE_REFUND_ERR);
    }
  }

  // Balance
  async getBalance(fundingSourceUrl: string): Promise<number> {
    try {
      const response = await this.dwollaClient.get(
        `${fundingSourceUrl}/balance`
      );
      return response.body.balance.value;
    } catch (error) {
      console.error("Failed to get balance:", error);
      throw new Error(AppErrorMessage.GET_BALANCE_ERR);
    }
  }

  // Customer Verification
  async verifyCustomer(customerUrl: string): Promise<void> {
    try {
      await this.dwollaClient.post(`${customerUrl}/verify`);
    } catch (error) {
      console.error("Failed to verify customer:", error);
      throw new Error(AppErrorMessage.VERIFY_CUSTOMER_ERR);
    }
  }

  verifyWebhookSignature(
    payload: string,
    signature: string,
    secret: string
  ): boolean {
    try {
      const hash = createHmac("sha256", secret).update(payload).digest("hex");

      return `sha256=${hash}` === signature;
    } catch (error) {
      console.error("Webhook signature verification failed:", error);
      return false;
    }
  }
}

export const dwollaService = new DwollaService();
