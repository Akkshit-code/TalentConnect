const express = require("express");
const { registerUser, loginUser, userDetails } = require("../userController");
const {
  userRegisterValidate,
  userLoginValidate,
  userCollegeDetails,
} = require("../utils/userValidation");
const { ensureAuthenticated } = require("../utils/auth");
const routes = express.Router();

routes.post("/register", userRegisterValidate, registerUser);

routes.post("/login", userLoginValidate, loginUser);
routes.post("/details", userCollegeDetails, userDetails);
module.exports = routes;
