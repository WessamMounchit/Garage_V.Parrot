const express = require("express");
const router = express.Router();
const {
  LoginValidation,
  employeeRegisterValidation,
} = require("../validators/auth");
const { validationMiddleware } = require("../middleware/validation-middleware");
const {
  createEmployee,
  login,
} = require("../controllers/auth");
const { passportAuth } = require("../middleware/passport-auth");

router.post(
  "/register-employee",
  passportAuth,
  employeeRegisterValidation,
  validationMiddleware,
  createEmployee
);
router.post("/login", LoginValidation, validationMiddleware, login);

module.exports = router;
