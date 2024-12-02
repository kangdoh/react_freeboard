const express = require('express');
const router = express.Router();
const freeboardController = require('../controller/freeboardController');

// get
router.get('/', freeboardController.getList)
router.get('/:id', freeboardController.viewList)

// post
router.post('/', freeboardController.postList)

// delete
router.delete('/:id', freeboardController.deleteList)


module.exports = router;
