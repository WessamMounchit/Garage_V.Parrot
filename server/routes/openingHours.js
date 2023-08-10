const express = require('express');
const router = express.Router();
const { getOpeningHours, updateOpeningHours } = require('../controllers/openingHours');


router.get('/getOpeningHours', getOpeningHours)
router.put('/UpdateOpeningHours', updateOpeningHours);

module.exports = router;