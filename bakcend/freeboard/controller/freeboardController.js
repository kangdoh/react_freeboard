const express = require("express");
const router = express.Router();
const { Board } = require("../models"); // Sequelize 모델 가져오기


// 게시판 목록 가져오기
const getList = async (req, res) => {
  try {
    const boards = await Board.findAll();
    res.status(201).json(boards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 게시판 글 보기
const viewList = async (req, res) => {
  try {
    const { id } = req.params;
    const boards = await Board.findByPk(id);
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
    const newboard = await Board.findOne({ where: { id } });
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
  if (req.headers['content-type'] !== 'application/json'){
    return res.status(400).json({error: 'Content-type error application/json'})
  }
  try{
    const { title, content } = req.body;
    const newBoard = await Board.create({ title, content })
    res.status(201).json(newBoard);
  }
  catch(error){
    res.status(500).json({ error: error.message });
  }
}

// 게시판 수정
const updateList = async(req, res) => {
  try{
    const { id } = req.params;
    const { title, content } = req.body;
    
    const newBoard = await Board.update(
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
    const result = await Board.destroy({ where: { id } });
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
