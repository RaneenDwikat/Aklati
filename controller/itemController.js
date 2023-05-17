const Item = require("../model/item");
const mongoose=require("mongoose")
class Controller {
 
  addItem = async (req, res, next) => {
    const { price, name,description,pageOwner } = req.body;
    try { 
        await new Item({ price, name,description,pageOwner}).save();
        return res.status(201).json({ success: true, msg: "item added successfully"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: error });
    }
  };
  updateItem = async (req, res, next) => {
    const { price, name,description,pageOwner,rate  } = req.body;
   const {_id}=req.params
    try {
      const item = await Item.findOneAndUpdate(
        { _id: _id, pageOwner: pageOwner},{price, name,description,rate});
        if(item){
            return res.status(200).json({success:true,msg:'updated'})
        }else{
            return res.status(200).json({success:false,msg:'enter your pageOwner please'})

        }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: error });
    }
  };
  getItem= async(req,res,next) =>{
    const {_id}= req.params
    try {
      const item=await Item.aggregate([
        { $match:  {_id:new mongoose.Types.ObjectId(_id)}   },
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
            as:"admin"
        }}
       ])
      return res.status(200).json({success: true, msg: 'getting item successfuly', data:item})
    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, msg: 'something went wrong'})
    }
  }
  getItemsSortedByRate= async(req,res,next) =>{
    try {
        const items=await Item.aggregate([
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
                as:"admin"
            }}
           ]).sort({rate:1})
      return res.status(200).json({success: true, msg: 'getting items successfuly', data:items})

    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, msg: 'something went wrong'})
    }
  };
  getItemsSortedByDiscount= async(req,res,next) =>{
    try {
        const items=await Item.aggregate([
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
                as:"admin"
            }}
           ]).sort({discount:1})
      return res.status(200).json({success: true, msg: 'getting items successfuly', data:items})

    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, msg: 'something went wrong'})
    }
  }
  getItems= async(req,res,next) =>{
    try {
        const items=await Item.aggregate([
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
                as:"admin"
            }}
           ])
      return res.status(200).json({success: true, msg: 'getting items successfuly', data:items})

    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, msg: 'something went wrong'})
    }
  }
  deleteItem= async (req, res, next) => {
   const {_id}=req.params
    try {
        const item = await Item.findOneAndDelete({ _id: _id});
        return res.status(200).json({success:true,msg:'item successfully deleted'})
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: error });
    }
  };
  getItemsByPageOwner= async(req,res,next) =>{
    const {pageOwner}= req.params
    try {
      const item=await Item.aggregate([
        { $match:  {pageOwner:new mongoose.Types.ObjectId(pageOwner)}   },
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
            as:"admin"
        }}
       ])
      return res.status(200).json({success: true, msg: 'getting item successfuly', data:item})
    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, msg: 'something went wrong'})
    }
  }
}
module.exports = Controller;
