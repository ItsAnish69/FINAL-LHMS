const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookController');

//add an Book
router.post('/', controller.addBookController);
//get all Book
router.get('/', controller.GetAllBookController);
//get book by id
router.get('/:id', controller.GetBookByIdController);
//update book by id
router.put('/:id', controller.updateBookController);
//delete book by id
router.delete('/:id', controller.deleteBookController);

module.exports = router;

