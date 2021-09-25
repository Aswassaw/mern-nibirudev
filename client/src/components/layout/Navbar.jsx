import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../actions/auth";

const Navbar = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onClickHandler = (e) => {
    e.preventDefault();

    dispatch(logout());
  };

  const authLinks = (
    <ul>
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
