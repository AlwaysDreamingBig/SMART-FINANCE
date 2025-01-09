import { AppErrorMessage } from "../../common/enums/app-error.enum";
import { HTTPSTATUS } from "../../config/http.config";
import { AdminModel } from "../../database/models/admin/admin.user.model";
import { ClientModel } from "../../database/models/client/client.user.model";
import { DeveloperModel } from "../../database/models/developer/developer.user.model";
import { ManagerModel } from "../../database/models/manager/manager.user.model";
import { BaseUserModel } from "../../database/models/user.model";
import { throwAppError } from "../../middleware/errorHandler";

export class UserService {

    // Finders:
    /**
     * @param userId 
     * @returns the user
     */
    static async findUserById(userId: string) {
        const user = await BaseUserModel.findById(userId);

      let __t;
      let finalUser;

      if(!user) {
        throwAppError(AppErrorMessage.AUTH_USER_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
      } else {

        if ("__t" in user && user.__t) {
          __t = user.__t;
        } else {
          __t = "Base User";
        }

        // Depending on the value of __t (discriminator), return the specific user model
        switch (__t) {
          case "Administrators":
            finalUser = await AdminModel.findById(userId);
            break;
          case "Managers":
            finalUser = await ManagerModel.findById(userId);
            break;
          case "Developers":
            finalUser = await DeveloperModel.findById(userId);
            break;
          case "Clients":
            finalUser = await ClientModel.findById(userId);
            break;
          default:
            finalUser = await BaseUserModel.findById(userId);
        }

        // If user not found or unable to update, throw error
        if (!finalUser) {
          throwAppError(
            AppErrorMessage.AUTH_USER_NOT_FOUND,
            HTTPSTATUS.INTERNAL_SERVER_ERROR
          );
        }


        // Return updated user information
        return {
          user: finalUser,
        };
      }
    
    };

    /**
     * 
     * @param email 
     * @returns the user
     */
    static async findUserByEmail(email: string) {
        const user = await BaseUserModel.findOne({ email });
    
        let __t;
        let finalUser;
    
        if (!user) {
            throwAppError(AppErrorMessage.AUTH_USER_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
        } else {
            if ("__t" in user && user.__t) {
                __t = user.__t;
            } else {
                __t = "Base User";
            }
    
            // Depending on the value of __t (discriminator), return the specific user model
            switch (__t) {
                case "Administrators":
                    finalUser = await AdminModel.findOne({ email });
                    break;
                case "Managers":
                    finalUser = await ManagerModel.findOne({ email });
                    break;
                case "Developers":
                    finalUser = await DeveloperModel.findOne({ email });
                    break;
                case "Clients":
                    finalUser = await ClientModel.findOne({ email });
                    break;
                default:
                    finalUser = await BaseUserModel.findOne({ email });
            }
    
            if (!finalUser) {
                throwAppError(
                    AppErrorMessage.AUTH_USER_NOT_FOUND,
                    HTTPSTATUS.INTERNAL_SERVER_ERROR
                );
            }
    
            return {
                user: finalUser,
            };
        }
    };

    /**
     * 
     * @param name 
     * @returns the user
     */
    static async findUserByName(name: string) {
        // Perform a case-insensitive search using $regex
        const users = await BaseUserModel.find({ name: { $regex: new RegExp(`^${name}$`, "i") } });
    
        if (!users || users.length === 0) {
            throwAppError(AppErrorMessage.AUTH_USER_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
        }
    
        // Process users and determine their specific model
        const finalUsers = await Promise.all(
            users.map(async (user) => {
                const __t = (user as any).__t || "Base User"; // Use 'as any' to bypass the TypeScript error
    
                switch (__t) {
                    case "Administrators":
                        return await AdminModel.findById(user._id);
                    case "Managers":
                        return await ManagerModel.findById(user._id);
                    case "Developers":
                        return await DeveloperModel.findById(user._id);
                    case "Clients":
                        return await ClientModel.findById(user._id);
                    default:
                        return await BaseUserModel.findById(user._id);
                }
            })
        );
    
        // Remove any null results
        const filteredUsers = finalUsers.filter(Boolean);
    
        if (filteredUsers.length === 0) {
            throwAppError(AppErrorMessage.AUTH_USER_NOT_FOUND, HTTPSTATUS.INTERNAL_SERVER_ERROR);
        }
    
        return {
            users: filteredUsers,
        };
    };

    /**
     * 
     * @param isVerified a boolean true or false
     * @returns the corresponding users
     */
    static async findUsersByVerification(isVerified: boolean) {
        // Find all users matching the isEmailVerified status
        const users = await BaseUserModel.find({ isEmailVerified: isVerified });

        if (!users || users.length === 0) {
            throwAppError(AppErrorMessage.AUTH_USER_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
        }

        // Process users and determine their specific model
        const finalUsers = await Promise.all(
            users.map(async (user) => {
                const __t = (user as any).__t || "Base User"; // Use 'as any' to bypass the TypeScript error

                switch (__t) {
                    case "Administrators":
                        return await AdminModel.findById(user._id);
                    case "Managers":
                        return await ManagerModel.findById(user._id);
                    case "Developers":
                        return await DeveloperModel.findById(user._id);
                    case "Clients":
                        return await ClientModel.findById(user._id);
                    default:
                        return await BaseUserModel.findById(user._id);
                }
            })
        );

        // Remove any null results
        const filteredUsers = finalUsers.filter(Boolean);

        if (filteredUsers.length === 0) {
            throwAppError(AppErrorMessage.AUTH_USER_NOT_FOUND, HTTPSTATUS.INTERNAL_SERVER_ERROR);
        }

        return {
            users: filteredUsers,
        };
    };

    /**
     * 
     * @param isVerified 
     * @param role 
     * @returns 
     */
    static async findUsersByVerificationAndRole(isVerified: boolean, role?: string) {
        // Create the query object
        const query: any = { isEmailVerified: isVerified };
    
        // If a role is provided, add it to the query filter
        if (role) {
            query.role = role;
        }
    
        // Find all users matching the verification status (and role if provided)
        const users = await BaseUserModel.find(query);
    
        if (!users || users.length === 0) {
            throwAppError(AppErrorMessage.AUTH_USER_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
        }
    
        // Process users and determine their specific model
        const finalUsers = await Promise.all(
            users.map(async (user) => {
                const __t = (user as any).__t || "Base User"; // Use 'as any' to bypass the TypeScript error
    
                switch (__t) {
                    case "Administrators":
                        return await AdminModel.findById(user._id);
                    case "Managers":
                        return await ManagerModel.findById(user._id);
                    case "Developers":
                        return await DeveloperModel.findById(user._id);
                    case "Clients":
                        return await ClientModel.findById(user._id);
                    default:
                        return await BaseUserModel.findById(user._id);
                }
            })
        );
    
        // Remove any null results
        const filteredUsers = finalUsers.filter(Boolean);
    
        if (filteredUsers.length === 0) {
            throwAppError(AppErrorMessage.AUTH_USER_NOT_FOUND, HTTPSTATUS.INTERNAL_SERVER_ERROR);
        }
    
        return {
            users: filteredUsers,
        };
    };

    /**
     * 
     * @param role 
     * @returns 
     */
    static async findUsersByRole(role: string) {
        // Find all users matching the specified role
        const users = await BaseUserModel.find({ role });
    
        if (!users || users.length === 0) {
            throwAppError(AppErrorMessage.AUTH_USER_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
        }
    
        // Process users and determine their specific model
        const finalUsers = await Promise.all(
            users.map(async (user) => {
                const __t = (user as any).__t || "Base User"; // Use 'as any' to bypass the TypeScript error
    
                switch (__t) {
                    case "Administrators":
                        return await AdminModel.findById(user._id);
                    case "Managers":
                        return await ManagerModel.findById(user._id);
                    case "Developers":
                        return await DeveloperModel.findById(user._id);
                    case "Clients":
                        return await ClientModel.findById(user._id);
                    default:
                        return await BaseUserModel.findById(user._id);
                }
            })
        );
    
        // Remove any null results
        const filteredUsers = finalUsers.filter(Boolean);
    
        if (filteredUsers.length === 0) {
            throwAppError(AppErrorMessage.AUTH_USER_NOT_FOUND, HTTPSTATUS.INTERNAL_SERVER_ERROR);
        }
    
        return {
            users: filteredUsers,
        };
    };

    /**
     * 
     * @param userId 
     * @returns 
     */
    static async getUserLevel(userId: string) {
        // Find the user by their ID
        const user = await BaseUserModel.findById(userId);
    
        if (!user) {
            throwAppError(AppErrorMessage.AUTH_USER_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
        }
    
        // Check the discriminator __t to determine the user type
        const __t = (user as any).__t || "Base User"; // Use 'as any' to bypass the TypeScript error
    
        let level = 4; // Default level is 4
    
        switch (__t) {
            case "Managers":
                // For Managers, retrieve the level from Manager model
                const manager = await ManagerModel.findById(userId);
                if (manager && manager.level !== undefined) {
                    level = manager.level;
                }
                break;
            case "Administrators":
                // For Admins, retrieve the level from Admin model
                const admin = await AdminModel.findById(userId);
                if (admin && admin.level !== undefined) {
                    level = admin.level;
                }
                break;
            case "Developers":
                // For Developers, retrieve the level from Developer model
                const developer = await DeveloperModel.findById(userId);
                if (developer && developer.level !== undefined) {
                    level = developer.level;
                }
                break;
            case "Clients":
                // For Clients, retrieve the level from Client model
                const client = await ClientModel.findById(userId);
                if (client && client.level !== undefined) {
                    level = client.level;
                }
                break;
            default:
                // For unknown types, set the level to 4 (default)
                level = 4;
                break;
        }
    
        return {
            level,
        };
    };

    /**
     * 
     * @param updaterId 
     * @param updateeId 
     * @param newLevel 
     * @returns 
     */
    static async updateUserPermissionLevel(updaterId: string, updateeId: string, newLevel: number) {
        // Step 1: Get the levels of both the updater and updatee
        const updaterLevelData = await UserService.getUserLevel(updaterId);
        const updateeLevelData = await UserService.getUserLevel(updateeId);
    
        const updaterLevel = updaterLevelData.level;
        const updateeLevel = updateeLevelData.level;

        // Step 2: Check if the updater's level is weaker than 3 (Level 3 or more)
        if (updaterLevel >= 3) {
            throwAppError(AppErrorMessage.AUTH_INSUFFICIENT_PERMISSIONS, HTTPSTATUS.FORBIDDEN);
        }
    
        // Step 3: Check if the updater has a strictly weaker level than the updatee
        if (updaterLevel >= updateeLevel) {
            throwAppError(AppErrorMessage.AUTH_UPDATER_LEVEL_TOO_LOW, HTTPSTATUS.FORBIDDEN);
        }
    
        // Step 4: Proceed with updating the updatee's level
        // We first need to find the user model of the updatee based on their type (__t)
        const updatee = await BaseUserModel.findById(updateeId);
        if (!updatee) {
            throwAppError(AppErrorMessage.AUTH_USER_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
        }
    
        const __t = (updatee as any).__t || "Base User";
    
        let updateResult;
        switch (__t) {
            case "Managers":
                updateResult = await ManagerModel.findByIdAndUpdate(updateeId, { level: newLevel }, { new: true });
                break;
            case "Administrators":
                updateResult = await AdminModel.findByIdAndUpdate(updateeId, { level: newLevel }, { new: true });
                break;
            case "Developers":
                updateResult = await DeveloperModel.findByIdAndUpdate(updateeId, { level: newLevel }, { new: true });
                break;
            case "Clients":
                updateResult = await ClientModel.findByIdAndUpdate(updateeId, { level: newLevel }, { new: true });
                break;
            default:
                throwAppError(AppErrorMessage.AUTH_USER_NOT_FOUND, HTTPSTATUS.NOT_FOUND);
        }
    
        // Step 5: Return the updated user or throw error if update failed
        if (!updateResult) {
            throwAppError(AppErrorMessage.AUTH_USER_UPDATE_FAILED, HTTPSTATUS.INTERNAL_SERVER_ERROR);
        }
    
        return {
            updatedUser: updateResult,
            message: "User permission level updated successfully",
        };
    }
    
    static async enableMfa(userId: string, enable: boolean): Promise<void> {
        const result =  await UserService.findUserById(userId);
        const User = result?.user;
    
        if (User) {
          User.userPreferences.enable2FA = enable;
          User.save(); 
        }
    }  
}