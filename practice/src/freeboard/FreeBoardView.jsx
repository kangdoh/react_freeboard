import { useNavigate, useParams } from "react-router-dom";
import BoardView from "css/FreeBoard/FreeBoardView.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getFreeBoardView } from "api/freeboardApi";

function FreeBoardView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [viewBoard, setViewBoard] = useState([]);
  const [imgName, setImgName] = useState(null);
  
  // 게시판 불러오기
  useEffect(() => {
    const freeBoardView = async () => {
      try {
        // const res = await axios.get(`http://localhost:5000/boards/${id}`);
        // setViewBoard(res.data);
        // console.log(res.data);

        // if (res.data.Galleries.length > 0) {
        //   setImgName(res.data.Galleries[0].fileName);
        // } else {
        //   setImgName(null);
        // }

        const data = await getFreeBoardView(id);
        setViewBoard(data);
        console.log(data);

        if (data.Galleries.length > 0) {
          setImgName(data.Galleries[0].fileName);
        } else {
          setImgName(null);
        }
        
      } catch (error) {
        console.error("boardView Error", error);
      }
    };
    freeBoardView();
  }, [id]);  


  // 게시판 수정으로 이동
  const boardUpdate = async() => {
    navigate(`/freeboard/freeboardupdate/${id}`);
  };

  // 게시판 삭제
  const boardDelete = async () => {
    const inputDelete = prompt("삭제를 원하시면 '확인' 을 입력해주세요.")
    if(inputDelete === "삭제"){
      try {
        await axios.delete(`http://localhost:5000/boards/${id}`);
        navigate("/freeboard/freeboardlist");
      } catch (error) {
        console.log("삭제 실패", error);
      }
    }
    else{
      alert('잘못입력하셨습니다.')
    }
  };

  return (
    <>
      <div className={BoardView.post_container}>

        <div className={BoardView.post_header}>
          <h1>{viewBoard.title}</h1>
          <div className={BoardView.post_meta}>
            <span>{dayjs(viewBoard.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
            <span>조회수: {viewBoard.viewCount}</span>
          </div>
        </div>
 
        <div className={BoardView.post_content}>
          <p>{viewBoard.content}</p>
            <p className={BoardView}>{imgName ?  <img src={`http://localhost:5000/uploads/${imgName}`} alt="Uploaded Image" /> : "없음"}
          </p>
        </div>
 
      </div>

      <button type="button" onClick={() => boardUpdate()}>수정</button>
      <button type="button" onClick={() => boardDelete()}>삭제</button>
    </>
  );
}

export default FreeBoardView;
