import { BaseUserModel } from "../../database/models/user.model";
import { getUserPermissionLevel } from "./get-user-permission";

export const updateUserPermission = async (
  requesterId: string,
  targetUserId: string,
  newLevel: number
): Promise<string> => {
  try {
    // Get the requester and target user's current roles and levels
    const requester = await getUserPermissionLevel(requesterId);
    const targetUser = await getUserPermissionLevel(targetUserId);

    // 1. Check if the requester has sufficient permissions (Level 1 or 2)
    if (requester.level > 2) {
      throw new Error("You do not have permission to update user roles.");
    }

    // 2. Prevent updating users with the same or higher level
    if (targetUser.level <= requester.level) {
      throw new Error("You cannot update users with the same or higher level as yourself.");
    }

    // 3. Prevent a user from updating their own level
    if (requesterId === targetUserId) {
      throw new Error("You cannot update your own role.");
    }

    // 4. Update the target user's level in the database
    const targetUserDoc = await BaseUserModel.findById(targetUserId);
    if (!targetUserDoc) {
      throw new Error("Target user not found.");
    }

    // Update the discriminator's level field
    targetUserDoc.set({ level: newLevel });
    await targetUserDoc.save();

    return `User role updated successfully to level ${newLevel}.`;
  } catch (error) {
    if (error instanceof Error) {
      // Safely access the `message` property
      console.error("Error updating user permissions:", error.message);
      throw new Error(error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("An unknown error occurred.");
    }
  }
};

