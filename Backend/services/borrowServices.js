const Borrow = require('../models/borrow')

//create borrow details
const addBorrowDetail = async(borrowData) =>{
    try{
        const newBorrow = new Borrow(borrowData);
        await newBorrow.save();
        return newBorrow;
    }   
    catch(err){
        console.log("failed to borrow the book", err.message)
        throw new Error("Failed to borrow the Book");
    }
}

const existingBorrowId = async (userId) => {
        const checkBorrowId = await Borrow.findById(userId);
        if(checkBorrowId){
            return true;
        } return false;
    }

    //get all Borrow
    const getAllBorrow = async() =>{
        return await Borrow.find().populate('bookId').populate('userId');
    }

    //get Borrow By Id
    const getBorrowById = async(userId) =>{
        return await Borrow.findById(userId);
    }

    //Update Borrow Details
    const updateBorrowById = async(userId, updateBorrowData) => {
        const update = await Borrow.findByIdAndUpdate(userId, updateBorrowData, { new: true });
        if (!update) {
            return "Failed to update"
        }
        return update; 
    }

    //delete Borrow Records
    const deleteBorrowById = async(userId)  =>{
        const deleted = await Borrow.findByIdAndDelete(userId);
        if(!deleted){
            return "Failed to delete the book records"
        } 
        return deleted;
    }   

    //get all borrows for a specific user
    const getUserBorrow = async(userId) => {
    return await Borrow.find({ userId }).populate('bookId').populate('userId');
}


module.exports={
    addBorrowDetail,
    existingBorrowId,
    getAllBorrow,
    getBorrowById,
    updateBorrowById,
    deleteBorrowById,
    getUserBorrow,
}
