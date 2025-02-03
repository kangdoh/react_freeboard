import React, { useEffect, useState } from "react";
import BoardList from "css/FreeBoard/FreeBoardList.module.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import queryString from "query-string";
import { useQueryClient } from "@tanstack/react-query";
import { getFreeBoardView } from "api/freeboardApi";

function FreeBoardList() {

  const navigate = useNavigate();
  const location = useLocation();
  const [freeboard, setFreeboard] = useState([]); // 게시판 출력 부분
  
  // 페이지네이션 변수
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page"), 10) || 1;
  const [totalItemes, setTotalItemes] = useState(0); // 총 페이지 수
  const limit = 5;
  const totalPage = Math.ceil(totalItemes / limit);


  // 게시판 리스트 가져오기
  const fetchFreeboard = async (sort, order, page, limit) => {
    try {
      const res = await axios.get("http://localhost:5000/boards", {
        params: { sort, order, page, limit },
      });
      setTotalItemes(res.data.totalItem)
      setFreeboard(res.data.boards);
    } catch (error) {
      console.error("freeboard 가져오기 실패", error);
    }
  };

  // 쿼리를 객체로 사용하기 위한 함수
  const currentQuery = queryString.parse(location.search);
  // 페이지 변경
  const handlePageChange = (page) => {
    const updatedQuery = { ...currentQuery, page };
    setSearchParams(page)
    navigate(`?${queryString.stringify(updatedQuery)}`);
  };
  // 정렬 변경
  const handleSort = (sort, order, page) => {
    const updatedQuery = { ...currentQuery, sort, order, page };
    navigate(`?${queryString.stringify(updatedQuery)}`);
  };
  
  // 게시판 랜더링
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sort = queryParams.get("sort") || "createdAt";
    const order = queryParams.get("order") || "DESC";
    const page = queryParams.get("page") || "1";
    
    fetchFreeboard(sort, order, page, limit);
  }, [location.search]);

  // useEffect(() => {
  //   const queryParams = queryString.parse(location.search);
  //   const { sort = "createdAt", order = "DESC", page = "1" } = queryParams;
  //   fetchFreeboard(sort, order, page);
  // }, [location.search]);

  
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

  // 게시글 pre-fetch
  const queryClient = useQueryClient();
  const prefetchView = (id)=>{
    queryClient.prefetchQuery({
      queryKey: ["freeBoardView", id],
      queryFn: () => getFreeBoardView(id),
      staleTime: 5 * 60 * 1000, // 동안 최신 데이터로 유지
      cacheTime: 10 * 60 * 1000, // 캐시 유지 (뒤로 가기 후에도 유지)
    });

    setTimeout(() => {
      console.log("캐시 데이터:", queryClient.getQueryData(["freeBoardView", id]));
    }, 500);
  
  }

  return (
    <section className={BoardList.wrapper}>
      <ul className={BoardList.sortList}>
        <li onClick={() => handleSort("createdAt", "DESC", 1)}>최신 순</li>
        <li onClick={() => handleSort("createdAt", "ASC", 1)}>오래된 순</li>
        <li onClick={() => handleSort("viewCount", "DESC", 1)}>조회순</li>
      </ul>

      <table className={BoardList.board_table}>
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            {/* <th>내용</th> */}
            <th>작성일자</th>
            <th>조회수</th>
          </tr>
        </thead>

        <tbody>
          {freeboard.map((item, index) => {
            return (
              <tr key={item.id} onClick={() => viewPage(item.id)} 
                onMouseEnter={() => {
                  console.log(item.id);
                  prefetchView(item.id);
                }}>
                <td>{index+1+((currentPage-1)*limit)}</td>
                <td>{item.title}</td>
                {/* <td>{item.content}</td> */}
                <td>{dayjs(item.createdAt).format('YYYY-MM-DD')}</td>
                <td>{item.viewCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={createPage}>게시글 작성</button>

      <div className={BoardList.btn}>
        <button>이전</button>
        {Array.from({ length: totalPage }, (_, i) => (
          <button
            key={i}
            className={BoardList.numberBtn}
            onClick={() => handlePageChange(i + 1)}
            style={{ fontWeight: currentPage === i + 1 ? "bold" : "normal" }}
          >
            {i + 1}
          </button>
        ))}
        <button>다음</button>
      </div>

    </section>
  );
}

export default FreeBoardList;
