const BorrowController = require('../services/borrowServices')
const Book = require('../models/book');
const Borrow = require('../models/borrow');

const addBorrowController = async(req, res) =>{
    const {userId, bookId, borrowDate, returnDate} = req.body;

    // checks the required fields
    if(!userId || !bookId || !borrowDate || !returnDate){
        return res.status(400).json("Missing fields!");
    }
    //checks for duplicate record Id 
    const existingBorrowId = await BorrowController.existingBorrowId(userId);
        if(existingBorrowId){
            res.status(400).json({Message:"Duplicate Id Detected!"})
        }
    
        // create a new Borrrow Id 
    try{
        const book = await Book.findById(bookId);
        if (!book || book.available <= 0) {
          return res.status(400).json({ message: "Book is not available for borrowing." });
        }
        // Proceed to create borrow record and decrement available
        const newBorrow = await BorrowController.addBorrowDetail(req.body);
        await Book.findByIdAndUpdate(bookId, { $inc: { available: -1 } });
        res.status(201).json(newBorrow);
    } catch(err){
        res.status(400).json({err: err.message});   
    }
};

const getAllBorrowController = async(req, res) =>{
    try{
    const borrow = await BorrowController.getAllBorrow();
    res.status(200).json(borrow);
    } catch(err){
        res.status(500).json({err: err.message})
    }
};

const getBorrowController = async(req, res) =>{
    try{
        const borrow = await BorrowController.getBorrowById(req.params.id);
        res.status(200).json(borrow);
    } catch{
        res.status(500).json({err: err.message})
    }
};

const updateBorrowController = async(req, res) =>{
    try{
        const borrow = await BorrowController.updateBorrowById(req.params.id, req.body);
        res.status(200).json(borrow);
    } catch{
        res.status(500).json({err: err.message})
    }
};

const deleteBorrowController = async(req, res) =>{
    try{
        const borrow = await BorrowController.deleteBorrowById(req.params.id);
        res.status(200).json(borrow);
    } catch{
        res.status(500).json({err: err.message})
    }
};

// Get all borrows for a specific user
const getUserBorrows = async (req, res) => {
    try {
        const userId = req.params.id;
        const borrows = await BorrowController.getUserBorrow(userId);
        res.status(200).json(borrows);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

module.exports = {
    addBorrowController,
    getAllBorrowController,
    getBorrowController,
    updateBorrowController,
    deleteBorrowController,
    getUserBorrows
}
