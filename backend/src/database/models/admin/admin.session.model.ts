import { Schema } from "mongoose";
import { BaseSessionDocument, BaseSessionModel } from "../session.model";

// Admin-specific session model
export interface AdminSessionDocument extends BaseSessionDocument {
  adminLogs?: string[]; // Store logs related to admin activities
  logAdminAction(action: string): void; // Method to log admin actions
}

const adminSessionSchema = new Schema<AdminSessionDocument>({
  adminLogs: {
    type: [String],
    default: [],
  },
});

adminSessionSchema.methods.logAdminAction = function (action: string) {
  if (!this.adminLogs) this.adminLogs = [];
  this.adminLogs.push(action);
  return this.save();
};

export const AdminSessionModel = BaseSessionModel.discriminator<AdminSessionDocument>("AdminSession", adminSessionSchema);
