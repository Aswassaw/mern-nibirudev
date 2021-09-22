import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <NavLink exact to="/">NibiruDev</NavLink>
      </h1>
      <ul>
        <li>
          <NavLink exact to="/developers">Developers</NavLink>
        </li>
        <li>
          <NavLink exact to="/register">Register</NavLink>
        </li>
        <li>
          <NavLink exact to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
