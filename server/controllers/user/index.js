import express from "express";
import userModel from "../../models/User/User.js";

const router = express.Router();

// ✅ Get all users
router.get("/getall", async (req, res) => {
  try {
    const users = await userModel.find();

    if (!users.length) {
      return res.status(404).json({ message: "No users found", users: [] });
    }

    res.json({ message: "Users fetched successfully", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Get user by ID (Corrected `req.params.id`)
router.get("/getbyid/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Delete all users
router.delete("/deleteall", async (req, res) => {
  try {
    await userModel.deleteMany();
    res.json({ message: "All users deleted successfully." });
  } catch (error) {
    console.error("Error deleting users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Delete user by ID (Fixed `req.params.id`)
router.delete("/deletebyid/:id", async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Edit user by ID (Fixed `req.params.id`)
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
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
