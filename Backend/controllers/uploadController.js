const User = require('../models/user');

const uploadController = async(req, res) =>{
    try{
        const UserId = req.params.userId;
        const user = await User.findById(UserId);

        if(!user){
            return res.status(404).json({message: "User not found!"});
        }

        user.profileImage = req.file.filename;
        await user.save();

        res.status(200).json({
            message:"Image uploaded Successfully",
            imageUrl: `/uploads/${req.file.filename}` 
        })
    } catch(err){
        res.status(400).json({err: err.message})
    }
}

module.exports = uploadController;