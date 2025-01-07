const User = require('../model/userModel');
const appError = require('../utils/appError');

exports.createUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);

    if (user) {
      return res.status(201).json({
        status: "success",
        message: "User created successfully",
        data: user
      });
    }
  } catch (error) {
    console.log('Error in createUser:', error); // Log the error details
    next(error); // Pass the error to the error handler
  }
};

