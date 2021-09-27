import { nanoid } from "nanoid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert =
  ({ msg, type, name = "", timeout }) =>
  (dispatch) => {
    const id = nanoid(16);

    // Membersihkan semua alert sebelumnya
    dispatch({
      type: REMOVE_ALERT,
      payload: { clean: true },
    });

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
