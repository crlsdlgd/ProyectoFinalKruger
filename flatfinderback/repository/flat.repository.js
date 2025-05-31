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

const getFlatsCities = async () => {
  const cities = await Flat.find({ deletedAt: null }).distinct("city");
  return cities;
};

const getTotalPages = async (limit = 10) => {
  const totalFlats = await Flat.countDocuments({ deletedAt: null });
  return Math.ceil(totalFlats / limit); // Assuming a default limit of 10 per page
};

export { saveFlat, updateFlat, deleteFlat, getAllFlats, getFlatById, getFlatOwnerId, getFlatsCities, getTotalPages };
