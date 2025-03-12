// const express = require("express");
// const {
//   registerUser,
//   loginUser,
//   userDetails,
//   registerCollege,
//   loginCollege,
//   studentdetails,
//   reviewdetails,
//   cutoffdetails,
//   scholarshipdetails,
// } = require("../userController/index");

// const {
//   studentRegisterValidate,
//   studentLoginValidate,
//   collegeRegisterValidate,
//   collegeLoginValidate,
//   studentdetailsValidate,
//   reviewsValidate,
//   cutoffsValidate,
//   scholarshipsValidate,
// } = require("../utils/userValidation");

// const router = express.Router();

// router.post("/register", studentRegisterValidate, registerUser);
// router.post("/login", studentLoginValidate, loginUser);
// router.post("/collegeregister", collegeRegisterValidate, registerCollege);
// router.post("/collegelogin", collegeLoginValidate, loginCollege);
// router.post("/studentdetails", studentdetailsValidate, studentdetails);
// router.post("/reviews", reviewsValidate, reviewdetails);
// router.post("/cutoffs", cutoffsValidate, cutoffdetails);
// router.post("/scholarships", scholarshipsValidate, scholarshipdetails);

// module.exports = router;

// ---------------------------------------------------------------------------------------

import {
  registerUser,
  loginUser,
  // userDetails,
  registerCollege,
  loginCollege,
  studentdetails,
  reviewdetails,
  cutoffdetails,
  addCollege,
  getCollegeByCountry,
  addCollegecountry,
  scholarshipdetails,
  getCollege,
} from "../userController/index.js";

import {
  studentRegisterValidate,
  studentLoginValidate,
  collegeRegisterValidate,
  collegeLoginValidate,
  filterValidation,
  filterValidationcountry,
  studentdetailsValidate,
  reviewsValidate,
  // getCollegeByCountry,
  cutoffsValidate,
  scholarshipsValidate,
} from "../utils/userValidation.js";
// const router = express.Router();
import express from "express";

const router = express.Router();

//Akkshit Routes
router.post("/register", studentRegisterValidate, registerUser);
router.post("/login", studentLoginValidate, loginUser);
router.post("/collegeregister", collegeRegisterValidate, registerCollege);
router.post("/collegelogin", collegeLoginValidate, loginCollege);
router.post("/studentdetails", studentdetailsValidate, studentdetails);
router.post("/reviews", reviewsValidate, reviewdetails);
router.post("/cutoffs", cutoffsValidate, cutoffdetails);
router.post("/scholarships", scholarshipsValidate, scholarshipdetails);

// for filtering ranks
router.post("/filterranks", filterValidation, addCollege);
router.get("/getfilteredranks", getCollege);

// for filtering country
router.post("/filteredcountry", filterValidationcountry, addCollegecountry);
router.get("/getfilteredcountry", getCollegeByCountry);
export default router;
