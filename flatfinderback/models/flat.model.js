import mongoose from "mongoose";

const flatSchema = new mongoose.Schema({
    city: { type: String, required: [true, "city is required"] },
    streetName: { type: String, required: [true, "Street name is required"] },
    streetNumber: { type: Number, required: [true, "Street number is required"] },
    hasAC: { type: Boolean, required: [true, "has AC is required"] },
    yearBuilt: { type: Number, required: [true, "Year built is required"] },
    rentPrice: { type: Number, required: [true, "Rent price is required"] },
    dateAvailable: { type: Date, required: [true, "Date available is required"] },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: [true, "Owner ID is required"] },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    deletedAt: { type: Date, default: null },
});

export const Flat = mongoose.model("flats", flatSchema);
