const express = require('express');
const upload = require('../middleware/multerConfig')
const { addCar, getCar, updateCar } = require('../controllers/cars');
const { validationMiddleware } = require('../middleware/validation-middleware');
const router = express.Router();


router.get('/getCars', getCar);

router.post('/addCars', validationMiddleware, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'gallery', maxCount: 10 },
]), addCar);

router.put('/updateCar/:id', validationMiddleware, upload.fields([
  { name: 'image_path', maxCount: 1 }, 
  { name: 'gallery', maxCount: 10 }
]), updateCar);



module.exports = router;
