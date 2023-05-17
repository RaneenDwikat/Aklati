const Favorite = require("../model/favorite");
const mongoose = require("mongoose");

class Controller {
  addFavorite = async (req, res, next) => {
    const { user, item } = req.body;
    try {
        
        await new Favorite({ user, item}).save();
        return res.status(201).json({ success: true, msg: "favorite added successfully"})
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: error });
    }
  };
  updateFavorite = async (req, res, next) => {
    const {  user, item } = req.body;
   const {_id}=req.params
    try {
      const favorite = await Favorite.findOneAndUpdate(
        { _id: _id},{user:user, item:item});
            return res.status(200).json({success:true,msg:'updated'})
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: error });
    }
  };
  getFavorites= async(req,res,next) =>{
    const {user}= req.params
    
    try {
      const favorite= await Favorite.aggregate([
        { $match:  {user:new mongoose.Types.ObjectId(user)}   },
        {$lookup:{
            from: "users",
            foreignField: "_id",
            localField: "user",
            pipeline: [
                {$project: {createdAt: 0,updatedAt: 0,__v: 0,},},
            ],
            as:"user"
        }},
        {$lookup:{
            from: "items",
            foreignField: "_id",
            localField: "item",
            pipeline: [{$project: {createdAt: 0,updatedAt: 0,__v: 0,},},],
            as:"item"
        }}
       ])
      return res.status(200).json({success: true, msg: 'getting fav successfuly', data:favorite})

    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, msg: 'something went wrong'})
    }
  }
  deleteFavorite = async (req, res, next) => {
   const {_id}=req.params
    try {
      const favorite = await Favorite.findOneAndDelete({_id});
            return res.status(200).json({success:true,msg:'updated'})
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: error });
    }
  };
}
module.exports = Controller;
