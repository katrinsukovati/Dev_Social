import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

// Reducer
export default function (state = initialState, action) {
  // Destructuring
  // payload = data
  const { type, payload } = action;

  switch (type) {
    // Add a new alert to the array
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      // Remove a specific alert by its id --> return all the alerts except the one that matches the alert
      // payload in this case is the id
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
