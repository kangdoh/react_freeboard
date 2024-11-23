import React from "react";
import BoardList from "css/FreeBoard/FreeBoardList.module.css";
import { useNavigate } from "react-router-dom";

// 임시 - 통신 할 부분
const data = [
  {
    id: 1,
    title: "연습하기",
    content: "Freeboard를 만들보자",
    createDate: "2024-11-20",
    viewCount: 1,
  },
  {
    id: 2,
    title: "React로 만들기",
    content: "React Hooks, Context API, Router API를 사용하세요",
    createDate: "2024-11-19",
    viewCount: 5,
  },
  {
    id: 3,
    title: "Redux로 만들기",
    content: "Redux Toolkit, Redux-Saga, React-Redux를 사용하세요",
    createDate: "2024-11-18",
    viewCount: 3,
  },
];

function FreeBoardList() {
  const navigate = useNavigate();
  const viewPage = (id) => {
    navigate(`/freeboard/freeboardview/${id}`);
  };
  const createPage = () => {
    navigate("/freeboard/freeboardcreate");
  };

  return (<>
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
          {data.map((item) => {
            return (
              <tr key={item.id} onClick={() => viewPage(item.id)}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>{item.createDate}</td>
                <td>{item.viewCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={createPage}>게시글 작성</button>
  </>);
}

export default FreeBoardList;
