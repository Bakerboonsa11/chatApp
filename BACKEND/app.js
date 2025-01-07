const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Routers
const userRoute = require("./Routes/userRoutes");
// Controllers
const errorController = require("./Controllers/errorController");

const App = express();

App.use(morgan("dev"));
App.use(express.static(`${__dirname}/public`));
App.use(express.json());
App.use(cookieParser());

App.use("/api/v1/user", userRoute); // Use the user route for user-related actions

App.use(errorController); // Use error handling middleware at the end

module.exports = App;
