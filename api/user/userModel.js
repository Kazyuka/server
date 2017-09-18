'use strict';

var express = require("express");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

exports.User = mongoose.model('User',UserSchema);