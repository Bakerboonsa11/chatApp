const User = require('../model/userModel');
const appError = require('../utils/appError');
const catchAsync=require('../utils/asyncFun')
const facoryFn=require('../Controllers/factoryfunction')




exports.createUser = facoryFn.createOne(User)

exports.updateUser=facoryFn.updateOne(User)
exports.deleteUser=facoryFn.deleteOne(User)
exports.findAll=facoryFn.getAll(User)
exports.getUser=facoryFn.getOne(User)
exports.addContact=catchAsync(async (req,res,next)=>{
        //
})