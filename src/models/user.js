const mongoose = require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        required: true,
        type: String,
        validate(value){
            if(!['male','female','other'].includes(value.toLowerCase())){
                throw new Error("gender data not valid");
            }
        },

    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid'+value);
            }
        
            }
    
    }  ,
    password: {
        type: String,
        required: true,
       validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Password is not strong enough');
            }
        }
    }
},{timestamps:true});
userSchema.methods.getJwtToken= async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},'Nanda@07',{expiresIn:'7d'});
    return token;
};
userSchema.methods.validatepassword= async function(userpassword){
    const user=this;
    return await bcrypt.compare(userpassword,user.password);
};
module.exports = mongoose.model('User', userSchema);