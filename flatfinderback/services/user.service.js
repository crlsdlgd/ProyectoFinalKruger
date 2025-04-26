import jwt from "jsonwebtoken";
import { saveUser, loginUser as loginUserRepository} from "../repository/user.repository.js";

const createUser = async (user) => await saveUser(user);

const loginUser = async (email , password) => {
    const user = await loginUserRepository(email, password);
    if(!user){
        return null;
    }
    const token = jwt.sign({id: user._id, email: user.email, role: user.role, name: user.firstname}, process.env.JWT_SECRET, {expiresIn: "10min"});
    return{token};


}



export { createUser , loginUser };