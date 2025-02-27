import mongoose from "mongoose";

const { Schema } = mongoose;

const StudentSchema = new Schema({
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

const CollegeAuthSchema = new Schema({
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

const StudentModel = mongoose.model("students", StudentSchema); // for signup and login of the user
const CollegeAuthModel = mongoose.model("collegeauth", CollegeAuthSchema); // for signup and login of the college

export { StudentModel, CollegeAuthModel };
