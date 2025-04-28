import { Flat } from "../models/flat.model.js";

const saveFlat = async (flatData, ownerId) => {
  const flat = new Flat({ ...flatData, ownerId });
  return await flat.save();
};

const updateFlat = async (flatId, flat) => {
  const flatToUpdate = await Flat.findOneAndUpdate(
    { _id: flatId, deletedAt: null },
    { ...flat, updatedAt: new Date() },
    { new: true }
  );
  return flatToUpdate;
};

const deleteFlat = async (flatId) => {
  const flat = await Flat.findOneAndUpdate(
    { _id: flatId, deletedAt: null },
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

const getFlatById = async (flatId) => {
  const flat = await Flat.findOne({ _id: flatId, deletedAt: null });
  return flat;
};

export { saveFlat, updateFlat, deleteFlat, getAllFlats, getFlatById };
