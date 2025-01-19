const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

// Initialize Express app
const App = express();

// Configure CORS
App.use(
   cors(
    {
    origin: ['http://localhost:5173'], // Allow requests from your frontend
    credentials: true, // Allow cookies to be sent
  }
  )
);

// Log requests for debugging
App.use(morgan('dev'));

// Middleware to parse JSON and cookies
App.use(express.json());
App.use(cookieParser());

// Serve static files
App.use(express.static(`${__dirname}/public`));

// Routes
const userRoute = require('./Routes/userRoutes');
App.use('/api/v1/user', userRoute);

// Catch-all error handler
const errorController = require('./Controllers/errorController');
App.use(errorController);

// Export the app
module.exports = App;
