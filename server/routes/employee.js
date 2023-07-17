const express = require('express');
const router = express.Router();
const { LoginValidation, employeeRegisterValidation} = require('../validators/auth')
const { validationMiddleware } = require('../middleware/validation-middleware');
const { createEmployee, login} = require('../controllers/employee')



router.post('/addEmployee', employeeRegisterValidation, validationMiddleware, createEmployee)
router.post('/login', LoginValidation, validationMiddleware,login)



module.exports = router;
