const express=require('express')
const orderController=require('../controller/orderController')

const router=express.Router()
const controller=new orderController()


//add a new  order need a user, item, pageOwner, size and count in body request
//  -- rate and discount will be 0 as default and status will be inReview
router.post('/addOrder',controller.addOrder)

//----- you can use this to change order's status, rate and discount by send the new status in body request
//update order by sending its id in url and send the new data in body request
router.put('/updateOrder/:_id',controller.updateOrder)

//get all orders for a spacific user by sending user's _id in url
router.get('/getOrdersByUser/:user',controller.getOrdersByUser)

//get all orders  for a spacific pageOwner by sending pageOwner's _id in url
router.get('/getOrdersByPageOwner/:pageOwner',controller.getOrdersByPageOwner)

//get all orders for a spacific item by sending item's _id in url
router.get('/getOrdersByItem/:item',controller.getOrdersByItem)

//get all orders that inReview status for a spacific pageOwner by sending pageOwner's _id in url
router.get('/getOrdersInReviewStatus/:pageOwner',controller.getOrdersInReviewStatus)

//get all orders that inProgress status for a spacific pageOwner by sending pageOwner's _id in url
router.get('/getOrdersInProgressStatus/:pageOwner',controller.getOrdersInProgressStatus)

// --- different from getOrdersByUser: it will bring all orders regardless of their status
// get all orders that not rated nor deleted status for a spacific user by sending user's _id in url
router.get('/getOrdersForUser/:user',controller.getOrdersForUser)


module.exports=router