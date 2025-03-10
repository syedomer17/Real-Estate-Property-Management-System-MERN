import express from "express";
import leaseModel from "../../models/Lease/Lease.js";

const router = express.Router();

// Get all leases
router.get("/getall", async (req, res) => {
  try {
    const leases = await leaseModel.find().populate("tenant property");
    res.json(leases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get lease by ID
router.get("/getbyid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const lease = await leaseModel.findById(id).populate("tenant property");
    if (!lease) {
      return res.status(404).json({ message: "Lease not found" });
    }
    res.json(lease);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete all leases
router.delete("/deleteall", async (req, res) => {
  try {
    await leaseModel.deleteMany();
    res.json({ message: "All leases are deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete lease by ID
router.delete("/deletebyid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const lease = await leaseModel.findByIdAndDelete(id);
    if (!lease) {
      return res.status(404).json({ message: "Lease not found." });
    }
    res.json({ message: "Lease deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Edit lease by ID
router.put("/editbyid/:id", async (req, res) => {
  try {
    const updatedLease = await leaseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLease) {
      return res.status(404).json({ message: "Lease not found." });
    }
    res.json(updatedLease);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
