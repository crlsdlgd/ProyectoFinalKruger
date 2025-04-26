import { User } from "../models/user.model.js";

const saveUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};
const loginUser = async (email , password) =>{
  const user = await User.findOne({email});
  if(!user){
    return null;
  }
  const isMatch = await user.matchPassword(password);
  if(!isMatch){
    return null;
  }
  return user;
}

export { saveUser , loginUser };