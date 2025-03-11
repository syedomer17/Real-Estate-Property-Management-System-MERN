import express from "express";
import config from "config";
import bcrypt from "bcrypt";
import userModel from "../../models/User/User.js";
import sendEmail from "../../utils/sendEmail.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = config.get("JWT_SECRET");
const URL = config.get("SERVER_URL");

// Register
router.post("/signup", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    console.log(userName, email, password);

    if (userName.length > 20) {
      return res.status(400).json({ message: "The username is too long." });
    }
    if (userName.length < 2) {
      return res.status(400).json({ message: "The username is too short." });
    }
    const userExisting = await userModel.findOne({ email });
    if (userExisting) {
      return res.status(409).json({ message: "Email already exists." });
    }
    const duplicateName = await userModel.findOne({ userName });
    if (duplicateName) {
      return res.status(409).json({ message: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const emailToken = Math.random().toString(36).substring(2);

    const newUser = {
      userName,
      email,
      password: hashedPassword,
      userVerifiedToken: { email: emailToken },
    };
    await userModel.create(newUser);

    await sendEmail({
      subject: "Email verification",
      to: email,
      html: `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Email Verification</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
    "
  >
    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="max-width: 600px; margin: auto; background-color: #ffffff"
    >
      <tr>
        <td style="padding: 20px; text-align: center; background-color: #1e3a8a">
          <h2 style="color: #ffffff; margin: 0">Verify Your Email</h2>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px; text-align: center">
          <p style="font-size: 16px; color: #374151">
            Click the button below to verify your email address and activate
            your account.
          </p>
          <a
            href="${URL}/api/public/emailverify/${emailToken}"
            style="
              display: inline-block;
              padding: 12px 24px;
              margin-top: 12px;
              background-color: #1e3a8a;
              color: #ffffff;
              text-decoration: none;
              font-size: 16px;
              border-radius: 6px;
            "
          >
            Verify Email
          </a>
          <p style="margin-top: 20px; font-size: 14px; color: #6b7280">
            If the button doesn't work, copy and paste this URL:
          </p>
          <p
            style="
              font-size: 14px;
              color: #1e3a8a;
              word-break: break-all;
              text-align: center;
            "
          >
            ${URL}/api/public/emailverify/${emailToken}
          </p>
        </td>
      </tr>
      <tr>
        <td
          style="padding: 20px; text-align: center; background-color: #f3f4f6"
        >
          <p style="font-size: 12px; color: #6b7280">
            If you didn't request this email, you can safely ignore it.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    });

    console.log(`${URL}/api/public/emailverify/${emailToken}`);
    res
      .status(201)
      .json({
        message: "User registered successfully. Please verify your email.",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist. Please register." });
    }
    if (!user.userVerified?.email) {
      return res
        .status(403)
        .json({ message: "Please verify your email before logging in." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "100d" });
    res.status(200).json({
      message: "User logged in successfully.",
      token,
      id: user._id,
      email,
      userVerified: user.userVerified,
    });
    console.log(user);
  } catch (error) {
    console.error("Signin Error:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

// Email Verification
router.get("/emailverify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const user = await userModel.findOne({ "userVerifiedToken.email": token });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email verification token." });
    }

    user.userVerified.email = true;
    user.userVerifiedToken.email = null;
    await user.save();
    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: error.message });
  }
});

// Reset Password
router.post("/resetpassword", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const newPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await sendEmail({
      to: email,
      subject: "🔒 Password Reset Request",
      html: `<div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                    <h2 style="color: #333; text-align: center;">🔑 Password Reset</h2>
                    <p style="color: #555; font-size: 16px;">Hello,</p>
                    <p style="color: #555; font-size: 16px;">You requested a password reset. Use the new password below to log in:</p>
                    <div style="text-align: center; padding: 15px; background-color: #007bff; color: #fff; font-size: 18px; font-weight: bold; border-radius: 5px;">
                        ${newPassword}
                    </div>
                    <p style="color: #555; font-size: 16px;">For security reasons, we recommend changing this password after logging in.</p>
                    <hr style="border: none; height: 1px; background-color: #ddd;">
                    <p style="color: #777; font-size: 14px; text-align: center;">If you didn’t request this, please ignore this email.</p>
                    <p style="color: #777; font-size: 14px; text-align: center;">© 2025 YourCompany. All rights reserved.</p>
                </div>`,
    });

    res.status(200).json({ message: "New password sent to your email." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Forgot Password
router.post("/forgotpassword", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    user.userVerifiedToken.email = resetToken;
    await user.save();

    await sendEmail({
      to: email,
      subject: "🔒 Password Reset Request",
      html: `<div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                    <h2 style="color: #333; text-align: center;">🔑 Reset Your Password</h2>
                    <p style="color: #555; font-size: 16px;">Click the button below to reset your password:</p>
                    <div style="text-align: center;">
                        <a href="${URL}/resetpassword/${resetToken}" style="padding: 12px 20px; background-color: #007bff; color: #fff; text-decoration: none; font-size: 16px; border-radius: 5px;">
                            Reset Password
                        </a>
                    </div>
                    <p style="color: #777; font-size: 14px; text-align: center;">If you didn’t request this, please ignore this email.</p>
                </div>`,
    });

    res.status(200).json({ message: "Password reset link sent to email." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
