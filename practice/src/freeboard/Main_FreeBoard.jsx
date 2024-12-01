import React from 'react'
import FreeBoardList from './FreeBoardList'
import { Navigate, Route, Routes } from 'react-router-dom'
import FreeBoardInput from './FreeBoardInput'
import FreeBoardView from './FreeBoardView'

function _FreeBoard() {
  return (<>  
    <Routes>
      {/* 처음  Routes 로딩시에 보여질 화면을 설정해준것 */}
      <Route path='' element={<Navigate to ="freeboardlist"/>}></Route>
      <Route path='/freeboardlist' element={<FreeBoardList/>}></Route>

      <Route path='/freeboardview/:id' element={<FreeBoardView/>}></Route>
      <Route path='/freeboardcreate' element={<FreeBoardInput/>}></Route>
      <Route path='/freeboardupdate/:id' element={<FreeBoardInput/>}></Route>
    </Routes>
  </>
  )
}

export default _FreeBoard
