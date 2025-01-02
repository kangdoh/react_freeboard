const express = require('express');
const router = express.Router();
const freeboardController = require('../controller/freeboardController');

// 게시판 
// get
router.get('/', freeboardController.getList)
router.get('/:id', freeboardController.viewList)
// post
router.post('/', freeboardController.postList)
router.post('/upCount', freeboardController.upCount)
// deletecd 
router.delete('/:id', freeboardController.deleteList)
// update
router.post('/update/:id', freeboardController.updateList)





module.exports = router;
