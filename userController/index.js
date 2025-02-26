const {
  UserModel,
  CollegeModel,
  CollegeAuthModel,
} = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // validate req.body
  // create MongoDB UserModel
  // do password encryption
  // return response to the client
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

  // check user using email
  // compare password
  // create jwt token
  // send resume to client
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
};
