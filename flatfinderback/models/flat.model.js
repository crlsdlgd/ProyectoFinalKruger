import mongoose from "mongoose";

const flatSchema = new mongoose.Schema({
  city: { type: String, required: [true, "city is required"] },
  streetName: { type: String, required: [true, "Street name is required"] },
  streetNumber: { type: Number, min: [0, "Street number must be greater than 0"], required: [true, "Street number is required"] },
  hasAC: { type: Boolean, required: [true, "has AC is required"] },
  yearBuilt: { type: Number, min: [1950, "Year built must be greater than 1950"], required: [true, "Year built is required"] },
  rentPrice: { type: Number, min: [0, "Rent price must be greater than 0"], required: [true, "Rent price is required"] },
  dateAvailable: { type: Date, required: [true, "Date available is required"] },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Owner ID is required"],
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  deletedAt: { type: Date, default: null },
});

// flatSchema.methods.toJSON = function () {
//     const flatObject = this.toObject();
//     delete flatObject.createdAt;
//     delete flatObject.updatedAt;
//     delete flatObject.deletedAt;
//     return flatObject;
// };

export const Flat = mongoose.model("flats", flatSchema);
