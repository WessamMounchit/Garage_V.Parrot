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
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee");
const { passportAuth } = require("../middleware/passport-auth");

router.post(
  "/addEmployee",
  passportAuth,
  employeeRegisterValidation,
  validationMiddleware,
  createEmployee
);
router.post("/login", LoginValidation, validationMiddleware, login);
router.get(
  "/getEmployee",
  passportAuth,
  getEmployee
);
router.put(
  "/updateEmployee/:id",
  passportAuth,
  updateEmployee
);
router.delete(
  "/deleteEmployee/:id",
  passportAuth,
  deleteEmployee
);

module.exports = router;
