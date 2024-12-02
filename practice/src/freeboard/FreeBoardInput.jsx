import React, { useState } from 'react'
import BoardInput from "css/FreeBoard/FreeBoardInput.module.css"
import { useParams } from 'react-router-dom'
import axios from 'axios';

function FreeBoardInput() {
  const {id} = useParams();

  const [inputValue, setInputValue] = useState([]); 

//   const createFreddBoard = () => {
//     axios.post(`http://localhost:5000/boards/${setInputValue}`)
//   }



  return (<>
        <div className={BoardInput.post_create_container}>
            <h2>{ id ? '게시글 수정' : '게시글 작성' }</h2>
            <form>
                <div className={BoardInput.form_group}>
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="게시글 제목을 입력하세요"
                        required
                    />
                </div>
                <div className={BoardInput.form_group}>
                    <label htmlFor="content">내용</label>
                    <textarea
                        id="content"
                        placeholder="게시글 내용을 입력하세요"
                        rows="10"
                        required
                    />
                </div>
                <button onSubmit="createFreddBoard" type="submit" className={BoardInput.submit_button}>
                    작성 완료
                </button>
            </form>
        </div>

</>)
}

export default FreeBoardInput
