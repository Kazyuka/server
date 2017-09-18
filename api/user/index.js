'use strict';

var express = require('express');
var userController = require('./userController');

var router = express.Router();

router.post("/create/user/", userController.create);
router.get("/get/user/:id", userController.findUser);
router.post("/add/friend/:id/:newFriend/", userController.addFriend);
router.post("/remove/friend/:id/:idFriend/", userController.removeFriend);
router.delete("/remove/user/:id/", userController.removeUser);

module.exports = router;