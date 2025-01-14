import React, { useEffect, useState } from "react";
import BoardInput from "css/FreeBoard/FreeBoardInput.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function FreeBoardInput() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mode, setMode] = useState("");

  // id의 여부로 생성,수정 구분
  useEffect(() => {
    if (id) {
        setMode("update");
        updateList()
    } else {
      setMode("create");
    }
  }, []);


  // input 값 체크(랜더링/상태)
  const [inputValue, setInputValue] = useState({
    title: "",
    content: "",
  });
  const inputChange = (e) => {
    const { name, value } = e.target; // name과 value 추출
    setInputValue({
      ...inputValue, // 기존 상태 유지
      [name]: value, // name 속성을 키로 사용해 해당 값 업데이트
    });
  };

  // 업로드 파일 저장변수
  const [files, setFiles] = useState([]);
  const fileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); 
    console.log(selectedFiles)
    setFiles(selectedFiles);
  }
  // formdata로 합치기
  const createFormData = ()=>{
    const formdata = new FormData(); // 최종 통신에 사용할 formdata
    formdata.append('inputValue', new Blob([JSON.stringify(inputValue)], {type : 'application/json'}));
    if(files.length > 0){
      files.forEach((file)=>{
        formdata.append('files', file);
      })
    }else{
      formdata.append('files', new Blob([], {type: 'application/octet-stream'}))
    }
    return formdata;
  }

  // 작성완료 클릭 시(생성, 수정)
  const createFreeBoard = async (e) => {
    e.preventDefault();
    const formdata = createFormData();
    console.log(formdata)

    if (mode === "create") {
      try {
        const res = await axios.post("http://localhost:5000/boards", formdata, {
        // const res = await axios.post("http://localhost:5000/boards", inputValue, {
          headers : {
            'Content-type': 'multipart/form-data',
            // 'Content-type': 'application/json',
          },
        });
        if (res.status === 201) {
          alert("작성완료");
          navigate("/freeboard/freeboardlist");
        }
      } catch (error) {
        console.error("글생성 에러", error);
      }
    }
    // 수정은 아직 미완성
    else if (mode === "update") {
      try {
        const res = await axios.post(`http://localhost:5000/boards/update/${id}`, inputValue, {
          headers : {
            'Content-type': 'application/json',
          }
        });
        if(res.status === 201){
            alert('수정완료')
            navigate(`/freeboard/freeboardview/${id}`);
        }
      } catch (error) {
        console.error("수정 에러", error);
      }
    }
  };


  // 수정시 게시글 가져오기
  const updateList = async() => {
    try{
        const res = await axios.get(`http://localhost:5000/boards/${id}`);
        setInputValue({
          title: res.data.title,
          content: res.data.content,
        });
    }
    catch(error){
        console.error('update list get error', error)
    }
  }


  return (
    <>
      <div className={BoardInput.post_create_container}>
        <h2>{mode === "update" ? "게시글 수정" : "게시글 작성"}</h2>
        <form onSubmit={createFreeBoard}>
          <div className={BoardInput.form_group}>
            <label htmlFor="title">제목</label>
            <input
              id="title"
              type="text"
              name="title"
              value={inputValue.title}
              placeholder="게시글 제목을 입력하세요"
              required
              onChange={inputChange}
            />
          </div>
          <div className={BoardInput.form_group}>
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              name="content"
              value={inputValue.content}
              placeholder="게시글 내용을 입력하세요"
              rows="10"
              required
              onChange={inputChange}
            />
          </div>
          <div className={BoardInput.form_group}>
            <label htmlFor="file">사진 업로드</label>
            <input type="file" multiple onChange={fileChange}/>
          </div>
          <button type="submit" className={BoardInput.submit_button}>
            {mode === "update" ? "수정 완료" : "작성 완료"}
          </button>
        </form>
      </div>
    </>
  );
}

export default FreeBoardInput;
