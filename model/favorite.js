const mongoose=require('mongoose')

const favoriteSchema= new mongoose.Schema({

    user:{
        type: mongoose.ObjectId,
        ref: 'users'
    },
    item:{
        type: mongoose.ObjectId,
        ref: 'items'
    },
   
},{timestamps:true})
module.exports=mongoose.model('favorites',favoriteSchema)