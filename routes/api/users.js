// This file is for registering users, adding users, etc
const express = require("express");
router = express.Router();

// @route  GET api/users
// @desc   Test route
// @access Public
router.get('/',(req,res)=> res.send('User route'));

module.exports = router;