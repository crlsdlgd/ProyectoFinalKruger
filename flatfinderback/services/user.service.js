import { saveUser } from "../repository/user.repository.js";

const createUser = async (user) => await saveUser(user);

export { createUser };