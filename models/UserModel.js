const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CollegeSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  location: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100,
  },
  ranking: {
    type: Number,
    required: true,
  },
  averagepackage: {
    type: Number,
    required: true,
  },
});
const CollegeauthSchema = new Schema({
  collegename: {
    type: String,
    required: true,
  },
  collegeemail: {
    type: String,
    required: true,
    unique: true,
  },
  collegepassword: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const studentdetailSchema = new Schema({
  studentname: {
    type: String,
    required: true,
  },
  studentemail: {
    type: String,
    required: true,
  },
  // studentpassword: {
  //   type: String,
  //   required: true,
  // },
  studentlocation: {
    type: String,
    required: true,
  },
  studentphoneno: {
    type: Number,
    required: true,
  },
});

// const collegedetailSchema = new Schema({
//   name: { type: String, required: true },
//   collegename: { type: String, required: true },
//   location: { type: String, required: true },
//   courses: [{ name: String, fees: Number }], // Ensure courses field is an array of objects
//   faculty: [{ name: String, contact: String }], // Ensure faculty field is an array
//   placementStats: [{ lpaRange: String, count: Number }],
//   averagepackage: { type: Number, required: true },
//   ranking: { type: Number, required: true },
//   brochure: { type: String }, // URL of the PDF
//   image: { type: String }, // URL of the Image
// });

const CollegeModel = mongoose.model("College", CollegeSchema); // for getting the details of the college
const UserModel = mongoose.model("students", UserSchema); // for signup and login of the user
const CollegeAuthModel = mongoose.model("collegeauth", CollegeauthSchema); // for signup and login of the college
const StudentdetailsModel = mongoose.model(
  "studentdetail",
  studentdetailSchema
);
// const CollegedetailsModel = mongoose.model(
//   "collegedetail",
//   collegedetailSchema
// );
module.exports = {
  UserModel,
  CollegeModel,
  CollegeAuthModel,
  StudentdetailsModel,
};
