const express = require("express");
const upload = require("../middleware/multerConfig");
const {
  addCar,
  getCar,
  updateCar,
  deleteCar,
  getSelectedCar,
  getLatestCars,
} = require("../controllers/cars");
const { validationMiddleware } = require("../middleware/validation-middleware");
const { passportAuth } = require("../middleware/passport-auth");
const router = express.Router();

router.get("/get", getCar);
router.get("/get/:id", getSelectedCar);
router.get("/get-latest", getLatestCars);

router.post(
  "/add",
  passportAuth,
  validationMiddleware,
  upload.fields([
    { name: "image_path", maxCount: 1 },
    { name: "gallery", maxCount: 3 },
  ]),
  addCar
);

router.put(
  "/update/:id",
  passportAuth,
  validationMiddleware,
  upload.fields([
    { name: "image_path", maxCount: 1 },
    { name: "gallery", maxCount: 3 },
  ]),
  updateCar
);

router.delete(
  "/delete/:id",
  passportAuth,
  validationMiddleware,
  deleteCar
);

module.exports = router;
