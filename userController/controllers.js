import { StudentModel, CollegeAuthModel } from "../models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerStudent = async (req, res) => {
  const studentModel = new StudentModel(req.body);
  studentModel.password = await bcrypt.hash(req.body.password, 10);
  try {
    const response = await studentModel.save();
    response.password = undefined;
    return res.status(201).json({ message: "success", data: response });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
};

export const loginStudent = async (req, res) => {
  try {
    const student = await StudentModel.findOne({ email: req.body.email });
    if (!student) {
      return res
        .status(401)
        .json({ message: "Auth failed, Invalid username/password" });
    }
    const isPassEqual = await bcrypt.compare(req.body.password, student.password);
    if (!isPassEqual) {
      return res
        .status(401)
        .json({ message: "Auth failed, Invalid username/password" });
    }
    const tokenObject = {
      _id: student._id,
      name: student.name,
      email: student.email,
    };
    const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {
      expiresIn: "4h",
    });

    return res.status(200).json({ jwtToken, tokenObject });
  } catch (err) {
    return res.status(500).json({ message: "error", err });
  }
};

export const registerCollege = async (req, res) => {
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
    response.collegepassword = undefined;

    return res.status(201).json({ message: "success", data: response });
  } catch (err) {
    return res.status(500).json({ message: "error", error: err.message });
  }
};

export const loginCollege = async (req, res) => {
  try {
    const college = await CollegeAuthModel.findOne({
      collegeemail: req.body.collegeemail,
    });

    if (!college) {
      return res
        .status(401)
        .json({ message: "Auth failed, Invalid username/password" });
    }

    if (!req.body.collegepassword) {
      return res.status(400).json({ message: "Password is required" });
    }

    const isPassEqual = await bcrypt.compare(
      req.body.collegepassword,
      college.collegepassword
    );

    if (!isPassEqual) {
      return res
        .status(401)
        .json({ message: "Auth failed, Invalid username/password" });
    }

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
};
