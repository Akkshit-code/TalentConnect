const express = require("express");
const {
  registerUser,
  loginUser,
  userDetails,
  registerCollege,
  loginCollege,
  studentdetails,
  collegedetails,
} = require("../userController");
const {
  userRegisterValidate,
  userLoginValidate,
  userCollegeDetails,
  collegeRegisterValidate,
  collegeLoginValidate,
  studentdetailsLoginValidate,
  collegeDetailsValidate,
} = require("../utils/userValidation");
const { ensureAuthenticated } = require("../utils/auth");
const routes = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage(); // Store in memory or disk
const upload = multer({ storage: storage });

routes.post("/register", userRegisterValidate, registerUser); // register for user
routes.post("/login", userLoginValidate, loginUser); //  login for user
routes.post("/details", userCollegeDetails, userDetails); // for getting the college details
routes.post("/collegeregister", collegeRegisterValidate, registerCollege); //  signup for the college admin
routes.post("/collegelogin", collegeLoginValidate, loginCollege); //  login for the college admin
routes.post("/studentdetails", studentdetailsLoginValidate, studentdetails); // for student profile
// routes.post(
//   "/collegedetails",
//   upload.fields([{ name: "brochure" }, { name: "image" }]),
//   collegedetails
// );

module.exports = routes;
