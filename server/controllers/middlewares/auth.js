import jwt from "jsonwebtoken"
import config from 'config'
import c from "config";


const JWT_SECRET = config.get("JWT_SECRET");

const authMiddleware = (req,res,next)=>{
    const authHeader = req.header["authorization"];
    console.log(authHeader);

    if(!authHeader){
        return res.status(409).josn({message:"No token provided"})
    }
    const token = authHeader.split(' ')[1];

    try {
        const decode = jwt.verify(token,JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log("Invalid token", error);
         res.status(401).json({ message: "Invalid token" });
    }
}