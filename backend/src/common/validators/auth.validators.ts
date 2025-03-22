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
      .regex(
        /[@$!%*?&]/,
        "Password must include at least one special character"
      ),
    confirmPassword: z.string(),
    name: z
      .string()
      .min(1, "Name is required")
      .max(100, "Name cannot exceed 100 characters"),
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(100, "First name cannot exceed 100 characters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(100, "Last name cannot exceed 100 characters"),
    role: z
      .enum(["admin", "manager", "developer", "client", "user"])
      .optional()
      .default("user"),
    type: z.enum(["personal", "business"]).optional().default("personal"), // Assuming this field is optional too, adjust as needed
    address: z
      .string()
      .min(1, "Address is required")
      .max(255, "Address cannot exceed 255 characters"),
    city: z
      .string()
      .min(1, "City is required")
      .max(100, "City cannot exceed 100 characters"),
    state: z.string().length(2, "State must be a 2-letter abbreviation"),
    postalCode: z
      .string()
      .min(5, "Postal code must be at least 5 characters")
      .max(10, "Postal code cannot exceed 10 characters"),
    dateOfBirth: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Date of birth must be in the format YYYY-MM-DD"
      ),
    ssn: z
      .string()
      .refine((val) => {
        // Remove non-numeric characters for SSN formats
        const cleanedVal = val.replace(/[^0-9]/g, "");

        // Check if the cleaned SSN matches one of the allowed formats:
        // - 9 digits for U.S. style (AAA-GG-SSSS)
        // - 13 or 15 digits for NIR (Numéro de Registre National)
        return /^(?:\d{9}|\d{13}|\d{15})$/.test(cleanedVal);
      }, "SSN must be a 9, 13, or 15 digit number with or without dashes or spaces.")
      .transform((val) => val.replace(/[^0-9]/g, "")) // Remove all non-numeric characters
      .refine(
        (val) => val.length === 9 || val.length === 13 || val.length === 15,
        {
          message: "SSN must be exactly 9, 13, or 15 digits long",
        }
      ),
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
    throwHttpError(
      `Validation failed: ${errors.join(", ")}`,
      HTTPSTATUS.BAD_REQUEST
    );
  }
  return result.data;
}
