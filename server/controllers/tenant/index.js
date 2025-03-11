import express from "express";
import tenantModel from "../../models/Tenant/Tenant.js";

const router = express.Router();

// Get all tenants
router.get("/getall", async (req, res) => {
  try {
    const tenants = await tenantModel.find().populate("user property");
    res.json(tenants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get tenant by ID
router.get("/getbyid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const tenant = await tenantModel.findById(id).populate("user property");
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.json(tenant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete all tenants
router.delete("/deleteall", async (req, res) => {
  try {
    await tenantModel.deleteMany();
    res.json({ message: "All tenants are deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete tenant by ID
router.delete("/deletebyid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const tenant = await tenantModel.findByIdAndDelete(id);
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found." });
    }
    res.json({ message: "Tenant deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Edit tenant by ID
router.put("/editbyid/:id", async (req, res) => {
  try {
    const updatedTenant = await tenantModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTenant) {
      return res.status(404).json({ message: "Tenant not found." });
    }
    res.json(updatedTenant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
