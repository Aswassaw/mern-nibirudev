import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import Alert from "../layout/Alert";

const Register = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const alerts = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const onChangeHandler = (e) =>
    setFormData((c) => ({
      ...c,
      [e.target.name]: e.target.value,
    }));

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      dispatch(
        setAlert({
          msg: "Passwords do not match",
          type: "danger",
          name: "password",
        })
      );
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  return (
    <div className="container">
      <h1 className="large text-primary">Register</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <Alert key={alert.id} alert={alert} timeout={10} />
        ))}
      <form className="form" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={onChangeHandler}
            maxLength="50"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={onChangeHandler}
            required
          />
          <small className="form-text">
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChangeHandler}
            minLength="8"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={password2}
            onChange={onChangeHandler}
            required
          />
        </div>
        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
