const Controller = require('../services/bookServices')

const addBookController = async(req, res) =>{
    const {title, author, isbn, quantity, available} = req.body;
    if(!title || !author || !isbn || quantity == undefined || available == undefined){
        return res.status(400).json("Missing fields! Requires title, author, isbn")
    }
    const existIsbn = await Controller.existingIsbn(isbn);
    if(existIsbn){
        res.status(400).json({Message:"Duplicate Isbn Detected!"})
    }

    try{
    const newBook = await Controller.addBook(req.body);
    res.status(201).json(newBook);
    } catch(err){
        res.status(500).json({err: err.message});
    }
};

const GetAllBookController = async(req, res) =>{
    try{
    const book = await Controller.getAllBook();
    res.status(200).json(book);
    } catch(err){
        res.status(500).json({err: err.message})
    }
};

const GetBookByIdController = async(req, res) =>{
    try{
        const book = await Controller.getBookById(req.params.id);
        res.status(200).json(book);
    } catch{
        res.status(500).json({err: err.message})
    }
};

const updateBookController = async(req, res) =>{
    try{
        const book = await Controller.updateBook(req.params.id, req.body);
        res.status(200).json(book);
    } catch{
        res.status(500).json({err: err.message})
    }
};

const deleteBookController = async(req, res) =>{
    try{
        const book = await Controller.deleteBook(req.params.id);
        res.status(200).json(book);
    } catch{
        res.status(500).json({err: err.message})
    }
};

module.exports = {
    addBookController,
    GetAllBookController,
    GetBookByIdController,
    updateBookController,
    deleteBookController,
}