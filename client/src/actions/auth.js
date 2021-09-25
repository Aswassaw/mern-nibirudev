import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// Auth User
export const authUser = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.message);

    dispatch({
      type: AUTH_FAIL,
    });
  }
};

// Register User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post("/api/auth/register", body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(authUser());
    } catch (err) {
      console.error(err.message);

      dispatch({
        type: REGISTER_FAIL,
        payload: err.message,
      });

      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(({ msg, param }) => {
          dispatch(
            setAlert({
              msg,
              type: "danger",
              name: param,
            })
          );
        });
      }
    }
  };

// Login User
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("/api/auth/login", body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(authUser());
    } catch (err) {
      console.error(err.message);

      dispatch({
        type: LOGIN_FAIL,
        payload: err.message,
      });

      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(({ msg, param }) => {
          dispatch(
            setAlert({
              msg,
              type: "danger",
              name: param,
            })
          );
        });
      }
    }
  };

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  console.log("Bangsat");
  dispatch({
    type: LOGOUT,
  });
};
