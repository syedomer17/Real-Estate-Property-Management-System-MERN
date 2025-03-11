import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    propertyName: {
      type: String,
      required: true, // means : house, apartment
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    bhk: {
      type: String,
      required: true,
    },
    amenities: [String], // means : parking , pool
    images: [String], // url from the propertye
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Available", "Sold", "Pending"],
      default: "Available",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const propertyModel = mongoose.model("property",propertySchema,"property")

export default propertyModel;