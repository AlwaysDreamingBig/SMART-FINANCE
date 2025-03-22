import mongoose, { Document, Schema } from "mongoose";
import { compareValue, hashValue } from "../../common/utils/bcrypt";

// User preferences (optional fields)
interface UserPreferences {
  enable2FA: boolean;
  emailNotification: boolean;
  twoFactorSecret?: string;
  totp: TOTPPreferences;
}

interface TOTPPreferences {
  enable: boolean;
  totpSecret: string;
  isTotpVerified: boolean;
}

export interface BaseUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  isEmailVerified: boolean;
  dwollaCustomerId: string;
  createdAt: Date;
  updatedAt: Date;
  userPreferences: UserPreferences;
  comparePassword(value: string): Promise<boolean>;
}

const TOTPPreferencesSchema = new Schema<TOTPPreferences>({
  enable: { type: Boolean, default: false },
  isTotpVerified: { type: Boolean, default: false },
  totpSecret: { type: String, required: false },
});

const userPreferencesSchema = new Schema<UserPreferences>({
  enable2FA: { type: Boolean, default: false },
  totp: { type: TOTPPreferencesSchema, default: {} },
  emailNotification: { type: Boolean, default: true },
  twoFactorSecret: { type: String, required: false },
});

// Base user schema with shared fields
const baseUserSchema = new Schema<BaseUserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    postalCode: {
      type: String,
      default: null,
    },
    dateOfBirth: {
      type: String,
      default: null,
    },
    ssn: {
      type: String,
      default: null,
    },
    dwollaCustomerId: {
      type: String,
      default: null,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    userPreferences: {
      type: userPreferencesSchema,
      default: {},
    },
  },
  {
    timestamps: true,
    toJSON: {},
  }
);

// Password hashing middleware
baseUserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashValue(this.password);
  }
  next();
});

// Method to compare passwords
baseUserSchema.methods.comparePassword = async function (value: string) {
  return compareValue(value, this.password);
};

// JSON transformation (to remove sensitive fields like password)
baseUserSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.userPreferences.twoFactorSecret;
    return ret;
  },
});

export const BaseUserModel = mongoose.model<BaseUserDocument>(
  "BaseUser",
  baseUserSchema,
  "Users"
);
