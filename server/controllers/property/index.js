import express from "express";
import propertyModel from "../../models/Property/Property.js";

const router = express.Router();

// Get all properties
router.get("/getall", async (req, res) => {
  try {
    const properties = await propertyModel.find().populate("owner");
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get property by ID
router.get("/getbyid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const property = await propertyModel.findById(id).populate("owner");
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete all properties
router.delete("/deleteall", async (req, res) => {
  try {
    await propertyModel.deleteMany();
    res.json({ message: "All properties are deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete property by ID
router.delete("/deletebyid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const property = await propertyModel.findByIdAndDelete(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }
    res.json({ message: "Property deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Edit property by ID
router.put("/editbyid/:id", async (req, res) => {
  try {
    const updatedProperty = await propertyModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found." });
    }
    res.json(updatedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
