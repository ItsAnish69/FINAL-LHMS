const User = require('../models/user')

//create user 
const createUser = async(UserData) =>{
    try{
        const newUser = new User(UserData);
        await newUser.save();
        return newUser;
    } catch(err){
        console.log("Failed to create an user", err.message);
        throw new Error("Failed to create an User");
    }
};

const existingEmail = async (email) => {
        const checkEmail = await User.findOne({email});
        if(checkEmail){
            return true;
        } return false;
    }

//get all user records
const getAllUser = async() =>{
    return await User.find();
}

//get user By Id
const getUserById = async(id) =>{
    return await User.findById(id);
}

//update the user data by id
const updateUser = async(id, updateData) =>{
    const update_user = await User.findByIdAndUpdate(id, updateData, {new: true});
    if(!update_user){
        return "Failed to update the User Data"
    }
    return update_user;
};

//delete the user data by id
const deleteUser = async(id) =>{
    const delete_user = await User.findByIdAndDelete(id);
    if(!delete_user){
        return "Failed to update the User Data"
    }
    return delete_user;
};

module.exports = {
    createUser,
    existingEmail,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
}