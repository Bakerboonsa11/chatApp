const catchAsync=require('../utils/asyncFun');
const appError= require('../utils/appError')
const jwt =require('jsonwebtoken');
const {promisify}=require('util')
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



exports.protect= catchAsync(async(req,res,next)=>{
    console.log('entered the protect one ')
   let token;
   // check if the header exist and start with bearer
 
  //  console.log('protect is wrunnung')
  //  console.log(req.headers.cookie)
  //  console.log(req.cookies.jwt)
if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
  token = req.headers.authorization.split(' ')[1];
  // console.log("cookie is from header")
}
else if(req.cookies.jwt){
  // console.log("jwt is from cookie")
   token=req.cookies.jwt
}

console.log('the token is ',token)

if (!token || token === 'null') {

  return next(new appError('You are not logged in! Please log in to get access.', 401));
}
 
    // console.log("the token is ",token)
   // verify the token 
   const decoded= await promisify(jwt.verify)(token,process.env.JWTSECRETWORD)
  //  console.log(decoded)
   // check weather a user is still exist 
   const freshUser= await User.findById(decoded.id)
  //  console.log("the fresh user is ",freshUser)
   if(!freshUser){
      return next(new appError("the user blonging to this token does not exist"),401)
   }
  //  console.log(decoded.iat)
   if(freshUser.ispasswordUpdated(decoded.iat)){
       return next(new appError("user changed a password pleaselogin again"),401)
    };

    req.user=freshUser
   
   next()
});


exports.strictTo = (...roles) => {
    // console.log('Entered restrict middleware');
    return (req, res, next) => {
        // console.log('User in strictTo:', req.user);
        if (!req.user || !roles.includes(req.user.roles)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};


{{{{{{{{{}}