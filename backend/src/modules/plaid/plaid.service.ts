import { CountryCode, Products } from "plaid";
import { UserService } from "../user/user.service";
import { plaidClient } from "../../common/utils/plaid";

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
}

export const plaidService = new PlaidService();
