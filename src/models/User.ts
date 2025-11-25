import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  _id: string;
  email?: string;
  phone?: string;
  username: string;
  accountType: string;
  gender: string;
  dob: string;
  emotionalTest?: Array<Record<string, any>>;
  profileScores: Record<string, any>;
  userConsent: boolean;
  plan?: Record<string, any>;
  hashed_password?: string;
  disabled: boolean;
  google_sub?: string;
  apple_sub?: string;
  access_token?: string;
  refresh_token?: string;
  token_expires_at?: Date;
  parent_email?: string;
  emergency_contact?: string;
  password_reset_otp?: string;
  password_reset_otp_expires_at?: Date;
  email_verification_otp?: string;
  email_verification_otp_expires_at?: Date;
  email_verified: boolean;
  // Free Trial - Nested Object
  trial?: {
    is_active: boolean;
    status: string; // 'active', 'expired', 'never_started', 'converted'
    start_date: Date;
    end_date: Date;
  };
  created_at: Date;
  updated_at?: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    _id: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      sparse: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      sparse: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    accountType: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    emotionalTest: {
      type: [mongoose.Schema.Types.Mixed],
      default: undefined,
    },
    profileScores: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: {},
    },
    userConsent: {
      type: Boolean,
      required: true,
      default: false,
    },
    plan: {
      type: mongoose.Schema.Types.Mixed,
      default: undefined,
    },
    hashed_password: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    google_sub: {
      type: String,
      sparse: true,
      unique: true,
    },
    apple_sub: {
      type: String,
      sparse: true,
      unique: true,
    },
    access_token: {
      type: String,
    },
    refresh_token: {
      type: String,
    },
    token_expires_at: {
      type: Date,
    },
    parent_email: {
      type: String,
    },
    emergency_contact: {
      type: String,
    },
    password_reset_otp: {
      type: String,
    },
    password_reset_otp_expires_at: {
      type: Date,
    },
    email_verification_otp: {
      type: String,
    },
    email_verification_otp_expires_at: {
      type: Date,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    // Free Trial - Nested Object (Optional)
    trial: {
      type: {
        is_active: {
          type: Boolean,
          default: true,
        },
        status: {
          type: String,
          enum: ["active", "expired", "never_started", "converted"],
          default: "never_started",
        },
        start_date: {
          type: Date,
        },
        end_date: {
          type: Date,
        },
      },
      required: false,
      default: undefined,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
    },
  },
  {
    timestamps: false,
    collection: "users",
    versionKey: false,
  }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema);
