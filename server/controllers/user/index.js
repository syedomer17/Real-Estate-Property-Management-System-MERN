import express from "express";
import userModel from "../../models/User/User.js";

const router = express.Router();

// Get all users
router.get("/getall", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
    console.log(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get user by ID
router.get("/getbyid/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete all users
router.delete("/deleteall", async (req, res) => {
  try {
    await userModel.deleteMany();
    res.json({ message: "All users deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete user by ID
router.delete("/deletebyid/:id", async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Edit user by ID
router.put("/editbyid/:id", async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
