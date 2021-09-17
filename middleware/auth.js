const jwt = require('jsonwebtoken');
const config = require('config');

// A middleware function has access to the req and res cycle
// next is a callback function that ensures that we move on to the next piece of middleware
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  // Check if there is no token
  if (!token) {
    // 401 = not authorized
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify the token, if there is one
  try {
    // Decode the token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Take the request object and assign a value to user
    req.user = decoded.user;
    next();
  } catch (err) {
    // Token is not valid
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
