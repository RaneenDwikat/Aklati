const express=require('express')
const adminController=require('../controller/adminController')

const router=express.Router()
const controller=new adminController()

//login for admin need a mobile and password in body request
router.post('/loginAdmin',controller.login)

//add a new  admin need a mobile, fullName,address,pageName,logo and password in body request
router.post('/addAdmin',controller.addAdmin)

//update admin by sending his id in url and send the new data in body request
router.put('/updateAdmin/:_id',controller.updateAdmin)

//get spacific admin by sending his _id in url
router.get('/getAdmin/:_id',controller.getAdmin)

//get all admins --no data needed
router.get('/getAdmins',controller.getAdmins)
module.exports=router