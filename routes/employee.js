const express=require('express');
const router=express.Router();
const Employee = require('../controller/employee');

router.post('/employee',[],Employee.createEmp);  // for adding employee
router.put('/employee/:id',[],Employee.updateEmp) // for update employee
router.get('/employee/:id',[],Employee.getEmpById); // for getting employee by there id
router.delete('/employee/:id',[],Employee.deleteEmp); // for delete employee record
router.get('/employee',[],Employee.getAllEmployee); // for get all employee record

module.exports=router;