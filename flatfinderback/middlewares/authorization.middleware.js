export const authorizationMiddleware = (roles)=>(req,res,next)=>{
    if(!req.user || !req.user.role){
        return res.status(403).json({message:"Acess Denied"});
    }

    if(!roles. includes(req.user.role)){
        return res.status(403).json({message:"Acess Denied"});
    }
    next();
}
