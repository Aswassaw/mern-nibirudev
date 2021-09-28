import axios from "axios";
import {
  SET_LOADING,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT,
  REMOVE_ALERT,
} from "./types";
import { API_URL } from "../utils/constant";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// Auth User
export const authUser = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  try {
    const res = await axios.get(API_URL + "/v1/user/me");

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

// Set Loading
export const setLoading = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};

// Register User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    dispatch({
      type: REMOVE_ALERT,
      payload: { clean: true },
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post(API_URL + "/v1/auth/register", body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.token,
      });
      dispatch(authUser());
    } catch (err) {
      console.error(err.message);

      dispatch({
        type: REGISTER_FAIL,
      });

      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(({ msg, param }) => {
          dispatch(
            setAlert({
              msg,
              type: "danger",
              name: param,
              timeout: 10,
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
    dispatch({
      type: REMOVE_ALERT,
      payload: { clean: true },
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post(API_URL + "/v1/auth/login", body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token,
      });
      dispatch(authUser());
    } catch (err) {
      console.error(err.message);

      dispatch({
        type: LOGIN_FAIL,
      });

      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(({ msg, param }) => {
          dispatch(
            setAlert({
              msg,
              type: "danger",
              name: param,
              timeout: 10,
            })
          );
        });
      }
    }
  };

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
