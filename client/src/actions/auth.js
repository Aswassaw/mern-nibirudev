import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_SUCCESS,
  AUTH_ERROR,
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
      type: AUTH_ERROR,
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
