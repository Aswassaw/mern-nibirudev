import { nanoid } from "nanoid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert =
  ({ msg, type, name }) =>
  (dispatch) => {
    const id = nanoid(16);
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, name, id },
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      });
    }, 10000);
  };
