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

router.get("/get", getTestimonial);

router.post(
  "/add",
  validationMiddleware,
  upload.single("image_path"),
  addTestimonial
);

router.put(
  "/update/:id",
  passportAuth,
  validationMiddleware,
  upload.single("image_path"),
  updateTestimonial
);

router.put(
  "/validate/:id",
  passportAuth,
  validationMiddleware,
  ValidateTestimonial
);

router.delete(
  "/delete/:id",
  passportAuth,
  validationMiddleware,
  deleteTestimonial
);

module.exports = router;
