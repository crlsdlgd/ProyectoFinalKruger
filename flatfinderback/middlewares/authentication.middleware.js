import jwt from "jsonwebtoken";
import configs from "../configs/configs.js";

export const authenticationMiddleware = (req,res,next) =>{
    const authHeader = req.header("Authorization");
    if(!authHeader){
        return res.status(401).json({message:" Unauthorized"});
    }
    
    try{
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, configs.JWT_SECRET);
        req.user = decoded;
        next();
        

  } catch(error){
    res.status(401).json({message:"Invalid token"});

  }  
};
