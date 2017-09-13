'use strict';

var express = require("express");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FriendShema = new Schema ({
    name: String
});

var UserSchema = new Schema({
    name: String,
    friends: [FriendShema]
});

exports.User = mongoose.model('User',UserSchema);
exports.Friend = mongoose.model('Friend',FriendShema);