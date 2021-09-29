import { PROFILE_ERROR, PROFILE_SUCCESS } from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  error: {},
  loading: true,
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
        loading: false,
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    default:
      return state;
  }
};

export default profileReducer;
