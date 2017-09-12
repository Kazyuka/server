'use strict';

var express = require('express');
var userController = require('./userController');

var router = express.Router();

router.get("/", userController.create);

module.exports = router;