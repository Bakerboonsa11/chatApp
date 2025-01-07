const express = require('express');
const userController =require('../Controllers/userControllers')
const Router = express.Router();

Router.route('/')
  .get(userController.createUser);


module.exports = Router; // Export the Router
