import { Schema } from "mongoose";
import { BaseSessionDocument, BaseSessionModel } from "../session.model";

// Client-specific session model
export interface ClientSessionDocument extends BaseSessionDocument {
  clientReportLogs?: string[]; // Track logs of client report interactions
  logClientReportAction(action: string): void; // Method to log report-related actions
}

const clientSessionSchema = new Schema<ClientSessionDocument>({
  clientReportLogs: {
    type: [String],
    default: [],
  },
});

clientSessionSchema.methods.logClientReportAction = function (action: string) {
  if (!this.clientReportLogs) this.clientReportLogs = [];
  this.clientReportLogs.push(action);
  return this.save();
};

export const ClientSessionModel = BaseSessionModel.discriminator<ClientSessionDocument>("ClientSession", clientSessionSchema);
