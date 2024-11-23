import React from "react";
import { NavLink } from "react-router-dom";
function Nav() {
  return (
    <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/freeboard">FreeBoard</NavLink>
        <NavLink to="/todolist">TodoList</NavLink>
    </nav>
  );
}
export default Nav;
