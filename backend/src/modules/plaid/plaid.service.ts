import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";
import { UserService } from "../user/user.service";
import { plaidClient } from "../../common/utils/plaid";
import { throwAppError } from "../../middleware/errorHandler";
import { AppErrorMessage } from "../../common/enums/app-error.enum";
import { HTTPSTATUS } from "../../config/http.config";
import { hashValue } from "../../common/utils/bcrypt";
import { dwollaService } from "../dwolla/dwolla.service";
import { createBankAccountProps } from "../../types";
import { BankAccountModel } from "../../database/models/bank.model";

class PlaidService {
  async createPlaidLink(userId: string) {
    const res = await UserService.findUserById(userId);

    const User = res?.user;

    const tokenParams = {
      user: {
        client_user_id: userId,
      },
      client_name: `${User?.name}`,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["LU", "FR", "DE", "CA", "US", "BE"] as CountryCode[],
    };

    const result = await plaidClient.linkTokenCreate(tokenParams);

    return result;
  }

  async createBankAccount({
    userId,
    bankId,
    accountId,
    accessToken,
    fundingSourceUrl,
    shareableId,
  }: createBankAccountProps) {
    // Create a new bank account document
    const newBankAccount = new BankAccountModel({
      userId,
      bankId,
      accountId,
      accessToken,
      fundingSourceUrl,
      shareableId,
    });

    if (!newBankAccount) {
      throwAppError(
        AppErrorMessage.CREATE_BANK_ERROR,
        HTTPSTATUS.INTERNAL_SERVER_ERROR
      );
    }

    // Save to database
    await newBankAccount.save();

    return newBankAccount;
  }

  async exchangePublicToken(publicToken: string, userId: string) {
    console.log("Inside exchangePublicToken service");

    console.log("Public token:", publicToken);

    try {
      console.log("Fetching user with ID:", userId);
      const res = await UserService.findUserById(userId);

      const User = res?.user;
      console.log("User fetched:", User);

      // 1- Exchange public token for access token and item ID
      console.log("Exchanging public token for access token...");
      const response = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken,
      });
      console.log("Plaid item public token exchange response:", response.data);

      const accessToken = response.data.access_token;
      const itemId = response.data.item_id;
      console.log("Access token:", accessToken);
      console.log("Item ID:", itemId);

      // 2- Get account information from Plaid using the access token
      console.log("Getting account information from Plaid...");
      const accountsResponse = await plaidClient.accountsGet({
        access_token: accessToken,
      });
      console.log("Plaid accounts response:", accountsResponse.data);

      const accountData = accountsResponse.data.accounts[0];
      console.log("Account data:", accountData);

      // After fetching the account data
      if (accountData.balances.iso_currency_code !== "USD") {
        throwAppError(
          "Bank account must be in USD for Dwolla integration.",
          HTTPSTATUS.BAD_REQUEST
        );
      }

      // 3- Create a processor token for Dwolla using the access token and account ID
      const request: ProcessorTokenCreateRequest = {
        access_token: accessToken,
        account_id: accountData.account_id,
        processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
      };
      console.log("Creating processor token...");
      const processorTokenResponse = await plaidClient.processorTokenCreate(
        request
      );
      console.log("Processor token response:", processorTokenResponse.data);

      const processorToken = processorTokenResponse.data.processor_token;
      console.log("Processor token:", processorToken);

      // 4- Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
      console.log("Creating funding source URL...");
      const fundingSourceUrl = await dwollaService.addFundingSource({
        dwollaCustomerId: User?.dwollaCustomerId || "",
        processorToken,
        bankName: accountData.name,
      });
      console.log("Funding source URL:", fundingSourceUrl);

      // 5- If the funding source URL is not created, throw an error
      if (!fundingSourceUrl) {
        console.error("Failed to create funding source URL.");
        throwAppError(
          AppErrorMessage.FUNDING_ERROR,
          HTTPSTATUS.INTERNAL_SERVER_ERROR
        );
      } else {
        // 5- Create a bank account in the database
        console.log("Creating bank account in the database...");
        await this.createBankAccount({
          userId: userId,
          bankId: itemId,
          accountId: accountData.account_id,
          accessToken,
          fundingSourceUrl,
          shareableId: await hashValue(accountData.account_id),
        });
        console.log("Bank account created successfully.");
      }
    } catch (error) {
      console.error("Error during exchangePublicToken:", error);
      throw error; // Rethrow or handle the error as needed
    }
  }
}

export const plaidService = new PlaidService();
