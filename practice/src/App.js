import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main_FreeBoard from "./freeboard/Main_FreeBoard";
import TodoList from "./todolist/TodoList";
import Nav from "./common/Nav";
import Home from "./home/Home";

function App() {
  return (
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/freeboard/*" element={<Main_FreeBoard/>} />
          <Route path="/todolist" element={<TodoList/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;