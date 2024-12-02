import { Schema } from "mongoose";
import { BaseSessionDocument, BaseSessionModel } from "../session.model";

// Developer-specific session model
export interface DeveloperSessionDocument extends BaseSessionDocument {
  developmentLogs?: string[]; // Track logs related to development activities
  logDevelopmentAction(action: string): void; // Method to log development actions
}

const developerSessionSchema = new Schema<DeveloperSessionDocument>({
  developmentLogs: {
    type: [String],
    default: [],
  },
});

developerSessionSchema.methods.logDevelopmentAction = function (action: string) {
  if (!this.developmentLogs) this.developmentLogs = [];
  this.developmentLogs.push(action);
  return this.save();
};

export const DeveloperSessionModel = BaseSessionModel.discriminator<DeveloperSessionDocument>("DeveloperSession", developerSessionSchema);
