const mongoose=require('mongoose')

const orderSchema= new mongoose.Schema({

    user:{
        type: mongoose.ObjectId,
        ref: 'users'
    },
    item:{
        type: mongoose.ObjectId,
        ref: 'items'
    },
    pageOwner:{
        type: mongoose.ObjectId,
        ref: 'admins'
    },
    img:{
        type: String
    },
    discount:{
        type: String
    },
    size:{
        type: String
    },
    count:{
        type: String
    },
    rate:{
        type: String
    },
    status:{
        type: String,
        enum: ["inReview","inProgress","done","rejected","rated"]
    },
},{timestamps:true})
module.exports=mongoose.model('orders',orderSchema)