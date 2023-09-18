const express = require('express');
const upload = require('../middleware/multerConfig')
const { addCar, getCar, updateCar, deleteCar, getSelectedCar, getLatestCars } = require('../controllers/cars');
const { validationMiddleware } = require('../middleware/validation-middleware');
const passport = require('passport');
const router = express.Router();


router.get('/getCars', getCar);
router.get('/getSelectedCar/:id', getSelectedCar);
router.get('/getLatestCars', getLatestCars);

router.post('/addCars', passport.authenticate('jwt', { session: false }),  validationMiddleware, upload.fields([
  { name: 'image_path', maxCount: 1 },
  { name: 'gallery', maxCount: 3 },
]), addCar);

router.put('/updateCar/:id', passport.authenticate('jwt', { session: false }), validationMiddleware, upload.fields([
  { name: 'image_path', maxCount: 1 }, 
  { name: 'gallery', maxCount: 3 }
]), updateCar);

router.delete('/deleteCar/:id', passport.authenticate('jwt', { session: false }), validationMiddleware, deleteCar)

module.exports = router;
