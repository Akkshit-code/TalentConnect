const Joi = require("joi");

const userRegisterValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).alphanum().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};
const userLoginValidate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).alphanum().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

const userCollegeDetails = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    location: Joi.string().required(),
    ranking: Joi.number().integer().required(),
    averagepackage: Joi.number().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Bad Request", error: error.details });
  }
  next();
};

const collegeRegisterValidate = (req, res, next) => {
  const schema = Joi.object({
    collegename: Joi.string().min(3).max(100).required(),
    collegeemail: Joi.string().email().required(),
    collegepassword: Joi.string().min(4).alphanum().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

const collegeLoginValidate = (req, res, next) => {
  const schema = Joi.object({
    collegeemail: Joi.string().email().required(),
    collegepassword: Joi.string().min(4).alphanum().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

module.exports = {
  userRegisterValidate,
  userLoginValidate,
  userCollegeDetails,
  collegeRegisterValidate,
  collegeLoginValidate,
};
