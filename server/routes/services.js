const express = require("express");
const upload = require("../middleware/multerConfig");
const { validationMiddleware } = require("../middleware/validation-middleware");
const {
  getService,
  addService,
  updateService,
  deleteService,
} = require("../controllers/services");
const { passportAuth } = require("../middleware/passport-auth");
const router = express.Router();

router.get("/get", getService);

router.post(
  "/add",
  passportAuth,
  validationMiddleware,
  upload.single("image_path"),
  addService
);

router.put(
  "/update/:id",
  passportAuth,
  validationMiddleware,
  upload.single("image_path"),
  updateService
);

router.delete(
  "/delete/:id",
  passportAuth,
  validationMiddleware,
  deleteService
);

module.exports = router;
