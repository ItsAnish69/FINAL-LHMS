    const Book = require('../models/book')

    //create user 
    const addBook = async(BookData) =>{
        try{
            const newBook = new Book(BookData);
            await newBook.save();
            return newBook;
        } catch(err){
            console.log("failed to add book", err.message)
            throw new Error("Failed to add new Book");
        }
    }

    const existingIsbn = async (isbn) => {
        const checkIsbn = await Book.findOne({isbn});
        if(checkIsbn){
            return true;
        } return false;
    }

    //get all Book
    const getAllBook = async() =>{
        return await Book.find();
    }

    //get Book By Id
    const getBookById = async(id) =>{
        return await Book.findById(id);
    }

    //Update Book Details
    const updateBook = async(id, updateData) => {
        const update = await Book.findByIdAndUpdate(id, updateData, {new:true});
        if(!update){
            return "Failed to update"
        }
        return update; 
    }

    //delete Book Records
    const deleteBook = async(id)  =>{
        const deleted = await Book.findByIdAndDelete(id);
        if(!deleted){
            return "Failed to delete the book records"
        } 
        return deleted;
    }

    module.exports = {
        addBook,
        existingIsbn,
        getAllBook,
        getBookById,
        updateBook,
        deleteBook,
    }