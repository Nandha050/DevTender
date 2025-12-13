const mongoose= require('mongoose');
const ConnectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    status:{
        type:String,
        enum:{
            values:['accepted','rejected','ignored','interested'],
        message:'status can be either pending, accepted or rejected'},
    }, 
},{timestamps:true});




ConnectionRequestSchema.pre('save', function() { 
    const connectionRequest = this;
    
    // Check if the IDs are the same
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error('fromUserId and toUserId cannot be the same');
    }
    
});

module.exports = mongoose.model('ConnectionRequest', ConnectionRequestSchema);



module.exports=mongoose.model('ConnectionRequest',ConnectionRequestSchema);