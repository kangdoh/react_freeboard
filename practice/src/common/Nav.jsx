import React from "react";
import { NavLink } from "react-router-dom";

function navSelect(isActive) {
  return isActive ? "active-link" : "";
}
function navStyle(isActive) {
  return { color: isActive ? "red" : "black",
    fontWeight : isActive ? "bold" : "normal"
   };
}

function Nav() {
  const routeInfo = [{
      path : "/",
      name : "Home"
    },
    {
      path : "/freeboard",
      name : "FreeBoard"
    },
    {
      path : "/todolist",
      name : "TodoList"
    },]

  return (
    <nav>
     
     {routeInfo.map((info) => {
       return (
         <NavLink
           key={info.path} // 각 항목에 고유한 키 설정
           className={({ isActive }) => navSelect(isActive)}
           style={({ isActive }) => navStyle(isActive)}
           to={info.path}
         >
           {info.name}
         </NavLink>
       );
     })}

    </nav>
  );
}
export default Nav;
