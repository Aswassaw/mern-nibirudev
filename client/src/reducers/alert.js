import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      state.forEach((alertEach) => {
        if (alertEach.name === payload.name) {
          state = state.filter(
            (alertFilter) => alertFilter.id !== alertEach.id
          );
        }
      });

      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};

export default alertReducer;
