import axios from "axios";
import { API_URL } from "../utils/constant";
import { setAlert } from "./alert";
import { POSTS_ERROR, POSTS_SUCCESS } from "./types";

// Get Posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(API_URL + "/posts");

    dispatch({
      type: POSTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
