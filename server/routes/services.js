const express = require("express");
const upload = require("../middleware/multerConfig");
const { validationMiddleware } = require("../middleware/validation-middleware");
const {
  getService,
  addService,
  updateService,
  deleteService,
} = require("../controllers/services");
const passport = require("passport");
const router = express.Router();

router.get("/getServices", getService);

router.post(
  "/addServices",
  passport.authenticate("jwt", { session: false }),
  validationMiddleware,
  upload.single("image_path"),
  addService
);

router.put(
  "/updateService/:id",
  passport.authenticate("jwt", { session: false }),
  validationMiddleware,
  upload.single("image_path"),
  updateService
);

router.delete(
  "/deleteService/:id",
  passport.authenticate("jwt", { session: false }),
  validationMiddleware,
  deleteService
);

module.exports = router;
