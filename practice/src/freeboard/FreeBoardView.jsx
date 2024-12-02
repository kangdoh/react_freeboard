import { useNavigate, useParams } from "react-router-dom";
import BoardView from "css/FreeBoard/FreeBoardView.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

function FreeBoardView() {
  const { id } = useParams();
  const [viewBoard, setViewBoard] = useState([]);

  // 게시판 불러오기
  useEffect(() => {
    const freeBoardView = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/boards/${id}`);
        setViewBoard(res.data);
      } catch (error) {
        console.error("boardView Error", error);
      }
    };
    freeBoardView();
  }, [id]);

  const navigate = useNavigate();
  // 게시판 수정으로 이동
  const boardUpdate = () => {
    navigate(`/freeboard/freeboardupdate/${id}`);
  };

  // 게시판 삭제
  const boardDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/boards/${id}`);
      navigate("/freeboard/freeboardlist");
    } catch (error) {
      console.log("삭제 실패", error);
    }
  };

  return (
    <>
      <div className={BoardView.post_container}>
        <div className={BoardView.post_header}>
          <h1>{viewBoard.title}</h1>
          <div className={BoardView.post_meta}>
            <span>{viewBoard.createdAt}</span>
            <span>조회수: {viewBoard.viewCount}</span>
          </div>
        </div>

        <div className={BoardView.post_content}>
          <p>{viewBoard.content}</p>
        </div>
      </div>

      <button type="button" onClick={() => boardUpdate()}>수정</button>
      <button type="button" onClick={() => boardDelete()}>삭제</button>
    </>
  );
}

export default FreeBoardView;
