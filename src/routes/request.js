const express = require('express');
const sendRequestRouter = express.Router();
const { User } = require('../models/user.js');
const { userauth } = require('../middleware/auth.js');

sendRequestRouter.post('/sendconnectrequest',userauth,async(req,res)=>{

  console.log("sending connection request");
  const user=req.user;
  res.send(user.firstName +"send connecction request" );

});
module.exports=sendRequestRouter;