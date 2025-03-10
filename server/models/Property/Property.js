import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    type: {
      type: String, // means : house, apartment
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
      type: Date,
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