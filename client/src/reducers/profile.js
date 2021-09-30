import {
  CLEAR_PROFILE,
  PROFILE_ERROR,
  PROFILE_SUCCESS,
} from "../actions/types";

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
      };
    case PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default profileReducer;
