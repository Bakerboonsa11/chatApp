const express = require('express');
const userController =require('../Controllers/userControllers')
const authencicationController=require('../Controllers/authentication')
const messageRoute=require('../Routes/messageRoutes')
const Router = express.Router();
  // AUTHENTICATIONS ROUTES

Router.use('/:id/message',messageRoute)
Router.route('/signUp')
.post(authencicationController.signUp)
Router.route('/signIn')
.post(authencicationController.signIn)

Router.route('/')
  .post(userController.createUser)
  .get(userController.findAll)

Router.route('/:id')
.get(authencicationController.protect,userController.getUser)
.post(userController.addContact)
.patch(userController.updateUser)
.delete(userController.deleteUser)

module.exports = Router; // Export the Router
