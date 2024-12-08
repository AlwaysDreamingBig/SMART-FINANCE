import mongoose, { Schema, Document, Model } from "mongoose";
import { generateUniqueCode } from "../../common/utils/generates-code";
import { VerificationEnum } from "../../common/enums/verification-code.enum";

export interface VerificationCodeDocument extends Document {
  userId: mongoose.Types.ObjectId;
  code: string;
  type: VerificationEnum;
  expiresAt: Date;
  createdAt: Date;
  usedAt?: Date; // Optional: To track when the code was used
}

interface VerificationCodeModel extends Model<VerificationCodeDocument> {
  findValidCode(
    code: string,
    type: VerificationEnum
  ): Promise<VerificationCodeDocument | null>;
}

const verificationCodeSchema = new Schema<VerificationCodeDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
    code: {
      type: String,
      unique: true,
      required: true,
      default: generateUniqueCode,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(VerificationEnum), // Validate against enum values
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // TTL index for automatic cleanup
    },
    usedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Static method to find valid codes
verificationCodeSchema.statics.findValidCode = async function (
  code: string,
  type: VerificationEnum
): Promise<VerificationCodeDocument | null> {
  return this.findOne({
    code,
    type,
    expiresAt: { $gt: new Date() },
    usedAt: null, // Ensure the code has not been used
  });
};

const VerificationCodeModel = mongoose.model<
  VerificationCodeDocument,
  VerificationCodeModel
>("VerificationCode", verificationCodeSchema, "verification_codes");

export default VerificationCodeModel;
