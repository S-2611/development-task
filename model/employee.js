const moongose = require('mongoose');
const Schema= moongose.Schema

const employee= new Schema({
    
    name:{
        type:String,
        required:true
    },

    email:{
        type: String,
        required: true,
        unique: true
  },
    mobile_no: {
    type: Number
}

});

const employeeModel = moongose.model('Employee',employee)

module.exports=employeeModel