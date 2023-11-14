const express = require("express");
const router = express.Router();
const {
  getOpeningHours,
  updateOpeningHours,
} = require("../controllers/openingHours");
const { passportAuth } = require("../middleware/passport-auth");

router.get("/get", getOpeningHours);
router.put(
  "/update",
  passportAuth,
  updateOpeningHours
);

module.exports = router;
