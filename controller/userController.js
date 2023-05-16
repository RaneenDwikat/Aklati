const User = require("../model/user");

class Controller {
  login = async (req, res, next) => {
    const { mobile, password } = req.body;

    try {
      const user = await User.findOneAndUpdate({ mobile: mobile, password: password },{ last_login: Date() });
      if (!user) {

        return res.status(200).json({ success: false, msg: "try another mobile  or password" });
      } else {

        return res.status(200).json({ success: true, msg: "Authenticated" ,_id: user._id,});
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: error });
    }
  };
  addUser = async (req, res, next) => {
    const { mobile, password, address, fullName } = req.body;
    try {
        const user= await User.findOne({mobile:mobile})
        console.log(user)
        if(user){
       return res.status(201).json({ success: false, msg: "this mobile has an account"});
    }else{
        await new User({ mobile, password, address, fullName}).save();
        return res.status(201).json({ success: true, msg: "user added successfully"});
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: error });
    }
  };
  updateUser = async (req, res, next) => {
    const {  password,  fullName, address } = req.body;
   const {_id}=req.params
    try {
      const user = await User.findOneAndUpdate(
        { _id: _id, password: password},{fullName: fullName,address: address,});
        if(user){
            return res.status(200).json({success:true,msg:'updated'})
        }else{
            return res.status(200).json({success:false,msg:'enter your password please'})

        }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: error });
    }
  };
  getUser= async(req,res,next) =>{
    const {_id}= req.params
    try {
      const user= await User.findOne({_id:_id})
      return res.status(200).json({success: true, msg: 'getting user successfuly', data:user})

    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, msg: 'something went wrong'})
    }
  }
  getUsers= async(req,res,next) =>{
    try {
      const user= await User.find()
      return res.status(200).json({success: true, msg: 'getting users successfuly', data:user})

    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, msg: 'something went wrong'})
    }
  }
}
module.exports = Controller;

//   deactivateUser= async(req,res,next) =>{
//     const {_id}=req.params
//     try {
//       const user=await User.findOneAndUpdate({_id:_id},{status: 'deactive'})
//       return res.status(200).json({success: true, msg: 'deactivated successfuly'})
//     } catch (error) {
//       console.log(error)
//       return res.status(500).json({success: false, msg: 'something went wrong'})
//     }
//   }