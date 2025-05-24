const UserModel = require("../models/user")
const getUser = async(req,res)=>{
    try {
            const users = await UserModel.find()
            res.status(200).json({users})
    } catch (error) {
        res.status(500).json({message:"internl server error"})
        console.log(error)
    }
}

module.exports = getUser