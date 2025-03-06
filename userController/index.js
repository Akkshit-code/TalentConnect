const {
  UserModel,
  CollegeModel,
  CollegeAuthModel,
  StudentdetailsModel,
  ReviewModel,
  CutoffModel,
  ScholarshipModel,
} = require("../models/UserModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  registerUser: async (req, res) => {
    const userModel = new UserModel(req.body);
    userModel.password = await bcrypt.hash(req.body.password, 10);
    try {
      const response = await userModel.save();
      response.password = undefined;
      return res.status(201).json({ message: "success", data: response });
    } catch (err) {
      return res.status(500).json({ message: "error" });
    }
  },
  loginUser: async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Auth failed,Invalid username/password" });
      }
      const isPassEqual = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPassEqual) {
        return res
          .status(401)
          .json({ message: "Auth failed,Invalid username/password" });
      }
      const tokenObject = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };
      const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {
        expiresIn: "4h",
      });

      return res.status(200).json({ jwtToken, tokenObject });
    } catch (err) {
      return res.status(500).json({ message: "error", err });
    }
  },

  userDetails: async (req, res) => {
    try {
      const { name, location, ranking, averagepackage } = req.body;

      // Example: Saving data to a database (Assume MongoDB & Mongoose)
      const college = new CollegeModel({
        name,
        location,
        ranking,
        averagepackage,
      });

      await college.save();

      return res
        .status(201)
        .json({ message: "College details saved successfully", college });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  registerCollege: async (req, res) => {
    try {
      if (!req.body.collegepassword) {
        return res.status(400).json({ message: "Password is required" });
      }

      const hashedPassword = await bcrypt.hash(req.body.collegepassword, 10);
      const collegeAuthModel = new CollegeAuthModel({
        ...req.body,
        collegepassword: hashedPassword,
      });

      const response = await collegeAuthModel.save();
      response.collegepassword = undefined; // Hide password

      return res.status(201).json({ message: "success", data: response });
    } catch (err) {
      return res.status(500).json({ message: "error", error: err.message });
    }
  },
  loginCollege: async (req, res) => {
    try {
      // Find college by email
      const college = await CollegeAuthModel.findOne({
        collegeemail: req.body.collegeemail,
      });

      if (!college) {
        return res
          .status(401)
          .json({ message: "Auth failed, Invalid username/password" });
      }

      // Ensure password is provided
      if (!req.body.collegepassword) {
        return res.status(400).json({ message: "Password is required" });
      }

      // Compare passwords
      const isPassEqual = await bcrypt.compare(
        req.body.collegepassword,
        college.collegepassword
      );

      if (!isPassEqual) {
        return res
          .status(401)
          .json({ message: "Auth failed, Invalid username/password" });
      }

      // Generate token
      const tokenObject = {
        _id: college._id,
        collegename: college.collegename,
        collegeemail: college.collegeemail,
      };

      const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {
        expiresIn: "4h",
      });

      return res.status(200).json({ jwtToken, tokenObject });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
  },
  studentdetails: async (req, res) => {
    try {
      const { studentname, studentemail, studentphoneno, studentlocation } =
        req.body;
      const existingStudent = await StudentdetailsModel.findOne({
        studentemail,
      });
      if (existingStudent) {
        return res
          .status(400)
          .json({ message: "Student profile already exists" });
      }
      const newStudent = new StudentdetailsModel({
        studentname,
        studentemail,
        studentphoneno,
        studentlocation,
      });
      await newStudent.save();
      res.status(201).json({
        message: "Student profile created successfully",
        student: newStudent,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },

  reviewdetails: async (req, res) => {
    try {
      const { studentemail, rating, reviewtext, pros, cons } = req.body;
      const review = new ReviewModel({
        studentemail,
        rating,
        reviewtext,
        pros,
        cons,
      });
      const savedReview = await review.save();

      res.status(201).json({
        message: "Review Added Successfully",
        review: savedReview, // Return the saved review object
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },

  cutoffdetails: async (req, res) => {
    try {
      const {
        collegename,
        coursename,
        examname,
        category,
        quota,
        cutoffrank,
        admissionyear,
      } = req.body;
      const review = new CutoffModel({
        collegename,
        coursename,
        examname,
        category,
        quota,
        cutoffrank,
        admissionyear,
      });
      const savedReview = await review.save();
      return res.status(201).json({
        message: "Cutoffs Added Successfully",
        review: savedReview,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
  scholarshipdetails: async (req, res) => {
    try {
      const { ScholarshipName, ScholarshipMoney, ScholarshipDescription } =
        req.body;
      const scholarships = new ScholarshipModel({
        ScholarshipName,
        ScholarshipMoney,
        ScholarshipDescription,
      });
      const savedReview = await scholarships.save();
      return res.status(201).json({
        message: "Scholarships Added Successfully",
        review: savedReview,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
};
