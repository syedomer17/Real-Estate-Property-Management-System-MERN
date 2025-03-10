import mongoose from "mongoose";

const leaseSchema = new mongoose.Schema({
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
  leaseStartDate: { type: Date, required: true },
  leaseEndDate: { type: Date, required: true },
  rentAmount: { type: Number, required: true },
  securityDeposit: { type: Number, required: true },
  renewalTerms: { type: String }, // Terms for lease renewal
  createdAt: { type: Date, },
},{
    timestamps: true
});

const leaseModel = new mongoose.model("lease", leaseSchema, "lease");

export default leaseModel;