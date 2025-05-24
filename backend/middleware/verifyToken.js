const jwt = require("jsonwebtoken");
const UserModel = require("../models/user")

const isAdmin = async (req, res, next) => {
    try {
         const { token } = req.cookies;
         if(!token){
            return res.status(401).json({message:"Unauthorized : No token provided"});
        
         }
     const decoded = jwt.verify(token,process.env.JWT_SECRETE);
     const user = await UserModel.findById(decoded.userId);
       if(!user){
       return res.status(401).json({message:"User not found"});
       }
       if(user.role !="admin"){
         return res.status(403).json({message:"Unauthorized :user is not admin"});
       }
       req.user = user
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = { isAdmin };