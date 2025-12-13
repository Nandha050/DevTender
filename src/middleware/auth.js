const jwt=require('jsonwebtoken');
const User=require('../models/user');
const adminauth = (err,req,res,next)=>{
    console.log("auth middleware called");
    const token=12334;

    const verified=token===12334;
    if(!verified){
        return res.status(401).send("unauthorized");
    }
    else{
    next();

    }
}

const userauth = async (req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
           return  res.status(401).send("unauthorized: no token provided");
        }
        const decoded=await jwt.verify(token,'Nanda@07');
        const {_id}=decoded;
        const user=await User.findById(_id);
        if(!user){
            return res.status(401).send("unauthorized: user not found");
        }
        req.user=user;
       next();

    }
    catch(err){
        res.status(401).send("Error:"+err.message);
    }
}
module.exports={adminauth,userauth};