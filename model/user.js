const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({

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
    
},{timestamps:true})
module.exports=mongoose.model('users',userSchema)