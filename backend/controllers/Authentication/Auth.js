const UserModel = require("../../models/user")
const bcryptJs = require("bcryptjs")
const jwt = require("jsonwebtoken")
 const register = async(req, res )=>{
   try {
    const {name, email,password} = req.body;
     const existUser = await UserModel.findOne({email});
     if(existUser){
         return res.status(401).json({
            success:false, message:"User already Exist"
         })
     }
      const hashpassword = await bcryptJs.hashSync(password,10)
      const newUser = new UserModel({
        name, email, password:hashpassword
      })
      await newUser.save()
      res.status(200).json({newUser})
   } catch (error) {
      res.status(500).json({success:false, message:"Internal Server Error"});
     console.log(error)
   }
}

const  Login  = async (req, res)=>{
 try { 
     const {email, password} = req.body;
     const user = await  UserModel.findOne({email});
     if(!user){
        return res.status(404).json({success:false, message:"Invalid credentials"})
     }
     const isPasswordValid = await bcryptJs.compare(password,user.password)
     if(!isPasswordValid){
      return res.status(404).json({success:false, message:"Invalid credentials"})
     }
      
      const token = jwt.sign({userId:user._id}, process.env.JWT_SECRETE,{ expiresIn: "1h" });
      res.cookie('token',token,{
         httpOnly:true, 
         secure:false,
        maxAge: 3600000,
      })
      res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
 } catch (error) {
    res.status(404).json({success:false, message:"Invalid credentials"})
    console.log(error)
 }

}

const Logout = async(req,res)=>{
try {
     res.clearCookie('token');
     res.status(200).json({success:true, message:"user is successfuly Logout "})
} catch (error) {
    console.log(error)
    res.status(404).json({success:false, message:"Invalid credentials"})
}
}
const deleteUser = async (req,res)=>{
   try {
      const userId = req.params.id 
      const checkAdmin = await UserModel.findById(userId);
      if(checkAdmin.role ==="admin"){
         return res.status(409).json({message:"you can not delete yourself"})
      }
      const  user = await UserModel.findByIdAndDelete(userId)
      if(!user){
       return res.status(404).json({message :"user not found"})
      }
      res.status(200).json({message:"user is successfully deleted"})
   } catch (error) {
       res.status(500).json({message:"Internal server Error"})
       console.log(error)
   }
}
module.exports = {register,Login,Logout,deleteUser}