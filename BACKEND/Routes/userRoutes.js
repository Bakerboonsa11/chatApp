const express = require('express');
const userController =require('../Controllers/userControllers')
const Router = express.Router();

Router.route('/')
  .post(userController.createUser)
  .get(userController.findAll)

Router.route('/:id')
.get(userController.getUser)

.patch(userController.updateUser)
.delete(userController.deleteUser)

module.exports = Router; // Export the Router
