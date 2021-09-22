// Reducer for authentication
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../actions/types';

const initialState = {
  // We will fetch the token in local storage
  token: localStorage.getItem('token'),
  // By default it will be null
  // If the registration is sucessfull, isAuthenticated will be set to true
  isAuthenticated: null,
  // When we load a user, we want to make sure that the loading is done (we got the response after we made a request to the backend)
  // true by default, once we make a request and get the response, then we set it to false
  loading: true,
  // The user object will be set to user
  user: null,
};

export default function (state = initialState, action) {
  //Payload is an object
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // We got the token back so we want to set the token and log in the user
      localStorage.setItem('token', payload.token);
      return {
        // state will tell us whatever is currently in the state
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      // If its a failed login, remove the token completely
      console.log('in here');
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
