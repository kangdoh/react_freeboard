const express = require("express");
const router = express.Router();
const freeboardController = require("../controller/freeboardController");
const multer = require("multer");
const path = require("path");

// 업로드 파일 저장 경로 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "/uploads")); // Docker 볼륨에 연결된 폴더 경로
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    cb(null, true); // 모든 파일 허용
  },
});

// 게시판
// get
router.get("/", freeboardController.getList);
router.get("/:id", freeboardController.viewList);

// post
router.post("/", upload.single('files'), freeboardController.postList);

router.post("/upCount", freeboardController.upCount);
// deletecd
router.delete("/:id", freeboardController.deleteList);
// update
router.post("/update/:id", freeboardController.updateList);

module.exports = router;
