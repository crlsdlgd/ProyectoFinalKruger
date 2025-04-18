import { Flat } from "../models/flat.model.js";

const saveFlat = async (flatData) => {
  const flat = new Flat(flatData);
  return await flat.save();
};

const updateFlat = async (id, flat) => {
  const flat = await Flat.findByIdAndUpdate(id, { ...flat, updatedAt: new Date() }, { new: true });
  return flat;
};

const deleteFlat = async (id) => {
  const flat = await Flat.findByIdAndUpdate(id, { deletedAt: new Date(), updatedAt: new Date() }, { new: true });
  return flat;
};

const getAllFlats = async () => {
  const flats = await Flat.find();
  return flats;
};

const getFlatById = async (id) => {
  const flat = await Flat.findById(id);
  return flat;
};

export { saveFlat, updateFlat, deleteFlat, getAllFlats, getFlatById };