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
