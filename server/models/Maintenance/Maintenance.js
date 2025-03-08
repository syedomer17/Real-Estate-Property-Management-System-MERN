import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema({
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
  description: { type: String, required: true },
  reportedDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["open", "in progress", "closed"],
    default: "open",
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // Maintenance staff or manager
  resolution: { type: String }, // Description of how the issue was resolved
  resolutionDate: { type: Date },
},{
    timestamps: true
});

const maintenanceModel = mongoose.model("maintenance",maintenanceSchema,"maintenance");

export default maintenanceModel;