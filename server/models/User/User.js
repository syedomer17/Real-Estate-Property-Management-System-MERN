import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      maxlength: 20,
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
    role: {
      type: String,
      enum: ["admin", "manager", "tenant", "buyer", "seller"],
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
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user",userSchema,"user");

export default userModel;