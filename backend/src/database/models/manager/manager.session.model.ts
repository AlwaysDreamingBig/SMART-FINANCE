import { Schema } from "mongoose";
import { BaseSessionDocument, BaseSessionModel } from "../session.model";

// Manager-specific session model
export interface ManagerSessionDocument extends BaseSessionDocument {
  teamManagementLogs?: string[]; // Store logs related to managing teams
  logTeamManagementAction(action: string): void; // Method to log team management actions
}

const managerSessionSchema = new Schema<ManagerSessionDocument>({
  teamManagementLogs: {
    type: [String],
    default: [],
  },
});

managerSessionSchema.methods.logTeamManagementAction = function (action: string) {
  if (!this.teamManagementLogs) this.teamManagementLogs = [];
  this.teamManagementLogs.push(action);
  return this.save();
};

export const ManagerSessionModel = BaseSessionModel.discriminator<ManagerSessionDocument>("ManagerSession", managerSessionSchema);
