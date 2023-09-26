const Employee = require ("../model/employee");
const Joi = require ('joi');
exports.getAllEmployee=async(req, res)=>{
    const emps=await Employee.find({})
    if(emps.length>0){
        return res.json({status:"success",data:emps,message:"record get successfully"}); 
    }
        return res.json({status:"failed",message:"No record found"})
}

exports.createEmp= async(req, res)=>{
    const {error}= validater(req.body);// eqv. to result.error
    if(error)return res.status(200).send(error.details[0].message);

    let empEmailChk = await Employee.findOne({ email: req.body.email });
        if (empEmailChk) {
            return res.send({ status: "failed", message: "email already exit" });
        }

    const emp= new Employee( req.body)
        try {
            const empSave= await emp.save();
            return res.json({status:"success",message:" employee record created suceessfully"})
        } catch (error) {
            return res.json({status:"failed",message:"something went wrong"})
        }
}

exports.updateEmp= async(req,res)=>{
    const {error}= validater(req.body);// eqv. to result.error
    if(error)return res.status(200).send({ status: "failed", message:error.details[0].message});
    try {
        const emp = await Employee.findById(req.params.id);
        if(!emp){
            return res.json({status:"failed",message:"record not found"})
        }
        if(emp.email!=req.body.email){
          let empEmailChk = await Employee.findOne({ email: req.body.email });
            if (empEmailChk) {
                return res.send({ status: "failed", message: "email already exit" });
            }
        }
        const updateEmp= await Employee.updateOne({_id:req.params.id},
        { $set:req.body
        });
        return res.json({status:"success",message:"updated successfully"}); 
    } catch (error) {
        return res.json({status:"failed",message:"resornd not updated"})
    }

}

exports.getEmpById = async(req,res)=>{
    try {
        const emp = await Employee.findById(req.params.id);
        if(emp){
            return res.json({status:"success",data:emp,message:"record get successfully"}); 
        }
        return res.json({status:"failed",message:"record nor found"})
    } catch (error) {
        return res.json({status:"failed",message:"something went wrong"}) 
    }
}

exports.deleteEmp=async(req, res)=>{
    try {
        const emp =await Employee.findById(req.params.id);
        if(!emp){
            return res.json({status:"failed",message:"record nor found"})
        }
        const deleteEmp= await Employee.deleteOne({_id:req.params.id})
        return res.json({status:"success",message:"delete successfully"})   
    } catch (error) {
        return res.json({status:"failed",message:"something went wrong"})
    }
}

function validater(body){
    const schema= Joi.object().keys({
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        mobile_no:Joi.number()
        });
         return schema.validate(body)
}