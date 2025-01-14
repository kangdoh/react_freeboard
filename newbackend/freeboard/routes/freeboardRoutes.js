const express = require('express');
const router = express.Router();
const freeboardController = require('../controller/freeboardController');
const multer = require('multer');
const path = require('path');


// 업로드 파일 저장 경로 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/usr/src/app/uploads'); // Docker에서 마운트된 볼륨 경로
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    cb(null, true); // 모든 파일 허용
  }
});


// 게시판 
// get
router.get('/', freeboardController.getList)
router.get('/:id', freeboardController.viewList)

// post
router.post('/', upload.array('files', 5), (req, res, next) => {
  console.log("Multer processed request:", req.files);
  console.log("Request body:", req.body);
  next();
}, freeboardController.postList);
// router.post('/', freeboardController.postList)

router.post('/upCount', freeboardController.upCount)
// deletecd 
router.delete('/:id', freeboardController.deleteList)
// update
router.post('/update/:id', freeboardController.updateList)


module.exports = router;
