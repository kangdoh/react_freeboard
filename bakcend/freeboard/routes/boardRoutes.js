const express = require('express');
const router = express.Router();
const { Board } = require('../models'); // Sequelize 모델 가져오기

// 게시판 목록 가져오기
router.get('/', async (req, res) => {
  try {
    const boards = await Board.findAll();
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 게시판 글 작성
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBoard = await Board.create({ title, content });
    res.status(201).json(newBoard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;