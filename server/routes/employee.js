const express = require("express");
const router = express.Router();
const {
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee");
const { passportAuth } = require("../middleware/passport-auth");

router.get(
  "/get",
  passportAuth,
  getEmployee
);
router.put(
  "/update/:id",
  passportAuth,
  updateEmployee
);
router.delete(
  "/delete/:id",
  passportAuth,
  deleteEmployee
);

module.exports = router;
