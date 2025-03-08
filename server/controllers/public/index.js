import express from "express"
import config from 'config'
import bcrypt from "bcrypt"
import userModel from "../../models/User/User.js";
import sendEmail from "../../utils/sendEmail.js"
import jst from "jsonwebtoken"

const router = express.Router();
const JWT_SECRET = config.get("JWT_SECRET");
const URL = config.get("SERVER_URL");

router.post("/signup", async(req,res)=>{
    try {
        const {userName , email, password} = req.body;
        console.log(userName,email,password);
        
    } catch (error) {
        console.log(error);
        res.status(409).json({message:error.message})
    }
})