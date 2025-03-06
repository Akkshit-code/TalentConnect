const express = require("express");
const {
  registerUser,
  loginUser,
  userDetails,
  registerCollege,
  loginCollege,
  studentdetails,
  reviewdetails,
  cutoffdetails,
  scholarshipdetails,
} = require("../userController/index");

const {
  studentRegisterValidate,
  studentLoginValidate,
  collegeRegisterValidate,
  collegeLoginValidate,
  studentdetailsValidate,
  reviewsValidate,
  cutoffsValidate,
  scholarshipsValidate,
} = require("../utils/userValidation");

const router = express.Router();

router.post("/register", studentRegisterValidate, registerUser);
router.post("/login", studentLoginValidate, loginUser);
router.post("/collegeregister", collegeRegisterValidate, registerCollege);
router.post("/collegelogin", collegeLoginValidate, loginCollege);
router.post("/studentdetails", studentdetailsValidate, studentdetails);
router.post("/reviews", reviewsValidate, reviewdetails);
router.post("/cutoffs", cutoffsValidate, cutoffdetails);
router.post("/scholarships", scholarshipsValidate, scholarshipdetails);

module.exports = router;
