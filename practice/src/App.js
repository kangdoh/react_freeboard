import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainFreeBoard from "./freeboard/MainFreeBoard";
import TodoList from "./todolist/TodoList";
import Nav from "./common/Nav";
import Home from "./home/Home";
import SignIn from "common/SignIn";
import SignUp from "common/SignUp";

function App() {
  return (
      <BrowserRouter>
        <Nav>gkgkgkgk</Nav>
        
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/freeboard/*" element={<MainFreeBoard/>} />
          <Route path="/todolist" element={<TodoList/>} />

          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;