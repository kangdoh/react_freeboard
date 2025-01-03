const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({dest:'uploads/'})

const Freeboard = require("../models/freeboard"); // Sequelize 모델 가져오기
const Gallery = require("../models/gallery"); // Sequelize 모델 가져오기



// 게시판 목록 가져오기
const getList = async (req, res) => {
  const { sort="createAt", order="DESC", page = 1, limit = 5  } = req.query
  const offset = (page - 1) * limit;
  try {
    const boards = await Freeboard.findAll({
      order: [[sort, order]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    const totalItem = await Freeboard.count(); // 총 갯수
    
    res.status(201).json({boards, totalItem});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 게시판 글 보기
const viewList = async (req, res) => {
  try {
    const { id } = req.params;
    const boards = await Freeboard.findByPk(id, {
      include:[
        {
          model: Gallery,
          attributes: ['fileName', 'filePath']
        }
      ]
    });
    res.status(201).json(boards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 조회수 추가
const upCount = async(req, res)=>{
  const { id } = req.body;
  if (req.headers['content-type'] !== 'application/json'){
    return res.status(400).json({ error: 'Content-type error application/json'})
  }
  try{
    const newboard = await Freeboard.findOne({ where: { id } });
    newboard.viewCount += 1;
    await newboard.save();
    res.status(201).json(newboard);
  }
  catch(error){
    res.status(500).json({ error : error.message });
  }
}

// 게시판 글 추가(bodyparser 확인)
const postList = async(req, res) => {
  // if (req.headers['content-type'] !== 'multipart/form-data') 
  if (req.headers['content-type'].indexOf('multipart/form-data') === -1){ // 이게 뭘까?
    return res.status(400).json({error: 'Content-type error multipart/form-data'})
  }

  
  try{
    const { title, content } = req.body;
    const files = req.files;

    const savedFiles = [];
    for (const file of files) { // 이게 뭘까?
      const savedFile = await Gallery.create({
        fileName: file.filename,         
        filePath: file.path,             
        fileNumber: 1, 
      });
      savedFiles.push(savedFile);
    }

    const newBoard = await Freeboard.create({ title, content })
    res.status(201).json({newBoard, savedFiles});
  }
  catch(error){
    res.status(500).json({ enrror: error.message });
  }
}

// 게시판 수정
const updateList = async(req, res) => {
  try{
    const { id } = req.params;
    const { title, content } = req.body;
    
    const newBoard = await Freeboard.update(
      { title: title, content: content }, 
      { where : { id:id } }
    )
    res.status(201).json(newBoard)
  }
  catch(error){
    res.status(500).json({ error : error.message })
  }
}

// 게시판 삭제
const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Freeboard.destroy({ where: { id } });
    if (result) {
      res.status(200).json({ message: "게시글 삭제 성공" });
    } else {
      res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error("삭제에러", error);
  }
};

module.exports = { getList, viewList, deleteList, postList, updateList, upCount };
