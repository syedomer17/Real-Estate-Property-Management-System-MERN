import express from "express";
import maintenanceModel from "../../models/Maintenance/Maintenance.js";

const router = express.Router();

// Get all maintenance requests
router.get("/getall", async (req, res) => {
  try {
    const maintenanceRequests = await maintenanceModel
      .find()
      .populate("tenant property assignedTo");
    res.json(maintenanceRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get maintenance request by ID
router.get("/getbyid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const maintenanceRequest = await maintenanceModel
      .findById(id)
      .populate("tenant property assignedTo");
    if (!maintenanceRequest) {
      return res.status(404).json({ message: "Maintenance request not found" });
    }
    res.json(maintenanceRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete all maintenance requests
router.delete("/deleteall", async (req, res) => {
  try {
    await maintenanceModel.deleteMany();
    res.json({ message: "All maintenance requests are deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete maintenance request by ID
router.delete("/deletebyid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const maintenanceRequest = await maintenanceModel.findByIdAndDelete(id);
    if (!maintenanceRequest) {
      return res
        .status(404)
        .json({ message: "Maintenance request not found." });
    }
    res.json({ message: "Maintenance request deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Edit maintenance request by ID
router.put("/editbyid/:id", async (req, res) => {
  try {
    const updatedRequest = await maintenanceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRequest) {
      return res
        .status(404)
        .json({ message: "Maintenance request not found." });
    }
    res.json(updatedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
