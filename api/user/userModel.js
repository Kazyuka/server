'use strict';

var express = require("express");

var mongoose = require('mongoose');
var mongooseFindAndFilter = require('mongoose-find-and-filter');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});
UserSchema.plugin(mongooseFindAndFilter);
exports.User = mongoose.model('User',UserSchema);