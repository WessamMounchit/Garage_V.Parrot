const express = require('express');
const upload = require('../middleware/multerConfig')
const { validationMiddleware } = require('../middleware/validation-middleware');
const { getTestimonial, addTestimonial, updateTestimonial, deleteTestimonial } = require('../controllers/testimonials');
const router = express.Router();


router.get('/getTestimonials', getTestimonial);

router.post('/addTestimonials', validationMiddleware, upload.single('image_path'), addTestimonial);

router.put('/updateTestimonial/:id', validationMiddleware, upload.single('image_path'), updateTestimonial);

router.delete('/deleteTestimonial/:id', validationMiddleware, deleteTestimonial)

module.exports = router;
