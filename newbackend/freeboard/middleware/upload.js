const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 업로드 폴더 경로
const uploadDir = path.join(__dirname, '../uploads'); // 프로젝트 root 기준

// 업로드 폴더 없으면 생성
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); // 폴더 생성
}

// 이미지 저장 위치와 파일명 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // 저장 위치
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`); // 파일명
  },
});

// multer 인스턴스 생성
const upload = multer({ storage: storage });

module.exports = upload;
