import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, setLoading } from "../../actions/auth";
import Alert from "../layout/Alert";
import Loading from "../layout/Loading";

const Login = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const alerts = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  useEffect(() => {
    document.title = "NibiruDev - Login";
  }, []);

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

    dispatch(setLoading());
    dispatch(login({ email, password }));
  };

  return (
    <div className="container">
      <h1 className="large text-primary">Login</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <Alert key={alert.id} alert={alert} timeout={10} />
        ))}
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
        <button
          className="btn btn-primary"
          type="submit"
          disabled={loading && true}
        >
          {loading ? <Loading /> : "Login"}
        </button>
      </form>
      <p className="my-1">
        Haven't account yet? <Link to="register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
