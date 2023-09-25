const express = require("express");
const upload = require("../middleware/multerConfig");
const { validationMiddleware } = require("../middleware/validation-middleware");
const {
  getTestimonial,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  ValidateTestimonial,
} = require("../controllers/testimonials");
const passport = require("passport");
const router = express.Router();

router.get("/getTestimonials", getTestimonial);

router.post(
  "/addTestimonials",
  validationMiddleware,
  upload.single("image_path"),
  addTestimonial
);

router.put(
  "/updateTestimonial/:id",
  passport.authenticate("jwt", { session: false }),
  validationMiddleware,
  upload.single("image_path"),
  updateTestimonial
);

router.put(
  "/validateTestimonial/:id",
  passport.authenticate("jwt", { session: false }),
  validationMiddleware,
  ValidateTestimonial
);

router.delete(
  "/deleteTestimonial/:id",
  passport.authenticate("jwt", { session: false }),
  validationMiddleware,
  deleteTestimonial
);

module.exports = router;
