import React, { useEffect, useState } from "react";
import BoardList from "css/FreeBoard/FreeBoardList.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

function FreeBoardList() {

  const navigate = useNavigate();
  const location = useLocation();

  const [freeboard, setFreeboard] = useState([]);
  const [sortOption, setSortOption] = useState({ sort: "createdAt", order: "DESC" })
  
  
  // 게시판 리스트 가져오기
  const fetchFreeboard = async (sort, order) => {
    try {
      const res = await axios.get("http://localhost:5000/boards", {
        params: { sort, order },
      });
      setFreeboard(res.data);
    } catch (error) {
      console.error("freeboard 가져오기 실패", error);
    }
  };

  // 게시판 정렬
  const handleSort = (sort, order) => {
    // URL 쿼리 파라미터 업데이트
    navigate(`?sort=${sort}&order=${order}`);
  };

  // 게시판 랜더링
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sort = queryParams.get("sort") || "createdAt";
    const order = queryParams.get("order") || "DESC";

    setSortOption({sort, order});
    fetchFreeboard(sort, order);
  }, [location.search]);


  // 게시판 글 보기 (카운트 증가)
  const viewPage = async(id) => {
    try{
      const res = await axios.post("http://localhost:5000/boards/upCount", { id }, {
        headers:{
          'Content-type':'application/json',
        }
      })
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
      <ul className={BoardList.sortList}>
        <li onClick={() => handleSort("createdAt", "ASC")}>최신 순</li>
        <li onClick={() => handleSort("createdAt", "DESC")}>오래된 순</li>
        <li onClick={() => handleSort("viewCount", "DESC")}>조회순</li>
      </ul>

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
                <td>{dayjs(item.createdAt).format('YYYY-MM-DD')}</td>
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
