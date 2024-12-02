import { z } from "zod";
import { throwHttpError } from "../../middleware/errorHandler";
import { HTTPSTATUS } from "../../config/http.config";

// Define a schema for user registration
export const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password cannot exceed 50 characters")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[0-9]/, "Password must include at least one number")
    .regex(/[@$!%*?&]/, "Password must include at least one special character"),
    confirmPassword: z.string(),
    name: z
      .string()
      .min(1, "Name is required")
      .max(100, "Name cannot exceed 100 characters"),
    role: z
      .enum(["admin", "manager", "developer", "client", "user"])
      .optional() 
      .default("user"), 
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // Attach the error to the confirmPassword field
  });


// A utility function to validate data
export function validateSchema(schema: z.ZodSchema, data: unknown) {
  const result = schema.safeParse(data);
  if (!result.success) {
    // Extract error messages from Zod
    const errors = result.error.errors.map((err) => err.message);
    throwHttpError(`Validation failed: ${errors.join(", ")}`, HTTPSTATUS.BAD_REQUEST);
  }
  return result.data;
}
