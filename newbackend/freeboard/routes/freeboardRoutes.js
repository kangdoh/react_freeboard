const express = require('express');
const router = express.Router();
const freeboardController = require('../controller/freeboardController');
const upload = require('../middleware/upload'); 

// 게시판 
// get
router.get('/', freeboardController.getList)
router.get('/:id', freeboardController.viewList)
// post
router.post('/', upload.array('files', 5), freeboardController.postList)
router.post('/upCount', freeboardController.upCount)
// deletecd 
router.delete('/:id', freeboardController.deleteList)
// update
router.post('/update/:id', freeboardController.updateList)


module.exports = router;
