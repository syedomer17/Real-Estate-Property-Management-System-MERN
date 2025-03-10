import express from "express";
import config from "config";
import bcrypt from "bcrypt";
import userModel from "../../models/User/User.js";
import sendEmail from "../../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import e from "express";
import c from "config";

const router = express.Router();
const JWT_SECRET = config.get("JWT_SECRET");
const URL = config.get("SERVER_URL");

//register
router.post("/signup", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    console.log(userName, email, password);

    if (userName.length > 20) {
      return res.status(409).json({ message: "The userName is too long" });
    }
    if (userName.length < 2) {
      return res.status(409).json({ message: "The userName is too short" });
    }
    const userExisting = await userModel.findOne({ email });
    if (userExisting) {
      return res.status(409).json({ message: "Email already exist." });
    }
    const dublicateName = await userModel.findOne({ userName });
    if (dublicateName) {
      return res.status(409).json({ message: "userName already exist." });
    }

    const harshPassword = await bcrypt.hash(password, 10);

    const emailToken = Math.random().toString(36).substring(2);

    // newUser
    const newUser = {
      userName,
      email,
      password: harshPassword,
      userVerifiedToken: {
        email: emailToken,
      },
    };
    await userModel.create(newUser);

    await sendEmail({
      subject: "Email verification",
      to: email,
      html: `
      <!DOCTYPE html>
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
      .status(200)
      .json({
        message: "user register successfully. please verify your email.",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// login
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(409)
        .json({ message: "user does not exist. please register." });
    }
    console.log(user);
    console.log(email, password);

    // Check if email is verified
    if (!user.userVerified.email) {
      return res
        .status(409)
        .json({ message: "please verify your email before login." });
    }
    // Check password validity
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(409).json({ message: "The passoword is not matched." });
    }
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    console.log(token);
    res
      .status(200)
      .json({
        message: "user login successfully.",
        token,
        id: user._id,
        email,
        userVerified: user.userVerified,
      });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Email verification
router.get("/emailverify/:token",async(req,res)=>{
    try {
        const token = req.params;
        console.log(token);

        const user = await userModel.findOne({"userVerifiedToken.email":token})
        console.log(user);
        if(!user){
            return res.status(409).json({message:"Invalied email verification token."});
        }
        // mark email as verified token
        user.userVerified.email = true;
        user.userVerifiedToken.email = null;
        await user.save();
        res.status(200).json({ message: "Email Verified successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error})
    }
});

router.post("/ressetpassword",async(req,res)=>{
    try {
        const {email} = req.body;
        console.log(email);
        if(!email){
            return res.status(409).json({message:"user not found please register."})
        }
        let newPassword = Math.random().toString(30).split(-8);
        console.log(newPassword);

        const harshPassword = bcrypt.hash(newPassword,10);
        console.log(harshPassword);
        user.password = harshPassword;
        console.log(password);
        user.save();

        console.log(user);

        let emailData = {
            
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error})
    }
})

export default router;
