const express = require('express');
const router = express.Router();
const { LoginValidation, employeeRegisterValidation} = require('../validators/auth')
const { validationMiddleware } = require('../middleware/validation-middleware');
const { createEmployee, login, logout} = require('../controllers/employee')



router.post('/addEmployee', employeeRegisterValidation, validationMiddleware, createEmployee)
router.post('/login', LoginValidation, validationMiddleware,login)
router.get('/logout', logout);



module.exports = router;
