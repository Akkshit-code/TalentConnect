import express from "express";
import {
  registerStudent,
  loginStudent,
  registerCollege,
  loginCollege,
} from "../userController/controllers.js";
import {
  StudentRegisterValidate,
  StudentLoginValidate,
  collegeRegisterValidate,
  collegeLoginValidate,
} from "../utils/Validation.js";

const routes = express.Router();

routes.post("/register", StudentRegisterValidate, registerStudent,); // for register of user
routes.post("/login", StudentLoginValidate,loginStudent, ); // for login of user
routes.post("/collegeregister", collegeRegisterValidate, registerCollege); // for signup of college
routes.post("/collegelogin", collegeLoginValidate, loginCollege); // for login of college

export default routes;
