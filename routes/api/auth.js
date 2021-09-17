// This file handles getting a json web token for authentication
const express = require('express');
router = express.Router();

// Get the auth middleware to protect the route
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route  GET api/auth
// @desc   Test route
// @access Public
// We will return the users data if they are authorized
// Use async since we are accessing the database
router.get('/', auth, async (req, res) => {
  try {
    // Do not return the password
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
