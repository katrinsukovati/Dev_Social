// Allows us to make a request
import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';
import { setAlert } from './alert';

// Register user
// dispatch triggers a state change
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });
    try {
      // We are making a post request
      const res = await axios.post('/api/users', body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      // If we forget the name, email, etc..., we get an array of errors from our back-end
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
