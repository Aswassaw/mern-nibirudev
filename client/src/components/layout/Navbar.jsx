import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../actions/auth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onClickHandler = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Logout?",
      text: "You would be logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
      }
    });
  };

  const authLinks = (
    <ul>
      <li>
        <NavLink exact to="/developers">
          Developers
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/posts">
          Posts
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">Dashboard</span>
        </NavLink>
      </li>
      <li>
        <a href="/#!" onClick={onClickHandler}>
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <NavLink exact to="/developers">
          Developers
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/register">
          Register
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/login">
          Login
        </NavLink>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <NavLink exact to="/">
          NibiruDev
        </NavLink>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

export default Navbar;
