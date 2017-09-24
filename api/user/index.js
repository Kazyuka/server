'use strict';
var express = require('express');
var userController = require('./userController');

var router = express.Router();

router.post("/users", userController.create);
router.post("/users/:id/friends", userController.addFriend);
router.post("/users/:id/friendrequests",userController.friendRequest);
router.post("/users/:id/friendrequests/accept",userController.acceptFriendRequest);
router.get("/users/:id", userController.findUser);
router.get("/users", userController.showAllUsers);
router.delete("/users/:id/friends", userController.removeFriend);
router.delete("/users/:id/", userController.removeUser);
router.delete("/users/:id/friendrequests",userController.cancelFriendRequest);

module.exports = router;