import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuidv4 } from 'uuid';

// This function dispaches an alert to alert.js in reducers which adds the alert to the state
export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  // Gives us a unique id 
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
