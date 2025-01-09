// utils/api.ts

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiRequestOptions<B extends object = object> {
  method?: RequestMethod;
  body?: B;
  headers?: Record<string, string>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const makeApiRequest = async <T, B extends object = object>(
  endpoint: string,
  { method = "POST", body, headers }: ApiRequestOptions<B> = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include", // Include cookies
    ...(body && { body: JSON.stringify(body) }),
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP error! Status: ${res.status} - ${errorText}`);
  }

  return res.json();
};
