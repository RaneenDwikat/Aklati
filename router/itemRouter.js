const express=require('express')
const itemController=require('../controller/itemController')

const router=express.Router()
const controller=new itemController()

//add a new  item need a price, name,description and _id for page owner(admin's _id) in body request
router.post('/addItem',controller.addItem)

//update item by sending its id in url and send the new data and _id for page owner(admin's _id) in body request
router.put('/updateItem/:_id',controller.updateItem)

//get spacific item by sending his _id in url
router.get('/getItem/:_id',controller.getItem)

//get all items --no data needed
router.get('/getItems',controller.getItems)

//get all items ordered by rate --no data needed
router.get('/getItemsSortedByRate',controller.getItemsSortedByRate)

//get all items  for spacific admin need admin's _id (pageOwner)
router.get('/getItemsByPageOwner/:pageOwner',controller.getItemsByPageOwner)

//get all items ordered by discount --no data needed
router.get('/getItemsSortedByDiscount',controller.getItemsSortedByDiscount)

//delete spacific item by sending his _id in url
router.delete('/deleteItem/:_id',controller.deleteItem) 
module.exports=router