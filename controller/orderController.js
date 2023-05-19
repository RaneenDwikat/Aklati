const Order = require("../model/order");
const Item = require("../model/item");
const mongoose=require('mongoose')
class Controller {

  addOrder = async (req, res, next) => {
    const { user, item, pageOwner, size,count,status,discount } = req.body;
    try {
        
        await new Order({user, item, pageOwner, size,count,status,discount}).save();
        return res.status(201).json({ success: true, msg: "order added successfully"});
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: error });
    }
  };
  updateOrder = async (req, res, next) => {
    const {  user, item, pageOwner, size,count,status,rate,discount } = req.body;
    var sum=Number(req.body.rate)
    console.log(sum)
   const {_id}=req.params
    try {
       if(rate){
        const items= await Item.find()
        for(const ite of items){
          if(ite._id!=item)
            sum=sum+ite.rate
        }
        const rateForItem= (sum/items.length)
        const temp=await Item.findByIdAndUpdate({_id:new mongoose.Types.ObjectId(item)},{rate:rateForItem})
       }
      const order = await Order.findOneAndUpdate({_id: _id},{ user, item, pageOwner, size,count,status,rate,discount});
      return res.status(200).json({success:true,msg:'updated'})
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: error });
    }
  };
  getOrdersByUser= async(req,res,next) =>{
    const {user}= req.params
    try {
      const orders= await Order.aggregate([
        { $match:  {user:new mongoose.Types.ObjectId(user)}   },
        {$lookup:{
            from: "users",
            foreignField: "_id",
            localField: "user",
            pipeline: [
                {
                  $project: {
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                  },
                },
              ],
            as:"user"
        }},
        {$lookup:{
            from: "admins",
            foreignField: "_id",
            localField: "pageOwner",
            pipeline: [
                {
                  $project: {
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                  },
                },
              ],
            as:"pageOwner"
        }},
        {$lookup:{
            from: "items",
            foreignField: "_id",
            localField: "item",
            pipeline: [
                {
                  $project: {
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                  },
                },
              ],
            as:"item"
        }}
       ])
       if(orders.length==0){
           return res.status(200).json({success: false, msg: "try another user"})
       }
       else{
        return res.status(200).json({success: true, msg: "getting user's orders successfuly", data:orders})
       }

    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, msg: 'something went wrong'})
    }
  }
  getOrdersByPageOwner= async(req,res,next) =>{
    const {pageOwner}= req.params
    try {
      const orders= await Order.aggregate([
        { $match:  {pageOwner:new mongoose.Types.ObjectId(pageOwner)}   },
        {$lookup:{
            from: "users",
            foreignField: "_id",
            localField: "user",
            pipeline: [
                {
                  $project: {
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                  },
                },
              ],
            as:"user"
        }},
        {$lookup:{
            from: "admins",
            foreignField: "_id",
            localField: "pageOwner",
            pipeline: [
                {
                  $project: {
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                  },
                },
              ],
            as:"pageOwner"
        }},
        {$lookup:{
            from: "items",
            foreignField: "_id",
            localField: "item",
            pipeline: [
                {
                  $project: {
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                  },
                },
              ],
            as:"item"
        }}
       ])
       if(orders.length==0){
           return res.status(200).json({success: false, msg: "try another pageOwner"})
       }
       else{
        return res.status(200).json({success: true, msg: "getting pageOwner's orders successfuly", data:orders})
       }

    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, msg: 'something went wrong'})
    }
  }
  getOrdersByItem= async(req,res,next) =>{
    const {item}= req.params
    try {
      const orders= await Order.aggregate([
        { $match:  {item:new mongoose.Types.ObjectId(item)}   },
        {$lookup:{
            from: "users",
            foreignField: "_id",
            localField: "user",
            pipeline: [
                {
                  $project: {
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                  },
                },
              ],
            as:"user"
        }},
        {$lookup:{
            from: "admins",
            foreignField: "_id",
            localField: "pageOwner",
            pipeline: [
                {
                  $project: {
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                  },
                },
              ],
            as:"pageOwner"
        }},
        {$lookup:{
            from: "items",
            foreignField: "_id",
            localField: "item",
            pipeline: [
                {
                  $project: {
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                  },
                },
              ],
            as:"item"
        }}
       ])
       if(orders.length==0){
           return res.status(200).json({success: false, msg: "try another item"})
       }
       else{
        return res.status(200).json({success: true, msg: "getting item's orders successfuly", data:orders})
       }

    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, msg: 'something went wrong'})
    }
  }
  getOrdersInReviewStatus= async(req,res,next) =>{
    const {pageOwner}= req.params
    try {
      const orders= await Order.aggregate([
        { $match:  {status: "inReview"}   },
        { $match:  {pageOwner: new mongoose.Types.ObjectId(pageOwner)}   },
        {$lookup:{
            from: "users",
            foreignField: "_id",
            localField: "user",
            pipeline: [
                {
                  $project: {
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                  },
                },
              ],
            as:"user"
        }},
        {$lookup:{
            from: "admins",
            foreignField: "_id",
            localField: "pageOwner",
            pipeline: [
                {
                  $project: {
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                  },
                },
              ],
            as:"pageOwner"
        }},
        {$lookup:{
            from: "items",
            foreignField: "_id",
            localField: "item",
            pipeline: [
                {
                  $project: {
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                  },
                },
              ],
            as:"item"
        }}
       ])
       if(orders.length==0){
           return res.status(200).json({success: false, msg: "try another pageOwner"})
       }
       else{
        return res.status(200).json({success: true, msg: "getting inReview orders successfuly", data:orders})
       }

    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, msg: 'something went wrong'})
    }
  }
  getOrdersInProgressStatus= async(req,res,next) =>{
    const {pageOwner}= req.params
    try {
      const orders= await Order.aggregate([
        { $match:  {status: "inProgress"}   },
        { $match:  {pageOwner: new mongoose.Types.ObjectId(pageOwner)}   },
        {$lookup:{
            from: "users",
            foreignField: "_id",
            localField: "user",
            pipeline: [
                {
                  $project: {
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                  },
                },
              ],
            as:"user"
        }},
        {$lookup:{
            from: "admins",
            foreignField: "_id",
            localField: "pageOwner",
            pipeline: [
                {
                  $project: {
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                  },
                },
              ],
            as:"pageOwner"
        }},
        {$lookup:{
            from: "items",
            foreignField: "_id",
            localField: "item",
            pipeline: [
                {
                  $project: {
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                  },
                },
              ],
            as:"item"
        }}
       ])
       if(orders.length==0){
           return res.status(200).json({success: false, msg: "try another pageOwner"})
       }
       else{
        return res.status(200).json({success: true, msg: "getting inProgress orders successfuly", data:orders})
       }

    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, msg: 'something went wrong'})
    }
  }
  getOrdersForUser= async(req,res,next) =>{
    const {user}= req.params
    try {
      const orders= await Order.aggregate([
        { $match: {$nor:[{status:"rated"},{status:"deleted"}]} },
        { $match:  {user: new mongoose.Types.ObjectId(user)}   },
        {$lookup:{
            from: "users",
            foreignField: "_id",
            localField: "user",
            pipeline: [
                {
                  $project: {
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                  },
                },
              ],
            as:"user"
        }},
        {$lookup:{
            from: "admins",
            foreignField: "_id",
            localField: "pageOwner",
            pipeline: [
                {
                  $project: {
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                  },
                },
              ],
            as:"pageOwner"
        }},
        {$lookup:{
            from: "items",
            foreignField: "_id",
            localField: "item",
            pipeline: [
                {
                  $project: {
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                  },
                },
              ],
            as:"item"
        }}
       ])
       if(orders.length==0){
           return res.status(200).json({success: false, msg: "user"})
       }
       else{
        return res.status(200).json({success: true, msg: "getting user's orders successfuly", data:orders})
       }

    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, msg: 'something went wrong'})
    }
  }
}
module.exports = Controller;

