import { HTTPSTATUS } from "../../config/http.config";
import { BaseUserModel } from "../../database/models/user.model";
import { AdminModel } from "../../database/models/admin/admin.user.model";  // Import Admin model
import { throwHttpError } from "../../middleware/errorHandler";
import { ManagerModel } from "../../database/models/manager/manager.user.model";
import { DeveloperModel } from "../../database/models/developer/developer.user.model";
import { ClientModel } from "../../database/models/client/client.user.model";
import { registerSchema, validateSchema } from "../../common/validators/auth.validators";
import { AppErrorMessage } from "../../common/enums/app-error.enum";

export class AuthService {
  static async register(userData: any) {
    // Validate userData using Zod
    const validData = validateSchema(registerSchema, userData);

    const { email, password, name, role } = validData;

    // Check if the user already exists
    const existingUser = await BaseUserModel.findOne({ email });
    if (existingUser) {
      // Throw a custom error if the user already exists
      throwHttpError(AppErrorMessage.AUTH_EMAIL_ALREADY_EXISTS, HTTPSTATUS.CONFLICT);
    }

    let newUser;

    // Handle different user roles and set the correct model
    if (role === "admin") {
      // Create a new admin user using AdminModel
      newUser = new AdminModel({
        email,
        password,
        name,
        isEmailVerified: false, // Email verification is pending
      });
    } else if (role === "manager") {
        // Create a new admin user using AdminModel
        newUser = new ManagerModel({
          email,
          password,
          name,
          isEmailVerified: false, // Email verification is pending
        });
    } else if (role === "developer") {
        // Create a new admin user using AdminModel
        newUser = new DeveloperModel({
          email,
          password,
          name,
          isEmailVerified: false, // Email verification is pending
        });
    } else if (role === "client") {
        // Create a new admin user using AdminModel
        newUser = new ClientModel({
          email,
          password,
          name,
          isEmailVerified: false, // Email verification is pending
        });
    } else {
      // Create a new regular user using BaseUserModel
      newUser = new BaseUserModel({
        email,
        password,
        name,
        isEmailVerified: false, // Email verification is pending
      });
    }

    // Save the user to the appropriate collection
    await newUser.save();

    return newUser;
  }
}
