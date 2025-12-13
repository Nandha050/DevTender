const express = require('express');
const profileRouter = express.Router();
const { userauth } = require('../middleware/auth.js');
const {validatepatchdata} = require('../utils/validation.js');
const bcrypt = require('bcrypt');

profileRouter.get('/profile/view',userauth,async(req,res)=> {
  try{
  const user=req.user;
  res.send(user);
  }
  catch(err){
    res.status(400).send('Error:'+err.message);
  }
});

profileRouter.patch('/profile/edit', userauth, async(req,res)=>{
    try{
        // 1. Just call the validator. If it throws, the catch block handles it.
        if(validatepatchdata(req)) {
            throw new Error('Invalid updates');
        }
        const loggeduser=req.user;
        Object.keys(req.body).forEach((key)=>{
            loggeduser[key]=req.body[key];
        });
        await loggeduser.save();
        res.json({
            message:`${loggeduser.firstName},updated successfully`,
            data:loggeduser
        });
        
    }       
    catch(err){
        // This block catches the 'invalid updates' error
        res.status(400).send("Error:"+err.message);
    }
});

profileRouter.patch('/profile/resetpassword',userauth,async(req,res)=>{
    try{
        const loggeduser=req.user;
        loggeduser.password=req.body.password;
        loggeduser.password=await bcrypt.hash(loggeduser.password,10)
        await loggeduser.save();
        res.send('password reset successfully');
    }   
    catch(err){
        res.status(400).send("Error:"+err.message);
    }
});

module.exports=profileRouter;