'use strict';
var express = require("express");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

exports.User = mongoose.model('User',userSchema);