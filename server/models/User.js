import mongoose from "mongoose";

// create user schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 8,
    },
    photo: {
      type: String,
      default: null,
      trim: true,
    },
    accessToken: {
      type: String,
      default: null,
      trim: true,
    },
    isActivate: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// export default
export default mongoose.model("User", userSchema);
