import express from "express";
import userModel from "../../models/User/User.js";

const router = express.Router();

//get all user 
router.get("/getall",async(req,res)=>{
    try {
        const user = await userModel.find();
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error})
    }
})

//get by id
router.get("/getbyid/:id",async(req,res)=>{
    try {
        const id = req.params.id
        const user = await userModel.findById(id)
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error})
    }
})

//Delete all users
router.delete("/deleteall",async(req,res)=>{
    try {
        await userModel.deleteMany();
        res.json({message:"All user are deleted successfully."})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error})
    }
})

// delete by id 
router.delete("/deletebyid/:id",async(req,res)=>{
    try {
        let id = req.params.id
        const user = await userModel.findByIdAndDelete(id)
        if(!user){
            return res.status(404).json({message:"user not found."});
        }
        res.json({message:"user deleted successfully."})
    } catch (error) {
        console.log(error);
        res.json({message:error})
    }
})

//edit by id
router.put("/editbyid/:id",async(req,res)=>{
    try {
        const editUser = await userModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        if(!editUser){
            return res.status(404).json({message:"user not found."})
        }
        res.json(editUser)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error})
    }
})

export default router;