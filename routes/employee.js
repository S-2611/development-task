const express=require('express');
const router=express.Router();
const Employee = require('../controller/employee');

router.post('/employee',[],Employee.createEmp);
router.put('/employee/:id',[],Employee.updateEmp)
router.get('/employee/:id',[],Employee.getEmpById);
router.delete('/employee/:id',[],Employee.deleteEmp);
router.get('/employee',[],Employee.getAllEmployee);

module.exports=router;