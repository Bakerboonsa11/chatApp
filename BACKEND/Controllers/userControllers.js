const User = require('../model/userModel');
const appError = require('../utils/appError');
const catchAsync=require('../utils/asyncFun')
const facoryFn=require('../Controllers/factoryfunction')




exports.createUser = facoryFn.createOne(User)


