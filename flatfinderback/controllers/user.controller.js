import { createUser , loginUser as loginUserService} from "../services/user.service.js";

const saveUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req,res) =>{
  try{
    const userLogged = await loginUserService(req.body.email, req.body.password);
    if(!userLogged){
      return res.status(401).json({message: "Invalid email or password"});
    }
    res.status(200).json(userLogged);
  } catch(error){
    res.status(401).json({message:"Invalid email or password" });

  }
}

export { saveUser , loginUser };