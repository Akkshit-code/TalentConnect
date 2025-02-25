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
const CollegeModel = mongoose.model("College", CollegeSchema);
const UserModel = mongoose.model("users", UserSchema);
module.exports = { UserModel, CollegeModel };
