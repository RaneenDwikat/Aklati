const mongoose=require('mongoose')

const itemSchema= new mongoose.Schema({

    pageOwner:{
        type: mongoose.ObjectId,
        ref: 'admins'
    },
    price:{
        type: Number
    },
    rate:{
        type: String
    },
    name:{
        type: String
    },
    description:{
        type: String
    },
},{timestamps:true})
module.exports=mongoose.model('items',itemSchema)