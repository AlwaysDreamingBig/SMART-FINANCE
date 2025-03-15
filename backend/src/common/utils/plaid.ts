import { config } from "../../config/app.config";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": config.PLAID_CLIENT_ID,
      "PLAID-SECRET": config.PLAID_SECRET,
    },
  },
});

export const plaidClient = new PlaidApi(configuration);
