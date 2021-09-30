import { nanoid } from "nanoid";
import { SET_ALERT_PAGE, SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlertPage = (page) => (dispatch) => {
  dispatch({
    type: SET_ALERT_PAGE,
    payload: page,
  });
};

export const setAlert =
  ({ msg, type, name = "", timeout = 5 }) =>
  (dispatch) => {
    const id = nanoid(16);

    // Set alert
    dispatch({
      type: SET_ALERT,
      payload: { id, msg, type, name, timeout },
    });

    // Menghapus alert setelah waktu yang ditentukan
    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: { clean: false, id },
      });
    }, parseInt(timeout + "000"));
  };

export const removeAlert = () => (dispatch) => {
  dispatch({
    type: REMOVE_ALERT,
    payload: { clean: true },
  });
};
