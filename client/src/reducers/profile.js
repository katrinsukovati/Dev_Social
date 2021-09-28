// We will have actions to get the profile, update, clear, etc
import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
} from '../actions/types';

const initialState = {
  profile: null,
  // profile listing page
  profiles: [],
  repos: [],
  // once we make a request, we set this to false
  loading: true,
  error: {},
};

// Takes in a state and an action
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        // payload will contain the profile
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        // payload will contain the error
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
}
