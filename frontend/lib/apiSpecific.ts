import { makeApiRequest } from "./api";
import { AuthApiResponse } from "./response-handler";

interface LoginData {
  email: string;
  password: string;
  role?: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  type: string;
}

export interface Message {
  message: string;
}

export interface Email {
  email: string;
}

export interface Code {
  code: string;
}

export interface UserId {
  userId: string;
}

export interface Result {
  result: string;
}

export interface Eanable {
  userId: string | undefined;
  enable: boolean;
}

export interface EanableResponse {
  message: string;
  session: string;
}

export interface ValidateUserCode {
  userId: string;
  token: string;
}

export interface PlaidExchangeProps {
  publicToken: string;
  userId: string;
}

export interface ValidOp {
  result: string;
  message: string;
}

export const login = (data: LoginData) =>
  makeApiRequest<AuthApiResponse, LoginData>("/auth/login", {
    method: "POST",
    body: data,
  });

export const register = (data: RegisterData) =>
  makeApiRequest<AuthApiResponse, RegisterData>("/auth/register", {
    method: "POST",
    body: data,
  });

export const sendVerifEmail = (data: Email) =>
  makeApiRequest<Message, Email>("/mailer/send-verification", {
    method: "POST",
    body: data,
  });

export const VerifyEmailCode = (data: Code) =>
  makeApiRequest<Message, Code>("/auth/verify-email", {
    method: "POST",
    body: data,
  });

export const EanableMfa = (data: Eanable) =>
  makeApiRequest<EanableResponse, Eanable>(`/user/mfa/enable/${data.userId}`, {
    method: "POST",
    body: data,
  });

export const EanableTotp = (data: Eanable) =>
  makeApiRequest<EanableResponse, Eanable>(`/user/totp/enable/${data.userId}`, {
    method: "POST",
    body: data,
  });

export const GenerateTotpCode = (data: UserId) =>
  makeApiRequest<Result, UserId>(`/totp/generate-qr/${data.userId}`, {
    method: "GET",
  });

export const ValidateTotpCode = (data: ValidateUserCode) =>
  makeApiRequest<Message, ValidateUserCode>(`/totp/verify/${data.userId}`, {
    method: "POST",
    body: data,
  });

export const getPlaidLinkToken = (data: UserId) =>
  makeApiRequest<ValidOp, UserId>(`/plaid/link-token/${data.userId}`, {
    method: "GET",
  });

export const exchangePublicToken = (data: PlaidExchangeProps) =>
  makeApiRequest<ValidOp, PlaidExchangeProps>(
    `/plaid/exchange-token/${data.userId}`,
    {
      method: "POST",
      body: data,
    }
  );
