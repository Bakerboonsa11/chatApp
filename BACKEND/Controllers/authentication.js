const catchAsync=require('../utils/asyncFun');
const appError= require('../utils/appError')
const jwt =require('jsonwebtoken');
const User = require('../model/userModel');

const signInToken=(id)=>{
    return jwt.sign({id},process.env.JWTSECRETWORD,{expiresIn:process.env.JWTEXPIRETIME})
}
const createToken =(user ,res)=>{
    const token =signInToken(user.id);

res.cookie('jwt', token, {
  httpOnly: true,
  sameSite: 'None', // Allow cross-site requests
  secure: process.env.NODE_ENV === 'production'?true:false,
  maxAge: 24 * 60 * 60 * 1000 // Cookie expiration (1 day)
});



  res.status(200).json({
    status: "success",
    token,
    user
  });


}

exports.signUp =catchAsync(async(req,res,next)=>{
    // take the info from the user 
     console.log(req.body)

    
     
 
    // create the elemnt in the data base 
    const user = await User.create(req.body)

    if (!user){
     return new appError('the user is not created do to some issue',400)
    }
    //  create a token for the user and send it to response 

   createToken(User,res)



})


  exports.signIn=catchAsync(async(req,res,next)=>{
   const {email,password}=req.body
  
  if(!email||!password) {
    return next(new appError("please provide the email or password",400))
  }
 const user=await User.findOne({email}).select("+password")

 if(!user || !await user.correctPassword(password,user.password)){
     return next(new appError("incorrct password or email",400))
 }
  // console.log(user, "is UserActivation")

 createToken(user,res)

})



