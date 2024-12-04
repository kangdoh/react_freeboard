import React, { useEffect, useState } from "react";
import BoardList from "css/FreeBoard/FreeBoardList.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FreeBoardList() {

  const [freeboard, setFreeboard] = useState([]);
  
  // 게시판 리스트 가져오기
  useEffect(() => {
    const fetchFreeboard = async () => {
      try {
        const res = await axios.get("http://localhost:5000/boards");
        setFreeboard(res.data);
      } catch (error) {
        console.error("freeboard 가져오기 실패", error);
      }
    };
    fetchFreeboard();
  }, []);

  // 게시판 글 보기 (카운트 증가)
  const navigate = useNavigate();
  const viewPage = async(id) => {
    try{
      const res = await axios.post("http://localhost:5000/boards/upCount", { id })
      console.log(res.data)
    }catch(error){
      console.error("error", error)
    }
    navigate(`/freeboard/freeboardview/${id}`);
  };

  // 게시판 글 생성하러가기
  const createPage = () => {
    navigate("/freeboard/freeboardcreate");
  };

  return (
    <>
      <table className={BoardList.board_table}>
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>내용</th>
            <th>작성일자</th>
            <th>조회수</th>
          </tr>
        </thead>

        <tbody>
          {freeboard.map((item, index) => {
            return (
              <tr key={item.id} onClick={() => viewPage(item.id)}>
                <td>{index+1}</td>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>{item.createdAt}</td>
                <td>{item.viewCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={createPage}>게시글 작성</button>
    </>
  );
}

export default FreeBoardList;
