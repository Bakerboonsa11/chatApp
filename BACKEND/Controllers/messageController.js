const appError=require('../utils/appError')
const catchAsync=require('../utils/asyncFun')
const factoryfn=require('../Controllers/factoryfunction')
const Message=require('../model/messaeModel')

exports.createMessage = factoryfn.createOne(Message)

exports.updateMessage=factoryfn.updateOne(Message)
exports.deleteMessage=factoryfn.deleteOne(Message)
exports.findAll=factoryfn.getAll(Message)
exports.getMessage=factoryfn.getOne(Message)