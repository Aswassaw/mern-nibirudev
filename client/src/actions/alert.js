import { SET_ALERT, REMOVE_ALERT } from "./types";
import uuid from "uuid";

const setAlert = (msg, type) => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, type, id },
  });
};

export { setAlert };
