// Handle getting a json web token for authentication

const express = require("express");
router = express.Router();

// @route  GET api/auth
// @desc   Test route
// @access Public
router.get('/',(req,res)=> res.send('Auth route'));

module.exports = router;