import { Schema } from "mongoose";
import { BaseUserDocument, BaseUserModel } from "../user.model";

// Admin model extends the BaseUserModel
export interface AdminDocument extends BaseUserDocument {
  level: number; // Admin level (e.g., Super Admin, Admin)
  role: String;
  managePermissions(): string; // Role-specific method
}

const adminSchema = new Schema<AdminDocument>({
  level: {
    type: Number,
    default: 1, // Default admin level
  },
  role: {
    type: String,
    required: true,
    default: "Admin",
  },
});

// Admin-specific method to manage permissions
adminSchema.methods.managePermissions = function () {
  return "Manage all permissions"; // Just a placeholder for actual logic
};

// Create the Admin model as a discriminator of BaseUserModel
export const AdminModel = BaseUserModel.discriminator<AdminDocument>("Admin", adminSchema, "Administrators");
