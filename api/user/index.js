'use strict';
var express = require('express');
var userController = require('./userController');

var router = express.Router();

router.post("/users", userController.create);
router.get("/users/:id", userController.findUser);
router.post("/friends", userController.addFriend);
router.post("/friends/:id/", userController.removeFriend);
router.delete("/users/:id/", userController.removeUser);

module.exports = router;