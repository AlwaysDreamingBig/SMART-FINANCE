import axios from "axios";
import { UserService } from "../../user/user.service";
import {
  AuthFlowResponse,
  TokenRefreshResponse,
  ReauthResponse,
  DisconnectResponse,
} from "../../../types";
import { Console } from "console";

class ConnectivityService {
  /**
   * Initiates the TrueLayer bank authorization flow
   * @param userId - The ID of the user initiating the auth flow
   * @returns Promise<AuthFlowResponse> containing the auth URL
   */
  async initiateBankAuthFlow(userId: string): Promise<AuthFlowResponse> {
    try {
      const authUrl =
        `${process.env.TRUELAYER_AUTH_URL}/` +
        `?response_type=code&client_id=${process.env.TRUELAYER_CLIENT_ID}` +
        `&redirect_uri=https://console.truelayer.com/redirect-page` +
        `&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access%20signupplus%20verification` +
        `&providers=uk-cs-mock` + // insted of real uk-oauth-all uk-ob-all for production
        `&state=${userId}`; // Using userId as state for security

      console.log(authUrl);

      return {
        success: true,
        authUrl,
      };
    } catch (error) {
      throw new Error(
        `Failed to initiate auth flow: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Exchanges an authorization code for tokens
   * @param code - The authorization code from TrueLayer
   * @param userId - The ID of the user
   * @returns Promise<void>
   */
  async exchangeCodeForToken(code: string, userId: string): Promise<any> {
    try {
      console.log("Inside the exchange token fn\n");

      const tokenRes = await axios.post(
        `${process.env.TRUELAYER_AUTH_URL}/connect/token`,
        new URLSearchParams({
          grant_type: "authorization_code",
          code,
          client_id: process.env.TRUELAYER_CLIENT_ID!,
          client_secret: process.env.TRUELAYER_CLIENT_SECRET!,
          redirect_uri: process.env.APP_REDIRECT_URI!,
        }).toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      // Find and update user with tokens
      const result = await UserService.findUserById(userId);
      const user = result?.user;

      if (!user) {
        throw new Error("User not found");
      }

      // Set token expiry as a Date object
      const expiresIn = tokenRes.data.expires_in; // seconds
      const expiryDate = new Date(Date.now() + expiresIn * 1000); // convert to ms and add to current time

      user.truelayerAccessToken = tokenRes.data.access_token;
      user.truelayerRefreshToken = tokenRes.data.refresh_token;
      user.truelayerTokenExpiry = expiryDate;

      await user.save();

      return { token: tokenRes.data };
    } catch (error) {
      throw new Error(
        `Failed to exchange code for tokens: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Refreshes an expired access token
   * @param userId - The ID of the user
   * @returns Promise<TokenRefreshResponse>
   */
  async refreshAccessToken(userId: string): Promise<TokenRefreshResponse> {
    try {
      const result = await UserService.findUserById(userId);
      const user = result?.user;

      if (!user || !user.truelayerRefreshToken) {
        throw new Error("User not found or no refresh token available");
      }

      const res = await axios.post(
        `${process.env.TRUELAYER_AUTH_URL}/connect/token`,
        new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: user.truelayerRefreshToken,
          client_id: process.env.TRUELAYER_CLIENT_ID!,
          client_secret: process.env.TRUELAYER_CLIENT_SECRET!,
        }).toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      // Calculate the new expiry date
      const expiresIn = res.data.expires_in; // seconds
      const expiryDate = new Date(Date.now() + expiresIn * 1000); // convert to ms and add

      user.truelayerAccessToken = res.data.access_token;
      user.truelayerRefreshToken = res.data.refresh_token;
      user.truelayerTokenExpiry = expiryDate;

      return {
        success: true,
        accessToken: res.data.access_token,
        expiresIn: res.data.expires_in,
      };
    } catch (error) {
      throw new Error(
        `Failed to refresh access token: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Handles reauthorization for expired connections
   * @param userId - The ID of the user
   * @returns Promise<ReauthResponse> containing the reauth URL
   */
  async reauthorizeExpiredConnection(userId: string): Promise<ReauthResponse> {
    try {
      const result = await UserService.findUserById(userId);
      const user = result?.user;

      if (!user || !user.truelayerRefreshToken) {
        throw new Error("User not found or no refresh token available");
      }

      // Validate redirect URI exists
      const redirectUri = process.env.APP_REDIRECT_URI;
      if (!redirectUri) {
        throw new Error("Missing APP_REDIRECT_URI in environment");
      }

      const body = {
        response_type: "code",
        refresh_token: user.truelayerRefreshToken,
        redirect_uri: redirectUri,
        // Optional: state, PKCE parameters:
        // state: someSafeRandomString,
        // code_challenge: generatedChallenge,
        // code_challenge_method: "S256",
      };

      const { data } = await axios.post(
        `${process.env.TRUELAYER_AUTH_URL}/v1/reauthuri`,
        body,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("data is: ", data);

      if (!data?.result) {
        console.error("Unexpected reauth response:", data);
        throw new Error("Failed to get reauth link");
      }

      return {
        success: true,
        reauthUrl: data.result,
      };
    } catch (err) {
      throw new Error(
        `Failed to get reauthorization URL: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  /**
   * Disconnects a linked bank account
   * @param userId - The ID of the user
   * @param accountId - The ID of the account to disconnect
   * @returns Promise<DisconnectResponse>
   */
  async disconnectLinkedAccount(userId: string): Promise<DisconnectResponse> {
    try {
      const result = await UserService.findUserById(userId);
      const user = result?.user;

      if (!user || !user.truelayerAccessToken) {
        throw new Error("User not found or not connected to TrueLayer");
      }

      // First, disconnect from TrueLayer
      await axios.delete(`${process.env.TRUELAYER_AUTH_URL}/api/delete`, {
        headers: { Authorization: `Bearer ${user.truelayerAccessToken}` },
      });

      // Then remove tokens locally
      user.truelayerAccessToken = "";
      user.truelayerRefreshToken = "";
      user.truelayerTokenExpiry = null;
      await user.save();

      return {
        success: true,
        message: "Account successfully disconnected",
      };
    } catch (error) {
      throw new Error(
        `Failed to disconnect account: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Checks if a user's access token is expired
   * @param userId - The ID of the user
   * @returns Promise<boolean> indicating if token is expired
   */
  async isTokenExpired(userId: string): Promise<boolean> {
    const result = await UserService.findUserById(userId);
    const user = result?.user;

    if (!user || !user.truelayerTokenExpiry) {
      return true;
    }
    return user.truelayerTokenExpiry.getTime() < Date.now() + 30 * 1000;
  }
}

export default new ConnectivityService();
