import axios from "axios";
import {
  PROFILE_SUCCESS,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  PROFILES_SUCCESS,
  PROFILES_ERROR,
  GITHUB_SUCCESS,
  GITHUB_ERROR,
} from "./types";
import { API_URL } from "../utils/constant";
import { removeAlert, setAlert, setAlertPage } from "./alert";

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

// Get All Profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({type: CLEAR_PROFILE})

  try {
    const res = await axios.get(API_URL + "/v1/profile");

    dispatch({
      type: PROFILES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.message);

    dispatch({
      type: PROFILES_ERROR,
      payload: {
        msg: err.response.data.msg || "Error occured",
        statusText: err.response.statusText,
        status: err.response.status,
      },
    });
  }
}

// Get All Profiles
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(API_URL + "/v1/profile/user/" + userId);

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
}

// Get Github Repos
export const getGithubRepos = (githubUsername) => async (dispatch) => {
  try {
    const res = await axios.get(API_URL + "/v1/profile/github/" + githubUsername);

    dispatch({
      type: GITHUB_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.message);

    console.log(err);

    dispatch({
      type: GITHUB_ERROR,
      payload: {
        msg: err.response.data.msg || "Error occured",
        statusText: err.response.statusText,
        status: err.response.status,
      },
    });
  }
}

// Create or Update Profile
export const createOrUpdateProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    dispatch(removeAlert());

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Post data profile
      const res = await axios.post(API_URL + "/v1/profile", formData, config);

      history.push("/dashboard");

      dispatch(setAlertPage("dashboard"));
      dispatch(
        setAlert({
          msg: res.data.msg,
          type: "success",
          timeout: 10,
        })
      );
    } catch (err) {
      console.error(err.message);

      if (edit) {
        dispatch(setAlertPage("edit-profile"));
      } else {
        dispatch(setAlertPage("create-profile"));
      }
      const res = err.response.data;
      if (res.errors) {
        res.errors.forEach(({ msg, param }) => {
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

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      API_URL + "/v1/profile/experience",
      formData,
      config
    );

    history.push("/dashboard");

    dispatch(setAlertPage("dashboard"));
    dispatch(
      setAlert({
        msg: res.data.msg,
        type: "success",
        timeout: 10,
      })
    );
  } catch (err) {
    console.error(err.message);

    dispatch(setAlertPage("add-experience"));
    const res = err.response.data;
    if (res.errors) {
      res.errors.forEach(({ msg, param }) => {
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

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      API_URL + "/v1/profile/education",
      formData,
      config
    );

    history.push("/dashboard");

    dispatch(setAlertPage("dashboard"));
    dispatch(
      setAlert({
        msg: res.data.msg,
        type: "success",
        timeout: 10,
      })
    );
  } catch (err) {
    console.error(err.message);

    dispatch(setAlertPage("add-education"));
    const res = err.response.data;
    if (res.errors) {
      res.errors.forEach(({ msg, param }) => {
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

// Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    // Delete Experience By Id
    const res = await axios.delete(API_URL + "/v1/profile/experience/" + id);

    dispatch(setAlertPage("dashboard"));
    dispatch(
      setAlert({
        msg: res.data.msg,
        type: "success",
        timeout: 10,
      })
    );
    dispatch(getCurrentProfile());
  } catch (err) {
    console.error(err.message);

    dispatch(setAlertPage("dashboard"));
    const res = err.response.data;
    dispatch(
      setAlert({
        msg: res.msg,
        type: "danger",
        timeout: 10,
      })
    );
  }
};

// Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    // Delete Education By Id
    const res = await axios.delete(API_URL + "/v1/profile/education/" + id);

    dispatch(setAlertPage("dashboard"));
    dispatch(
      setAlert({
        msg: res.data.msg,
        type: "success",
        timeout: 10,
      })
    );
    dispatch(getCurrentProfile());
  } catch (err) {
    console.error(err.message);

    dispatch(setAlertPage("dashboard"));
    const res = err.response.data;
    dispatch(
      setAlert({
        msg: res.msg,
        type: "danger",
        timeout: 10,
      })
    );
  }
};

// Delete Account
export const deleteAccount = () => async (dispatch) => {
  try {
    // Delete Current Account
    await axios.delete(API_URL + "/v1/user/me");

    dispatch({ type: ACCOUNT_DELETED });
    dispatch({ type: CLEAR_PROFILE });

    dispatch(setAlertPage("login"));
    dispatch(
      setAlert({
        msg: "Your account has been permanently deleted",
        type: "success",
        timeout: 10,
      })
    );
  } catch (err) {
    console.error(err.message);

    dispatch(setAlertPage("dashboard"));
    const res = err.response.data;
    dispatch(
      setAlert({
        msg: res.msg,
        type: "danger",
        timeout: 10,
      })
    );
  }
};
