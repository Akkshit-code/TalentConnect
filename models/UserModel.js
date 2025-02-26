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
const CollegeModel = mongoose.model("College", CollegeSchema); // for getting the details of the college
const UserModel = mongoose.model("students", UserSchema); // for signup and login of the user
const CollegeAuthModel = mongoose.model("collegeauth", CollegeauthSchema); // for signup and login of the college
module.exports = { UserModel, CollegeModel, CollegeAuthModel };
