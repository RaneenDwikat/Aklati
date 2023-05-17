const express=require('express')
const favoriteController=require('../controller/favoriteController')

const router=express.Router()
const controller=new favoriteController()


//add favorite item for user need a user _id and item _id in body request
router.post('/addFavorite',controller.addFavorite)

//update favorite by sending his id in url and send the new data in body request
router.put('/updateFavorite/:_id',controller.updateFavorite)

//get favorites for spacific user by sending his _id in url
router.get('/getFavorites/:user',controller.getFavorites)

//delete a spacific favorite by sending _id in url 
router.delete('/deleteFavorite/:_id',controller.deleteFavorite)
module.exports=router