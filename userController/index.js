const { UserModel, CollegeModel } = require("../models/UserModel");
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
};
