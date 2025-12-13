const express = require('express');
const sendRequestRouter = express.Router();
const User = require('../models/user.js');
const { userauth } = require('../middleware/auth.js');
const ConnectionRequest = require('../models/connectionrequest.js');

sendRequestRouter.post('/request/send/:status/:toUserId',userauth,async(req,res)=>{

    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;
       const validStatuses=['interested','ignored'];
       if(!validStatuses.includes(status)){
        return res
            .status(400)
            .json({message:'Error: Invalid status.'+status});
       }

    const toUser=await User.findById(toUserId);
    if(!toUser){
        return res
        .status(404)
        .json({message:'Error: User not found.'});
    }
       const existingRequest=await ConnectionRequest.findOne({
        $or:[
            {fromUserId,toUserId}, 
        // Check B: User B is 'from', User A is 'to' (to catch existing requests in reverse)
        {fromUserId:toUserId,toUserId:fromUserId},
        ],
       });

       if(existingRequest){
        return res
        .status(400)
        .json({message:'Error: Request already exists between these users.'});
       }
       
    const connectionrequest=new ConnectionRequest({
      fromUserId,
      toUserId,
        status,
       });
       const data=await connectionrequest.save();
         res.json({
            message:'Connection request sent successfully',
            data,
         });
    }
    catch(err){ 
        res.status(400).send('Error:--'+err.message);
    }

});
module.exports=sendRequestRouter;