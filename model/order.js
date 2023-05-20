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
    discount:{
        type: Number,
        default: 0
    },
    size:{
        type: String
    },
    count:{
        type: Number
    },
    rate:{
        type: Number,
        default: 0
    },
    status:{
        type: String,
        enum: ["inReview","inProgress","done","rejected","rated","deleted"],
        default: "inReview"
    },
    note:{
        type: String
    }
},{timestamps:true})
module.exports=mongoose.model('orders',orderSchema)