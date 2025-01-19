const express=require('express')
const messageController=require('../Controllers/messageController')
const Router=express.Router({mergeParams:true})


Router.route('/')
.get(messageController.findAll)

Router.route('/:toUser')
.get(messageController.currentActiveUserMessage)
.post(messageController.currentMessages)
.patch(messageController.updateMessage)
.delete(messageController.deleteMessage)
module.exports=Router