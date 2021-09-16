// This file is for registering users, adding users, etc
const express = require('express');
router = express.Router();

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// express-validator is a set of express.js middlewares that wraps validator.js validator and sanitizer functions.
// It will validate the users input
const { check, validationResult } = require('express-validator');

// Up two levels
const User = require('../../models/User');

// @route  POST api/users
// @desc   Register a user
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
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
    const { name, email, password } = req.body;

    try {
      // See if the user exists, if they exist, send an error
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({ name, email, avatar, password });

      // Encrypt the password using bcrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return the json web token --> to allow them to log in right away
      res.send('User registered');
    } catch (err) {
      // Server error
      console.error(err);
      res.send(500).send('Server error');
    }
  }
);

module.exports = router;
