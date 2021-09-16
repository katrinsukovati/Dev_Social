// has routes that have anything to do with profiles, fetching them, adding them, updating them etc

const express = require("express");
router = express.Router();

// @route  GET api/profile
// @desc   Test route
// @access Public
router.get('/',(req,res)=> res.send('Profile route'));

module.exports = router;