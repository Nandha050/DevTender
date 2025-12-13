const validator = require('validator');
const validatesignupdata=(req)=>{
    const{firstName,lastName,email,password}=req.body;
    if(!firstName || !lastName ){
        throw new Error('first name and last name are required');
    }
    else if(firstName.length<2 || lastName.length>30){
        throw new Error('first name and last name must be between 2 and 30 characters');
    }
else if(!validator.isEmail(email)){
    throw new Error('invalid email');
}   
else if(!validator.isStrongPassword(password))
    {
        throw new Error('password is not strong enough');
    }

};
const validatepatchdata=(req)=>{
    const validFields=['firstName','lastName','gender'];
    const data=req.body;
    const fieldsToUpdate=Object.keys(data);
    const isvalid=fieldsToUpdate.every((field)=>{
        return validFields.includes(field);
    });
    if(!isvalid){
        throw new Error('invalid updates..');
    }
};
module.exports={validatesignupdata,validatepatchdata};
