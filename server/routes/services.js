const express = require('express');
const upload = require('../middleware/multerConfig')
const { validationMiddleware } = require('../middleware/validation-middleware');
const { getService, addService, updateService, deleteService } = require('../controllers/services');
const router = express.Router();


router.get('/getServices', getService);

router.post('/addServices', validationMiddleware, upload.single('image_path'), addService);

router.put('/updateService/:id', validationMiddleware, upload.single('image_path'), updateService);

router.delete('/deleteService/:id', validationMiddleware, deleteService)

module.exports = router;
