const express = require("express");
const router = express.Router();

const Freeboard = require("../models/freeboard"); // Sequelize 모델 가져오기
const Gallery = require("../models/gallery"); // Sequelize 모델 가져오기

// 게시판 목록 가져오기
const getList = async (req, res) => {
  const { sort = "createAt", order = "DESC", page = 1, limit = 5 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const boards = await Freeboard.findAll({
      order: [[sort, order]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const totalItem = await Freeboard.count(); // 총 갯수

    res.status(201).json({ boards, totalItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 게시판 글 보기
const viewList = async (req, res) => {
  try {
    const { id } = req.params;
    const boards = await Freeboard.findByPk(id, {
      include: [
        {
          model: Gallery,
          attributes: ["fileName", "filePath"],
        },
      ],
    });
    res.status(201).json(boards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 조회수 추가
const upCount = async (req, res) => {
  const { id } = req.body;
  if (req.headers["content-type"] !== "application/json") {
    return res
      .status(400)
      .json({ error: "Content-type error application/json" });
  }
  try {
    const newboard = await Freeboard.findOne({ where: { id } });
    newboard.viewCount += 1;
    await newboard.save();
    res.status(201).json(newboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 게시글 추가
const postList = async (req, res) => {
  console.log("일로오나" + req.headers["content-type"]);
  if (!req.headers["content-type"].includes("multipart/form-data")) {
    return res
      .status(400)
      .json({ error: "Content-type error multipart/form-data" });
  }
  try {
    console.log("Request Body:", req.file);
    const { inputValue } = req.body;
    const fileOne = req.file;
    const parsedInputValue = JSON.parse(inputValue); // Blob으로 보내진 JSON 파싱

    // 첨부된 파일 확인 및 처리
    // let filePaths = [];
    // if (req.file && req.file.length > 0) {
    //   // 파일이 존재할 경우 처리
    //   filePaths = req.file.map((fileItem) => ({
    //     fileName: fileItem.originalname, // 파일의 원래 이름
    //     filePath: fileItem.path, // 저장된 파일 경로
    //   }));
    //   console.log(filePaths);
    // } else {
    //   console.log("빈 파일이 전송되었습니다.");
    // }

    // 게시판 글 생성
    const newBoard = await Freeboard.create({
      title: parsedInputValue.title,
      content: parsedInputValue.content,
    });

    // 첨부 파일 저장 (파일이 있을 경우에만 처리)
    // const newFiles =
    //   filePaths.length > 0
    //     ? await Promise.all(
    //         filePaths.map(async ({ fileName, filePath }) => {
    //           return await Gallery.create({
    //             fileName: fileName,
    //             filePath: filePath,
    //             fileNumber: newBoard.id, // 게시판 글과 연결
    //           });
    //         })
    //       )
    //     : [];

    const newFiles = await Gallery.create({
      fileName: fileOne.filename,
      filePath: fileOne.path,
      fileNumber: newBoard.id, // 게시판 글과 연결
    });

    // 성공 응답
    res.status(201).json({ newBoard, newFiles });
  } catch (error) {
    console.error("게시글 생성 오류:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다.", error });
  }
};

// 게시판 수정
const updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const newBoard = await Freeboard.update(
      { title: title, content: content },
      { where: { id: id } }
    );
    res.status(201).json(newBoard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

module.exports = {
  getList,
  viewList,
  deleteList,
  postList,
  updateList,
  upCount,
};
