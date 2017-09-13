'use strict';

var express = require('express');
var userController = require('./userController');

var router = express.Router();

router.post("/add_user/", userController.create);
router.get("/get_user/:id", userController.findUser);
router.put("/add_new_friend/:id", userController.addFriend);
router.delete("/remove_friend/:id/", userController.removeFriend);
router.delete("/remove_user/:id/", userController.removeUser);

module.exports = router;