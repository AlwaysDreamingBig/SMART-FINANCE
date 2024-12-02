import { Schema } from "mongoose";
import { BaseUserDocument, BaseUserModel } from "../user.model";
  
// Developer model
export interface DeveloperDocument extends BaseUserDocument {
    level: 3; // Developer level
    role: String;
    workOnProjects(): string; // Role-specific method
}

const developerSchema = new Schema<DeveloperDocument>({
    level: {
        type: Number,
        default: 3, // Developer level
    },
    role: {
        type: String,
        required: true,
        default: "Dev",
    },
});

developerSchema.methods.workOnProjects = function () {
    return "Work on projects";
};

export const DeveloperModel = BaseUserModel.discriminator<DeveloperDocument>("Developer", developerSchema, "Developers");