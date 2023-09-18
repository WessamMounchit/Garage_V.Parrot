const express = require('express');
const router = express.Router();
const { LoginValidation, employeeRegisterValidation} = require('../validators/auth')
const { validationMiddleware } = require('../middleware/validation-middleware');
const { createEmployee, login, logout, getEmployee, updateEmployee, deleteEmployee } = require('../controllers/employee');
const passport = require('passport');



router.post('/addEmployee', passport.authenticate('jwt', { session: false }), employeeRegisterValidation, validationMiddleware, createEmployee)
router.post('/login', LoginValidation, validationMiddleware,login)
router.get('/logout', logout);

router.get('/getEmployee', passport.authenticate('jwt', { session: false }), getEmployee); 
router.put('/updateEmployee/:id', passport.authenticate('jwt', { session: false }), updateEmployee); 
router.delete('/deleteEmployee/:id', passport.authenticate('jwt', { session: false }), deleteEmployee);

module.exports = router;
