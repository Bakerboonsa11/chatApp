const mongoose=require('mongoose');
const User = require('./userModel');

const messageSchema=mongoose.Schema({
 
  message:{
    type:[String,'message is required']
  }
  ,
  createdAt:{
    type:Date,
    default:Date.now()
  },

  creadedBy:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:[true,['message must created by user']]
  },
  createdFor:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:[true,['message must created for user']]

  }



})


const Message=mongoose.model('Message',messageSchema);

module.exports=Message