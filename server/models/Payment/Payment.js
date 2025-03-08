import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tenant",
    required: true,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "property",
    required: true,
  },
  amount: { type: Number, required: true },
  paidDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["paid", "pending"], default: "pending" },
  dueDate: { type: Date, required: true },
},{
    timestamps: true
});

const paymentModel = mongoose.model("payment",paymentSchema,"payment");

export default paymentModel;