const appError=require('../utils/appError')
const catchAsync=require('../utils/asyncFun')
const factoryfn=require('../Controllers/factoryfunction')
const Message=require('../model/messaeModel')

exports.createMessage = factoryfn.createOne(Message)

exports.updateMessage=factoryfn.updateOne(Message)
exports.deleteMessage=factoryfn.deleteOne(Message)
exports.findAll=factoryfn.getAll(Message)
exports.getMessage=factoryfn.getOne(Message)

exports.currentMessages=catchAsync(
    async(req,res,next)=>{
        // first get the two parameters from the requst 
        console.log("entered the create message")
  const {id,toUser}=req.params
  console.log(id,toUser)
  if(!id || !toUser){
    return new appError("please provide the full id to se the messages",400)

  }
  console.log("its about to featch the message")
  const messages= await Message.create(req.body);
  console.log("after the message is feetched".messages)
  if(!messages){
    return new appError("there is no message with this info",400)
  }

     
    res.status(200).json({
        status:"success",
        messages:messages
    })   // thn find the message the fit the the to params
        // send back the message 
    }
)
exports.currentActiveUserMessage=catchAsync(async(req,res,next)=>{
    const {id,toUser}=req.params
    console.log("cookieheader",req.headers.authorization.split(' ')[1])
    console.log('cookies',req.cookies.jwt)

  if(!id && !toUser){
    return new appError("there is missconfigured info",400)
  }
console.log(id,toUser)
const messages=await Message.find({createdBy:id,createdFor:toUser})
console.log(messages)
 if (!messages){
    return new appError("there is data with this information",400)
 }

 res.status(200).json({
    status:"success",
    length:messages.length,
    messages
 })

})