import { User } from "../models/user.model.js";

const saveUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};
const loginUser = async (email, password) => {
  const user = await User.findOne({ email, deletedAt: null });
  if (!user) {
    return null;
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return null;
  }
  return user;
};

const getUserById = async (userId) => {
  return await User.findOne({ _id: userId, deletedAt: null }).select("-password");
};

const getAllUsers = async (filters, selected, sort, skip, limit) => {
  return await User.find({ ...filters, deletedAt: null })
    .select(selected)
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

const updateUser = async (userId, user) => {
  return await User.findOneAndUpdate(
    { _id: userId, deletedAt: null },
    { ...user, updatedAt: new Date() },
    { new: true }
  ).select("-password");
};

const deleteUser = async (userId) => {
  return await User.findOneAndUpdate(
    { _id: userId, deletedAt: null },
    { deletedAt: new Date() },
    { new: true }
  ).select("-password");
};

export { saveUser, loginUser, getUserById, getAllUsers, updateUser, deleteUser };