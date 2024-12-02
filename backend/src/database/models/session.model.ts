import mongoose, { Document, Schema } from "mongoose";
import { thirtyDaysFromNow } from "../../common/utils/date-time";

export interface BaseSessionDocument extends Document {
  userId: mongoose.Types.ObjectId;
  userAgent?: string;
  expiredAt: Date;
  createdAt: Date;
}

const baseSessionSchema = new Schema<BaseSessionDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
    userAgent: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiredAt: {
      type: Date,
      required: true,
      default: thirtyDaysFromNow,
    },
  },
  {
    timestamps: true,
  }
);

const BaseSessionModel = mongoose.model<BaseSessionDocument>("BaseSession", baseSessionSchema);

export { BaseSessionModel };
