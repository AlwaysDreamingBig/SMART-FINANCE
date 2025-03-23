import mongoose, { Document, Schema } from "mongoose";
import { hashValue } from "../../common/utils/bcrypt";

export interface BankAccountDocument extends Document {
  userId: string;
  bankId: string;
  accountId: string;
  accessToken: string;
  fundingSourceUrl: string;
  shareableId: string;
  createdAt: Date;
  updatedAt: Date;
}

const bankAccountSchema = new Schema<BankAccountDocument>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    bankId: {
      type: String,
      required: true,
    },
    accountId: {
      type: String,
      required: true,
      unique: true,
    },
    accessToken: {
      type: String,
      required: true,
      select: false, // Hides accessToken from queries by default
    },
    fundingSourceUrl: {
      type: String,
      required: true,
    },
    shareableId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_, ret) {
        delete ret.accessToken; // Hide sensitive data in JSON response
        return ret;
      },
    },
  }
);

// Pre-save middleware to hash shareableId
bankAccountSchema.pre("save", async function (next) {
  if (this.isModified("accountId")) {
    this.shareableId = await hashValue(this.accountId); // Await the async function
  }
  next();
});

export const BankAccountModel = mongoose.model<BankAccountDocument>(
  "BankAccount",
  bankAccountSchema,
  "BankAccounts"
);
