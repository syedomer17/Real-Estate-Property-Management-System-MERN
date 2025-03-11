import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      maxlength: 20,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 30,
      minlength: 10,
    },
    password: {
      type: String,
      required: true,
    },
    phone:{
      type : String,
    },
    role: {
      type: String,
      enum: ["admin", "tenant", "buyer", "seller"],
      default: "buyer",
    },
    userVerified: {
      email: {
        type: Boolean,
        default: false,
      },
    },
    userVerifiedToken: {
      email: {
        type: String,
      },
      resetPassword: {
        type: String, // Stores the JWT token for password reset
      },
    },
  },
  {
    timestamps: true, 
  }
);

const userModel = mongoose.model("user", userSchema, "user");

export default userModel;
