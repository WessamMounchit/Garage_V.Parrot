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

router.get("/getCars", getCar);
router.get("/getSelectedCar/:id", getSelectedCar);
router.get("/getLatestCars", getLatestCars);

router.post(
  "/addCars",
  passportAuth,
  validationMiddleware,
  upload.fields([
    { name: "image_path", maxCount: 1 },
    { name: "gallery", maxCount: 3 },
  ]),
  addCar
);

router.put(
  "/updateCar/:id",
  passportAuth,
  validationMiddleware,
  upload.fields([
    { name: "image_path", maxCount: 1 },
    { name: "gallery", maxCount: 3 },
  ]),
  updateCar
);

router.delete(
  "/deleteCar/:id",
  passportAuth,
  validationMiddleware,
  deleteCar
);

module.exports = router;
