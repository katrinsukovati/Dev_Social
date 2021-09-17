// This file handles getting a json web token for authentication
const express = require('express');
router = express.Router();

// Get the auth middleware to protect the route
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const jwt = require('jsonwebtoken');
const config = require('config');

// express-validator is a set of express.js middlewares that wraps validator.js validator and sanitizer functions.
// It will validate the users input
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

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

// @route  POST api/auth
// @desc   Authenticate user & get token
// @access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // Handle the response
    const errors = validationResult(req);
    // If there are errors
    if (!errors.isEmpty()) {
      // 400 is a bad request
      //.json makes the errors visible
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring:
    const { email, password } = req.body;

    try {
      // See if the user exists, if they dont exist, send an error
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Make sure the passwords matche
      const isMatch = await bcrypt.compare(password, user.password);

      // If theres no match
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Return the json web token (authorization) --> to allow them to log in right away
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign the token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        // Before you deploy, change it to 3600
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      // Server error
      console.error(err);
      res.send(500).send('Server error');
    }
  }
);

module.exports = router;
