import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChangeHandler = (e) =>
    setFormData((c) => ({
      ...c,
      [e.target.name]: e.target.value,
    }));

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Success");
  };

  return (
    <div className="container">
      <h1 className="large text-primary">Login</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={onChangeHandler}
            required
          />
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
        <input type="submit" value="Login" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Haven't account yet? <Link to="register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
