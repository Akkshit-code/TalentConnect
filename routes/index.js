const express = require("express");
const {
  registerUser,
  loginUser,
  userDetails,
  registerCollege,
  loginCollege,
} = require("../userController");
const {
  userRegisterValidate,
  userLoginValidate,
  userCollegeDetails,
  collegeRegisterValidate,
  collegeLoginValidate,
} = require("../utils/userValidation");
const { ensureAuthenticated } = require("../utils/auth");
const routes = express.Router();

routes.post("/register", userRegisterValidate, registerUser); //for register of user
routes.post("/login", userLoginValidate, loginUser); // for login of user
routes.post("/details", userCollegeDetails, userDetails); // for getting the college details
routes.post("/collegeregister", collegeRegisterValidate, registerCollege); // for signup of college
routes.post("/collegelogin", collegeLoginValidate, loginCollege); // for login of college

module.exports = routes;
