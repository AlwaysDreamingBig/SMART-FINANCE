export interface CreateFundingSourceOptions {
  customerId: string; // Dwolla Customer ID
  fundingSourceName: string; // Dwolla Funding Source Name
  plaidToken: string; // Plaid Account Processor Token
  _links: object; // Dwolla On Demand Authorization Link
}

export type NewDwollaCustomerParams = {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};

export type TransferParams = {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
};

export type AddFundingSourceParams = {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
};

export interface createBankAccountProps {
  accessToken: string;
  userId: string;
  accountId: string;
  bankId: string;
  fundingSourceUrl: string;
  shareableId: string;
}

// types/dwolla.types.ts

export interface CreateRefundParams {
  /**
   * URL of the transfer to refund
   */
  transferUrl: string;

  /**
   * Refund amount in USD (string to avoid floating point precision issues)
   * @example "125.50"
   */
  amount: string;
}

export interface CustomerUpdateParams {
  /**
   * Customer's first name
   */
  firstName?: string;

  /**
   * Customer's last name
   */
  lastName?: string;

  /**
   * Customer email address
   */
  email?: string;

  /**
   * Business name (required for business customers)
   */
  businessName?: string;

  /**
   * Physical address
   */
  address?: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface MicroDepositParams {
  /**
   * Funding source ID to verify
   */
  fundingSourceId: string;
}

export interface VerifyMicroDepositParams {
  /**
   * Funding source ID being verified
   */
  fundingSourceId: string;

  /**
   * First micro-deposit amount (in cents)
   * @example 25
   */
  amount1: number;

  /**
   * Second micro-deposit amount (in cents)
   * @example 43
   */
  amount2: number;
}

export interface WebhookSubscriptionParams {
  /**
   * URL to receive webhook events
   * @example "https://api.your-app.com/webhooks/dwolla"
   */
  url: string;

  /**
   * Secret for verifying webhook signatures
   */
  secret: string;
}

// Optional: Add these common types if needed
export interface Address {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Amount {
  value: string;
  currency: "USD";
}
