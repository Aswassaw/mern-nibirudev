import axios from "axios";
import { PROFILE_SUCCESS, PROFILE_ERROR } from "./types";
import { API_URL } from "../utils/constant";
import { setAlert } from "./alert";

// Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get(API_URL + "/v1/profile/me");

    dispatch({
      type: PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.message);

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.data.msg || "Error occured",
        statusText: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
