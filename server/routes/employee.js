const express = require('express');
const router = express.Router();
const { LoginValidation, employeeRegisterValidation} = require('../validators/auth')
const { validationMiddleware } = require('../middleware/validation-middleware');
const { createEmployee, login, logout, getEmployee, updateEmployee, deleteEmployee } = require('../controllers/employee')



router.post('/addEmployee', employeeRegisterValidation, validationMiddleware, createEmployee)
router.post('/login', LoginValidation, validationMiddleware,login)
router.get('/logout', logout);

router.get('/getEmployee', getEmployee); 
router.put('/updateEmployee/:id', updateEmployee); 
router.delete('/deleteEmployee/:id', deleteEmployee);

module.exports = router;
