
'use strict';
var express = require('express');
var userController = require('./userController');

var router = express.Router();

router.post("/users", userController.create);
router.post("/users/friends", userController.addFriend);
router.post("/users/friends/request",userController.friendRequest);
router.post("/users/friends/accept",userController.acceptRequest);
router.post("/users/friends/reject",userController.rejectRequest);
router.get("/users/", userController.findUser);
router.get("/users", userController.showAllUsers);
router.delete("/users/friends", userController.removeFriend);
router.delete("/users/", userController.removeUser);

module.exports = router;