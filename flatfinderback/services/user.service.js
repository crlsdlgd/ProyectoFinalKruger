import { saveUser, loginUser as loginUserRepository} from "../repository/user.repository.js";

const createUser = async (user) => await saveUser(user);

const loginUser = async (email , password) => await loginUserRepository(email, password);
export { createUser , loginUser };