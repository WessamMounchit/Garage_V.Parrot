const express = require("express");
const router = express.Router();
const {
  getOpeningHours,
  updateOpeningHours,
} = require("../controllers/openingHours");
const { passportAuth } = require("../middleware/passport-auth");

router.get("/getOpeningHours", getOpeningHours);
router.put(
  "/UpdateOpeningHours",
  passportAuth,
  updateOpeningHours
);

module.exports = router;
