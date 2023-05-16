const mongoose=require('mongoose')

const adminSchema= new mongoose.Schema({

    password:{
        type: String
    },
    last_login: {
        type: Date,
        default:new Date(),
      },
    fullName:{
        type: String
    },
    mobile:{
        type: Number
    },
    address:{
        type: String
    },
    pageName:{
        type: String
    },
    logo:{
        type: String
    },
    
},{timestamps:true})
module.exports=mongoose.model('admins',adminSchema)