import { SET_ALERT, REMOVE_ALERT, SET_ALERT_PAGE } from "../actions/types";

const initialState = { page: null, alerts: [] };

const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT_PAGE:
      return { ...state, page: payload };
    case SET_ALERT:
      state.alerts.forEach((stateAlertEach) => {
        if (stateAlertEach.name === payload.name) {
          state.alerts = state.alerts.filter(
            (stateAlertFilter) => stateAlertFilter.id !== stateAlertEach.id
          );
        }
      });

      return { ...state, alerts: [...state.alerts, payload] };
    case REMOVE_ALERT:
      if (payload.clean) {
        return { ...state, alerts: [] };
      }

      const filteredAlerts = state.alerts.filter(
        (alert) => alert.id !== payload.id
      );
      return { ...state, alerts: filteredAlerts };
    default:
      return state;
  }
};

export default alertReducer;
