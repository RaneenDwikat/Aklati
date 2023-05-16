const Admin = require("../model/admin");

class Controller {
  login = async (req, res, next) => {
    const { mobile, password } = req.body;

    try {
      const admin = await Admin.findOneAndUpdate({ mobile: mobile, password: password },{ last_login: Date() });
      if (!admin) {

        return res.status(200).json({ success: false, msg: "try another mobile  or password" });
      } else {

        return res.status(200).json({ success: true, msg: "Authenticated" ,_id: admin._id,});
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: error });
    }
  };
  addAdmin = async (req, res, next) => {
    const { mobile, password, address, fullName, pageName, logo } = req.body;
    try {
        const admin= await Admin.findOne({mobile:mobile})
        if(admin){
       return res.status(201).json({ success: false, msg: "this mobile has an account"});
    }else{
        await new Admin({ mobile, password, address, fullName,pageName, logo}).save();
        return res.status(201).json({ success: true, msg: "admin added successfully"});
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: error });
    }
  };
  updateAdmin = async (req, res, next) => {
    const {  password,  fullName, address,pageName,logo } = req.body;
   const {_id}=req.params
    try {
      const admin = await Admin.findOneAndUpdate(
        { _id: _id, password: password},{fullName: fullName,address: address, pageName: pageName, logo:logo});
        if(admin){
            return res.status(200).json({success:true,msg:'updated'})
        }else{
            return res.status(200).json({success:false,msg:'enter your password please'})

        }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: error });
    }
  };
  getAdmin= async(req,res,next) =>{
    const {_id}= req.params
    try {
      const admin= await Admin.findOne({_id:_id})
      return res.status(200).json({success: true, msg: 'getting admin successfuly', data:admin})
    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, msg: 'something went wrong'})
    }
  }
  getAdmins= async(req,res,next) =>{
    try {
      const admin= await Admin.find()
      return res.status(200).json({success: true, msg: 'getting admins successfuly', data:admin})
    } catch (error) {
      console.log(error)
      return res.status(500).json({success: false, msg: 'something went wrong'})
    }
  }
}
module.exports = Controller;

