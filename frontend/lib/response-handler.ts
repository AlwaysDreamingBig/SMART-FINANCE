export type User = {
  id: string;
  email: string;
  name: string;
  __t?: string;
  session?: string;
};

export type AuthApiResponse = {
  message: string;
  user: User;
  tokens?: string;
};

export function succeedAuthResponseHandler(
  response: AuthApiResponse,
  returnType: "message" | "user" | "token"
): string | User {
  switch (returnType) {
    case "message":
      return response.message;
    case "user":
      return response.user;
    case "token":
      if (!response.tokens) {
        throw new Error("No token available in the response");
      }
      return response.tokens;
    default:
      throw new Error("Invalid return type");
  }
}
