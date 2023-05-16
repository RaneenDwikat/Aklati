const express=require('express')
const userController=require('../controller/userController')

const router=express.Router()
const controller=new userController()

//login for user need a mobile and password in body request
router.post('/loginUser',controller.login)

//add a new  user need a mobile, fullName,address and password in body request
router.post('/addUser',controller.addUser)

//update user by sending his id in url and send the new data in body request
router.put('/updateUser/:_id',controller.updateUser)

//get spacific user by sending his _id in url
router.get('/getUser/:_id',controller.getUser)

//get all users --no data needed
router.get('/getUsers',controller.getUsers)
module.exports=router