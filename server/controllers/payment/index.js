import express from "express";
import paymentModel from "../../models/Payment/Payment.js";

const router = express.Router();

// Get all payments
router.get("/getall", async (req, res) => {
  try {
    const payments = await paymentModel.find().populate("tenant property");
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get payment by ID
router.get("/getbyid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await paymentModel.findById(id).populate("tenant property");
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete all payments
router.delete("/deleteall", async (req, res) => {
  try {
    await paymentModel.deleteMany();
    res.json({ message: "All payments are deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete payment by ID
router.delete("/deletebyid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await paymentModel.findByIdAndDelete(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found." });
    }
    res.json({ message: "Payment deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Edit payment by ID
router.put("/editbyid/:id", async (req, res) => {
  try {
    const updatedPayment = await paymentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found." });
    }
    res.json(updatedPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
