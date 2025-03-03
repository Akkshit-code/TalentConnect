import Joi from "joi";

export const studentRegisterValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).alphanum().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

export const studentLoginValidate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).alphanum().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

export const collegeRegisterValidate = (req, res, next) => {
  const schema = Joi.object({
    collegename: Joi.string().min(3).max(100).required(),
    collegeemail: Joi.string().email().required(),
    collegepassword: Joi.string().min(4).alphanum().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

export const collegeLoginValidate = (req, res, next) => {
  const schema = Joi.object({
    collegeemail: Joi.string().email().required(),
    collegepassword: Joi.string().min(4).alphanum().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};
<<<<<<< HEAD:utils/Validation.js
=======

const studentdetailsLoginValidate = (req, res, next) => {
  const schema = Joi.object({
    studentname: Joi.string().required(),
    studentemail: Joi.string().email().required(),
    // studentpassword: Joi.string().min(6).required(),
    studentlocation: Joi.string().required(),
    studentphoneno: Joi.number().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

// const collegeDetailsValidate = (req, res, next) => {
//   const schema = Joi.object({
//     name: Joi.string().required(),
//     collegename: Joi.string().required(),
//     location: Joi.string().required(),
//     courses: Joi.string().required(), // JSON string
//     faculty: Joi.string().required(), // JSON string
//     placementStats: Joi.string().required(), // JSON string
//     averagepackage: Joi.number().required(),
//     ranking: Joi.number().required(),
//   });

//   const { error } = schema.validate(req.body);

//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }

//   next();
// };

module.exports = {
  userRegisterValidate,
  userLoginValidate,
  userCollegeDetails,
  collegeRegisterValidate,
  collegeLoginValidate,
  studentdetailsLoginValidate,
  // collegeDetailsValidate,
};
>>>>>>> e65941b (Authentication):utils/userValidation.js
