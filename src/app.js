const express = require('express');
const app=express();
const connectDB = require('./config/database.js');
const User = require('./models/user.js');
const {validatesignupdata}=require('./utils/validation.js');
const cookieparser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {userauth}=require("./middleware/auth.js");
const port = 3000;

app.use(express.json());
app.use(cookieparser());

const authRouter=require('./routes/auth.js');
const profileRouter=require('./routes/profile.js');
const sendRequestRouter=require('./routes/request.js');


app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',sendRequestRouter);

// app.post('/signup',async(req,res)=>{
//   const {firstName,lastName,gender,email,password}=req.body;
//   try{
//     validatesignupdata(req);
//     const hashedPassword=await bcrypt.hash(password,10);
//     const user=new User({
//       firstName,lastName,gender,email,password:hashedPassword   }
//     );
//     await user.save();
//   res.send('User signed up successfully');
//   }
//   catch(err){
//     return res.status(400).send("Error:"+err.message);

//   }
  
  
 
// });

// app.post('/login',async(req,res)=> {
//   const {email,password}=req.body;
//   try{
//     const user=await User.findOne({email});
//     if(!user){
//       throw new Error('invalid credentials');
//     }
  
//     const isMatch=await user.validatepassword(password);
//     if(isMatch){
      
//       // const token=jwt.sign({userId:user._id},'Nanda@07');
//       const token=await user.getJwtToken();
//       res.cookie('token',token);
//       res.send('login successful');
//     }
//     else{
//       throw new Error('invalid credentials');
//     }
//     }
//   catch(err){
//     res.status(400).send('Error:'+err.message);
//   }

// });

// app.get('/profile',userauth,async(req,res)=> {
//   try{
//   const user=req.user;
//   res.send(user);
//   }
//   catch(err){
//     res.status(400).send('Error:'+err.message);
//   }
// });

// app.post('/sendconnectrequest',userauth,async(req,res)=>{

//   console.log("sending connection request");
//   const user=req.user;
//   res.send(user.firstName +"send connecction request" );

// });
// app.get('/users', async (req, res) => {
//   const userEmail = req.query.email;
  
//   // 1. Debugging log: See EXACTLY what the server received
//   console.log("Query Params received:", req.query); 
//   console.log("Looking for email:", userEmail);

//   try {
//     const user = await User.findOne({ email: userEmail });
    
//     // 2. Handle if user does not exist
//     if (!user) {
//       return res.status(404).send("User not found in database");
//     }

//     res.send(user);
//   } catch (err) {
//     res.status(500).send("Error: " + err.message);
//   }
// });

// app.get('/feed',async(req,res)=>{
//   const users=await User.find();
//   res.send(users);
// });

// app.delete('/user',async(req,res)=>{
//   const userId=req.query.userId;
//   try{
//    await User.findByIdAndDelete({_id:userId});
//     res.send('user deleted successfully');
//   }
//   catch(err){
//     res.status(500).send('error while deleting user'+err.message);  
//   }
// });


// app.patch('/user/:userId',async(req,res)=>{
//   const userId=req.params?.userId;
//   const data=req.body;
//   try{
//     const allwedUpdates=['firstName','lastName','age','gender'];
//     const isallowed=Object.keys(data).every((update)=>{
//       return allwedUpdates.includes(update);
//     });
//     if(!isallowed){
//       return res.status(400).send('invalid updates');
//     }
    
//     await User.findByIdAndUpdate({_id:userId},data,{runValidators:true});
//     res.send('user updated successfully');
//   }
   
//   catch(err){
//     res.status(500).send('error while updating user'+err.message);  
//   }
  
// });

// app.get('/users', async (req, res) => {
//   const userEmail=req.query.email;
//   try{
//     console.log('Fetching user with email:', userEmail);
//     const user=await User.findOne({email:userEmail});
//     res.send(user);
//   }
// //     if (user.length===0){
// //       res.status(404).send('user not found');
// //     }
// //     else{
// //       res.send(user);
// //     }
// //   }
//   catch(err){
    
//     res.status(500).send('error while fetching user'+err.message);
// }
// });

connectDB()
.then(  () => { console.log('Database connected successfully');
  app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
 })
 .catch((err) => {
  console.error('Database connection failed:', err);
 });

// const {adminauth,userauth}=require("./middleware/auth.js");
// app.use('/admin', adminauth);

// app.get('/admin/getalldata', (req, res) => {
//   res.send('This is the admin data');
// });
// // app.use('/',(err,req,res,next)=>{
// //   if(err){
// //    console.error(err.stack);
// //     res.status(500).send('Something broke!');
// //  }
// //  });

// app.get('/user/getprofile', userauth, (req,res) => {
//   try{
//   throw new Error('Sjksiasaosdoahsdoa');
//   res.send('This is the user profile data');}
//   catch(err){
   
//     res.status(500).send('Something broke!');
//   }
// });

// // app.use('/',(err,req,res,next)=>{
// //   if(err){
// //    console.error(err.stack);
// //     res.status(500).send('Something broke!');
// //  }
// //  });


