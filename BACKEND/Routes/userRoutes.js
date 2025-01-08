const express = require('express');
const userController =require('../Controllers/userControllers')
const authencicationController=require('../Controllers/authentication')
const Router = express.Router();
  // AUTHENTICATIONS ROUTES
Router.route('/signUp')
.post(authencicationController.signUp)
Router.route('/')
  .post(userController.createUser)
  .get(userController.findAll)

Router.route('/:id')
.get(userController.getUser)

.patch(userController.updateUser)
.delete(userController.deleteUser)

module.exports = Router; // Export the Router
