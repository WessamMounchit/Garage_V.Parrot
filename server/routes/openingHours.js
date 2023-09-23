const express = require("express");
const router = express.Router();
const {
  getOpeningHours,
  updateOpeningHours,
} = require("../controllers/openingHours");
const passport = require("passport");

router.get("/getOpeningHours", getOpeningHours);
router.put(
  "/UpdateOpeningHours",
  passport.authenticate("jwt", { session: false }),
  updateOpeningHours
);

module.exports = router;
