import { Flat } from "../models/flat.model.js";

const saveFlat = async (flatData, ownerId) => {
  const flat = new Flat({ ...flatData, ownerId });
  return await flat.save();
};

const updateFlat = async (flatId, flat) => {
  return await Flat.findOneAndUpdate(
    { _id: flatId, deletedAt: null },
    { ...flat, updatedAt: new Date() },
    { new: true }
  );
};

const deleteFlat = async (flatId) => {
  return await Flat.findOneAndUpdate(
    { _id: flatId, deletedAt: null },
    { deletedAt: new Date(), updatedAt: new Date() },
    { new: true }
  );
};

const getAllFlats = async (filters, selected, sort, skip, limit) => {
  return await Flat.find({ ...filters, deletedAt: null })
    .select(selected)
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

const getFlatById = async (flatId) => {
  return await Flat.findOne({ _id: flatId, deletedAt: null });
};

const getFlatOwnerId = async (flatId) => {
  return await Flat.findOne({ _id: flatId, deletedAt: null }).select("ownerId -_id").lean();
};

export { saveFlat, updateFlat, deleteFlat, getAllFlats, getFlatById, getFlatOwnerId };
