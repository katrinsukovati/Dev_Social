// Function that takes in a token, if the token is there, add it to the headers if not, delete it from the headers

// Were not making a request with axios, were adding a global header
import axios from 'axios';

// When we have a token, we just send it with every request instead of picking and choosing which request to send it with
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
