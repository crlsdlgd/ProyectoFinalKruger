import { Flat } from "../models/flat.model.js";

const saveFlat = async (flatData) => {
  const flat = new Flat(flatData);
  return await flat.save();
};

const updateFlat = async (id, flat) => {
  const flatToUpdate = await Flat.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { ...flat, updatedAt: new Date() },
    { new: true }
  );
  return flatToUpdate;
};

const deleteFlat = async (id) => {
  const flat = await Flat.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { deletedAt: new Date(), updatedAt: new Date() },
    { new: true }
  );
  return flat;
};

const getAllFlats = async (filters, selected, sort, skip, limit) => {
  return await Flat.find({ ...filters, deletedAt: null })
    .select(selected)
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

const getFlatById = async (id) => {
  const flat = await Flat.findOne({ _id: id, deletedAt: null });
  return flat;
};

export { saveFlat, updateFlat, deleteFlat, getAllFlats, getFlatById };
