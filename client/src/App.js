import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import setAuthToken from "./utils/setAuthToken";
import { authUser } from "./actions/auth";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
  console.log("Di atas App");
}

const App = () => {
  useEffect(() => {
    store.dispatch(authUser());
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
