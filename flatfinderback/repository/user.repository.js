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
  const user = await User.findOne({ _id: userId, deletedAt: null });
  if (!user) return null;

  // Elimina el campo password manualmente
  user.password = undefined;
  return user;
};

const getAllUsers = async (filters, selected, sort, skip, limit) => {
  const users = await User.find({ ...filters, deletedAt: null })
    .select(selected)
    .sort(sort)
    .skip(skip)
    .limit(limit);
  const count = await User.countDocuments({ ...filters, deletedAt: null });

  return {
    items: users,
    pages: Math.ceil(count / limit)
  };
};

const updateUser = async (userId, user) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId, deletedAt: null },
    { ...user, updatedAt: new Date() },
    { new: true }
  );
  if (!updatedUser) return null;
  //a la respuesta se le quita el password en el modelo
  return updatedUser;
};

const deleteUser = async (userId) => {
  const user = await User.findOneAndUpdate(
    { _id: userId, deletedAt: null },
    { deletedAt: new Date(), updatedAt: new Date() },
    { new: true }
  );

  if (!user) {
    return null;
  };

  // Elimina el campo password manualmente
  user.password = undefined;
  return user;
};

const getFavoriteFlatsIdsByUserId = async (userId) => {
  const favoriteFlats = await User.findOne({ _id: userId, deletedAt: null }).select("favoriteFlatIds -_id").lean();
  return favoriteFlats?.favoriteFlatIds || [];
}

const isPasswordsMatchRepository = async (password, userId) => {
  const user = await User.findOne({ _id: userId, deletedAt: null });
  if (!user) return false;
  return await user.matchPassword(password);
};


export { saveUser, loginUser, getUserById, getAllUsers, updateUser, deleteUser, getFavoriteFlatsIdsByUserId, isPasswordsMatchRepository };