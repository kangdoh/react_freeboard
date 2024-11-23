import { useNavigate, useParams } from 'react-router-dom';
import BoardView from "css/FreeBoard/FreeBoardView.module.css"

function FreeBoardView() {
    const { id } = useParams(); 
    // 임시 데이터 (이 부분은 통신)
    const postData = {
        id: id,
        title: "게시글 제목",
        content: "게시글 내용이 여기에 들어갑니다.",
        createDate: "2024-11-20",
        viewCount: 100,
    };

    const navigate = useNavigate();
    const boardUpdate = ()=>{
      navigate(`/freeboard/freeboardupdate/${id}`)
    };
    const boardDelete = ()=>{

    }

    return (
        <>
          <div className={BoardView.post_container}>
              <div className={BoardView.post_header}>
                  <h1>{postData.title}</h1>
                  <div className={BoardView.post_meta}>
                      <span>{postData.createDate}</span>
                      <span>조회수: {postData.viewCount}</span>
                  </div>
              </div>
  
              <div className={BoardView.post_content}>
                  <p>{postData.content}</p>
              </div>
          </div>

          <button onClick={()=>boardUpdate(id)}>수정</button>
          <button onClick={()=>boardDelete}>삭제</button>
        </>
    );
}

export default FreeBoardView;
