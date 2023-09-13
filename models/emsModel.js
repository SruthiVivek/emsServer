const mongoose=require('mongoose')

// schema
const employeeSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    lname:{
        type:String,
        required:true,
        trim:true 
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minlength:10,
        maxlength:13
    },
    gender:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true,
        trim:true
    }

})

// model
const employees=new mongoose.model('employees',employeeSchema)

module.exports=employees