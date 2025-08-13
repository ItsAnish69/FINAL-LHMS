const express = require('express');
const router = express.Router();
const controller = require('../controllers/borrowerController');

//add an borrow
router.post('/', controller.addBorrowController);
//get all borrow
router.get('/', controller.getAllBorrowController);
//get borrow by id
router.get('/:id', controller.getBorrowController);
//update borrow by id
router.put('/:id', controller.updateBorrowController);
//delete borrow by id
router.delete('/:id', controller.deleteBorrowController);

module.exports = router;