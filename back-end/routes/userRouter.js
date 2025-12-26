var express = require('express');
var { getUserByUsername } = require('../controllers');

// ROUTER
var router = express.Router();

// USER APPOINTMENT CONTROL
router.route('/:username').get(getUserByUsername);

module.exports = router;
