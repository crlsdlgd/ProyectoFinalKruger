import { User } from "../models/user.model.js";

const saveUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

export { saveUser };