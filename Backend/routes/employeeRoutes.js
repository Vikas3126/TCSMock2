const express = require('express');
const router = express.Router();
const employeeController = require('../Controller/employeeController');

router.get('/', employeeController.getEmployees);
router.post('/add', employeeController.addEmployee);
router.get('/edit/:id', employeeController.editEmployee);
router.post('/update/:id', employeeController.updateEmployee);
router.get('/delete/:id', employeeController.deleteEmployee);

module.exports = router;