const Joi = require("joi");

const studentRegisterValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).alphanum().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: "Bad Request", error });

  next();
};

const studentLoginValidate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).alphanum().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: "Bad Request", error });

  next();
};

const collegeRegisterValidate = (req, res, next) => {
  const schema = Joi.object({
    collegename: Joi.string().min(3).max(100).required(),
    collegeemail: Joi.string().email().required(),
    collegepassword: Joi.string().min(4).alphanum().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: "Bad Request", error });

  next();
};

const collegeLoginValidate = (req, res, next) => {
  const schema = Joi.object({
    collegeemail: Joi.string().email().required(),
    collegepassword: Joi.string().min(4).alphanum().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: "Bad Request", error });

  next();
};

const studentdetailsValidate = (req, res, next) => {
  const schema = Joi.object({
    studentname: Joi.string().required(),
    studentemail: Joi.string().email().required(),
    studentphoneno: Joi.string().length(10).pattern(/^\d+$/).required(),
    studentlocation: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Validation error", error: error.details[0].message });
  }
  next();
};

const reviewsValidate = (req, res, next) => {
  const reviewValidationSchema = Joi.object({
    studentemail: Joi.string().email().required(),
    rating: Joi.number().min(1).max(5).required(),
    reviewtext: Joi.string().required(),
    pros: Joi.string().optional(),
    cons: Joi.string().optional(),
  });
  const { error } = reviewValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

const cutoffsValidate = (req, res, next) => {
  const cutoffs = Joi.object({
    // collegename , coursename , examname , category , quota , cutoffrank , admissionyear
    collegename: Joi.string().required(),
    coursename: Joi.string().required(),
    examname: Joi.string().required(),
    category: Joi.string().required(),
    quota: Joi.string().required(),
    cutoffrank: Joi.number().required(),
    admissionyear: Joi.number().required(),
  });

  const { error } = cutoffs.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const scholarshipsValidate = (req, res, next) => {
  const scholarships = Joi.object({
    ScholarshipName: Joi.string().required(),
    ScholarshipMoney: Joi.number().required(),
    ScholarshipDescription: Joi.string().required(),
  });

  const { error } = scholarships.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  studentRegisterValidate,
  studentLoginValidate,
  collegeRegisterValidate,
  collegeLoginValidate,
  studentdetailsValidate,
  reviewsValidate,
  cutoffsValidate,
  scholarshipsValidate,
};

// studentemailId
// rating
// reviewText
// pros
// cons
