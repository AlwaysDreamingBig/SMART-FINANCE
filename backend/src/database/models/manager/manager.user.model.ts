import { Schema } from "mongoose";
import { BaseUserDocument, BaseUserModel } from "../user.model";

// Manager model
export interface ManagerDocument extends BaseUserDocument {
    level: 2; // Manager level
    role: String;
    manageTeams(): string; // Role-specific method
}

const managerSchema = new Schema<ManagerDocument>({
    level: {
        type: Number,
        default: 2, // Manager level
    },
    role: {
        type: String,
        required: true,
        default: "Manager",
    },
});

managerSchema.methods.manageTeams = function () {
    return "Manage teams";
};

export const ManagerModel = BaseUserModel.discriminator<ManagerDocument>("Manager", managerSchema, "Managers");