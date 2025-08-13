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

const existingBorrowId = async (id) => {
        const checkBorrowId = await Borrow.findById(id);
        if(checkBorrowId){
            return true;
        } return false;
    }

    //get all Borrow
    const getAllBorrow = async() =>{
        return await Borrow.find();
    }

    //get Borrow By Id
    const getBorrowById = async(id) =>{
        return await Borrow.findById(id);
    }

    //Update Borrow Details
    const updateBorrowById = async(id, updateBorrowData) => {
        const update = await Book.findByIdAndUpdate(id, updateBorrowData, {new:true});
        if(!update){
            return "Failed to update"
        }
        return update; 
    }

    //delete Borrow Records
    const deleteBorrowById = async(id)  =>{
        const deleted = await Borrow.findByIdAndDelete(id);
        if(!deleted){
            return "Failed to delete the book records"
        } 
        return deleted;
    }


module.exports={
    addBorrowDetail,
    existingBorrowId,
    getAllBorrow,
    getBorrowById,
    updateBorrowById,
    deleteBorrowById,
}
