const express=require('express');
const authRouter=express.Router();
const User=require('../models/user.js');
const {validatesignupdata}=require('../utils/validation.js');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {userauth}=require('../middleware/auth.js');


authRouter.post('/signup',async(req,res)=>{
  const {firstName,lastName,gender,email,password}=req.body;
  try{
    validatesignupdata(req);
    const hashedPassword=await bcrypt.hash(password,10);
    const user=new User({
      firstName,lastName,gender,email,password:hashedPassword   }
    );
    await user.save();
  res.send('User signed up successfully');
  }
  catch(err){
    return res.status(400).send("Error:"+err.message);

  }
  
  
 
});

authRouter.post('/login',async(req,res)=> {
  const {email,password}=req.body;
  try{
    const user=await User.findOne({email});
    if(!user){
      throw new Error('invalid credentials');
    }
  
    const isMatch=await user.validatepassword(password);
    if(isMatch){
      
      // const token=jwt.sign({userId:user._id},'Nanda@07');
      const token=await user.getJwtToken();
      res.cookie('token',token);
      res.send('login successful');
    }
    else{
      throw new Error('invalid credentials');
    }
    }
  catch(err){
    res.status(400).send('Error:'+err.message);
  }

});

authRouter.post('/logout',userauth,async(req,res)=>{
    res.cookie('token','null',{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.send('logout successful');
});

module.exports=authRouter;