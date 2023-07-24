const express = require('express');
const upload = require('../middleware/multerConfig')
const { addCar } = require('../controllers/cars');
const { validationMiddleware } = require('../middleware/validation-middleware');
const router = express.Router();


router.post('/cars', validationMiddleware, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'gallery', maxCount: 10 },
]), addCar);


module.exports = router;
