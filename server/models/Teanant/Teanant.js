import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "property",
      required: true,
    },
    leaseStartDate: { type: Date, required: true },
    leaseEndDate: { type: Date, required: true },
    paymentHistory: [
      {
        amount: { type: Number },
        paidDate: { type: Date, default: Date.now },
        status: { type: String, default: "Paid" }, // 'Paid', 'Pending'
      },
    ],
    contact: {
      phone: { type: String },
      email: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const tenantModel = mongoose.model("tenant", tenantSchema, "tenant");

export default tenantModel;
