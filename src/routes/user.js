const express=require('express');
const userRouter=express.Router();
const {userauth}=require('../middleware/auth.js');
const ConnectionRequest=require('../models/connectionrequest.js');
const User_safe_data='firstName lastName gender '
const User=require('../models/user.js');


userRouter.get('/user/requests/requestreceived',userauth,async(req,res)=>{
    try{
        const user=req.user;
        const connectRequest=await ConnectionRequest.find(
            {toUserId:user._id,
            status:'interested'}).populate('fromUserId','firstName lastName ');
        res.json({
            message:'Connection requests received fetched successfully',
            data:connectRequest,
        });

    }
    catch(err){
        res.status(400).send('Error:--'+err.message);
    }
});

userRouter.get('/user/connections',userauth,async(req,res)=>{
    try{
        const user=req.user;
        const connections=await ConnectionRequest.find({
            $or:[
                {fromUserId:user._id,status:'accepted'},
                {toUserId:user._id,status:'accepted'},
                ],
        }).populate('fromUserId',User_safe_data);
        const data=connections.map((row )=>row.fromUserId._id .equals(user._id)? row.toUserId:row.fromUserId);
        res.json({data});
        }
    catch(err){
        res.status(400).send('Error:--'+err.message);
    }
});

userRouter.get('/user/feed',userauth,async(req,res)=>{
    try{
        const loggeduser=req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 2;
        limit = limit > 50 ? 50 : limit;

        const skip = (page - 1) * limit;
        


        const connectRequests=await ConnectionRequest.find({
            $or:[{fromUserId:loggeduser._id},{toUserId:loggeduser._id}],
        });
        const hideusersfromFeed=new Set();
        connectRequests.forEach((request)=>{
            hideusersfromFeed.add(request.fromUserId.toString());
            hideusersfromFeed.add(request.toUserId.toString());
        }   );
        const feedUsers=await User.find({
            $and :[
                {_id:{$nin:Array.from(hideusersfromFeed)},},
                {_id:{$ne:loggeduser._id}},
            ],
        })
        .select(User_safe_data)
        .skip(skip)
        .limit(limit);

        res.json({data:feedUsers});
    }
    catch(err){
        res.status(400).send('Error:--'+err.message);
    }
});


module.exports=userRouter;