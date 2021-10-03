import {
  CLEAR_PROFILE,
  GITHUB_ERROR,
  GITHUB_SUCCESS,
  PROFILES_ERROR,
  PROFILES_SUCCESS,
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
    case PROFILES_SUCCESS:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case GITHUB_SUCCESS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    case PROFILE_ERROR:
    case PROFILES_ERROR:
    case GITHUB_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        profiles: [],
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default profileReducer;
