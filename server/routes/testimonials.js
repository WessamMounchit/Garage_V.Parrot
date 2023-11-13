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
const { passportAuth } = require("../middleware/passport-auth");
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
  passportAuth,
  validationMiddleware,
  upload.single("image_path"),
  updateTestimonial
);

router.put(
  "/validateTestimonial/:id",
  passportAuth,
  validationMiddleware,
  ValidateTestimonial
);

router.delete(
  "/deleteTestimonial/:id",
  passportAuth,
  validationMiddleware,
  deleteTestimonial
);

module.exports = router;
