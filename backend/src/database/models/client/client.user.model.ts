import { Schema } from "mongoose";
import { BaseUserDocument, BaseUserModel } from "../user.model";

// Client model
export interface ClientDocument extends BaseUserDocument {
    level: 4; // Client level
    role: String;
    viewReports(): string; // Role-specific method
}

const clientSchema = new Schema<ClientDocument>({
    level: {
        type: Number,
        default: 4, // Client level
    },
    role: {
        type: String,
        required: false,
        default: "Client",
    },
});

clientSchema.methods.viewReports = function () {
    return "View reports";  
};

export const ClientModel = BaseUserModel.discriminator<ClientDocument>("Client", clientSchema, "Clients");