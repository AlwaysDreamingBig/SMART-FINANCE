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
}

export interface Message {
  message: string;
}

export interface Email {
  email: string;
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
