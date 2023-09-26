const express = require ("express");
const mongoose = require ("mongoose");
const employee = require ('./routes/employee');
const cors = require('cors')
mongoose.connect('mongodb://127.0.0.1:27017/employeeDB',{useNewUrlParser:true,  useUnifiedTopology: true,});

const app = express()
app.use(cors());
app.use(express.json());

app.use('/', employee);


app.listen(3000, () => {
    console.log('Server started.')
});